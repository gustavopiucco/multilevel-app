const database = require('../lib/database')
const validator = require('validator')
const blockio = require('../lib/blockio')
const blockchain = require('../lib/blockchain')
const mailgun = require('../lib/mailgun')

//TODO: Fix race condition
//TODO: Handle all exception correctly
//TODO: Handle exception when block.io cannot send webhook notification(blockio.createWebhookNotificaton)

class InvoicesService {
    constructor() { }

    async createInvoice(userId, planId) {
        if (planId !== parseInt(planId, 10)) return { error: true, errorCode: 400 }

        const invoiceResult = await database.query('SELECT * FROM invoices WHERE user_id = $1', [userId])

        for (let invoice of invoiceResult.rows) {
            if (invoice.status == 'payment_confirmed') return { error: 'You already have a confirmed invoice.', errorCode: 400 }
            if (invoice.status == 'waiting_confirmations') return { error: 'You already have a confirmed invoice(waiting confirmations).', errorCode: 400 }
            if (invoice.status == 'waiting_payment') return { error: 'You already have an invoice waiting payment.', errorCode: 400 }
        }

        //se ele tiver uma fatura com plan_cycle_completed, ele só pode criar uma com o mesmo valor ou maior
        const lastInvoicePlanCycleCompletedResult = await database.query(`SELECT * FROM invoices WHERE user_id = $1 AND status = 'plan_cycle_completed' ORDER BY created_at DESC LIMIT 1`, [userId])
        if (lastInvoicePlanCycleCompletedResult.rowCount > 0) {
            const lastInvoicePlanCycleCompleted = lastInvoicePlanCycleCompletedResult.rows[0]

            if (planId < lastInvoicePlanCycleCompleted.plan_id) return { error: 'You need to select the same or higher plan of the last invoice.', errorCode: 400 }
        }

        const resultPlan = await database.query('SELECT * FROM plans WHERE id = $1', [planId])
        const plan = resultPlan.rows[0]

        if (!plan) return { error: true, errorCode: 400 }

        const btcAddress = await blockio.getNewAddress()
        const webhookNotification = await blockio.createWebhookNotification(btcAddress)
        let planPriceWithFee = parseFloat(plan.price) + 10.00; //U$ 10.00 membership fee
        planPriceWithFee = planPriceWithFee * 1.007 //+0.7% correction
        let totalBtc = await blockchain.usdToBtc(planPriceWithFee)
        totalBtc = validator.toFloat(totalBtc).toFixed(8)

        const userResult = await database.query(`SELECT email, username FROM users WHERE id = $1`, [userId])
        const userEmail = userResult.rows[0].email
        const userUsername = userResult.rows[0].username

        mailgun.invoiceCreated(userEmail, userUsername, plan.name, btcAddress, totalBtc)

        await database.query(`INSERT INTO invoices(user_id, plan_id, btc_price, btc_address, blockio_notification_id, price) VALUES($1, $2, $3, $4, $5, $6)`, [userId, planId, totalBtc, btcAddress, webhookNotification.notification_id, plan.price])

        return { error: null }
    }

    async createInvoiceUpgrade(userId, planId) {
        if (planId !== parseInt(planId, 10)) return { error: true, errorCode: 400 }

        const invoiceResult = await database.query('SELECT * FROM invoices WHERE user_id = $1', [userId])
        for (let invoice of invoiceResult.rows) {
            if (invoice.status == 'waiting_payment') return { error: 'You already have an invoice waiting payment.', errorCode: 400 }
            if (invoice.status == 'waiting_confirmations') return { error: 'You already have a confirmed invoice(waiting confirmations).', errorCode: 400 }
        }

        const invoicePaymentConfirmedResult = await database.query(`SELECT * FROM invoices WHERE user_id = $1 AND status = 'payment_confirmed'`, [userId])
        if (invoicePaymentConfirmedResult.rowCount == 0) return { error: 'You must have an invoice with Payment Confirmed to upgrade.', errorCode: 400 }

        const resultPlan = await database.query('SELECT * FROM plans WHERE id = $1', [planId])
        const plan = resultPlan.rows[0]

        if (!plan) return { error: true, errorCode: 400 }

        const resultUser = await database.query('SELECT plan_id, role FROM users WHERE id = $1', [userId])
        const user = resultUser.rows[0]

        if (parseInt(planId) <= parseInt(user.plan_id)) return { error: 'You must select a larger plan.', errorCode: 400 }

        const resultOldPlan = await database.query('SELECT * FROM plans WHERE id = $1', [user.plan_id])
        const oldPlan = resultOldPlan.rows[0]

        const btcAddress = await blockio.getNewAddress()
        const webhookNotification = await blockio.createWebhookNotification(btcAddress)
        let planPrice = parseFloat(plan.price)
        let planPriceWithFee = parseFloat(plan.price) + 10.00; //U$ 10.00 membership fee
        planPriceWithFee = planPriceWithFee * 1.02 //+2% correction

        if (user.role != 'leader') { //if not leader, pay just the difference between old and the new upgrade plan
            planPrice = planPrice - oldPlan.price
            planPriceWithFee = planPriceWithFee - oldPlan.price
        }

        let totalBtc = await blockchain.usdToBtc(planPriceWithFee)
        totalBtc = validator.toFloat(totalBtc).toFixed(8)

        const userResult = await database.query(`SELECT email, username FROM users WHERE id = $1`, [userId])
        const userEmail = userResult.rows[0].email
        const userUsername = userResult.rows[0].username

        mailgun.invoiceCreated(userEmail, userUsername, plan.name, btcAddress, totalBtc)

        await database.query(`INSERT INTO invoices(user_id, plan_id, btc_price, btc_address, blockio_notification_id, is_upgrade, upgrade_from_plan_id, price) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, [userId, planId, totalBtc, btcAddress, webhookNotification.notification_id, true, user.plan_id, planPrice])

        return { error: null }
    }

    async getUserInvoices(userId) {
        const invoicesResult = await database.query('SELECT *, (SELECT name FROM plans WHERE id = invoices.plan_id) FROM invoices WHERE user_id = $1 ORDER BY created_at DESC', [userId])
        const userInvoices = invoicesResult.rows

        // userInvoices.map((invoice) => {
        //     let price = parseFloat(invoice.price)
        //     let priceWithFee = price + 10.00

        //     return invoice.price = priceWithFee.toFixed(2)
        // })

        return { error: null, data: userInvoices }
    }

    async cancelUserInvoice(userId) {
        await database.query(`UPDATE invoices SET status = 'expired' WHERE status = 'waiting_payment' AND user_id = $1`, [userId])

        return { error: null }
    }
}

module.exports = InvoicesService