const database = require('../lib/database')
const validator = require('validator')
const blockio = require('../lib/blockio')
const blockchain = require('../lib/blockchain')
const UnilevelService = require('../services/unilevel')
const BinaryService = require('../services/binary')
const mailgun = require('../lib/mailgun')

class WebHookService {
    constructor() { }

    async handleBlockIoNotification(data) {
        if (data.type != 'address') return { error: null }

        const notification_id = data.notification_id
        const delivery_attempt = data.delivery_attempt
        const address = data.data.address
        const balance_change = data.data.balance_change
        const amount_sent = data.data.amount_sent
        const amount_received = data.data.amount_received
        const txid = data.data.txid
        const confirmations = data.data.confirmations

        await database.query(`INSERT INTO blockio_notifications (notification_id, delivery_attempt, btc_address, btc_balance_change, btc_amount_sent, btc_amount_received, tx_id, confirmations) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [notification_id, delivery_attempt, address, balance_change, amount_sent, amount_received, txid, confirmations])

        const resultInvoice = await database.query(`
        SELECT invoices.*, plans.name AS plan_name 
        FROM invoices
        INNER JOIN plans
            ON invoices.plan_id = plans.id
        WHERE invoices.status IN ('waiting_payment', 'waiting_confirmations') AND invoices.btc_address = $1`, [address])

        const invoice = resultInvoice.rows[0]

        if (!invoice) {
            return { error: null }
        }

        //TODO: invoice inner join users to increase performance preventing below resultUser query
        const resultUser = await database.query(`SELECT email, username, renewed FROM users WHERE id = $1`, [invoice.user_id])
        const userEmail = resultUser.rows[0].email
        const userUsername = resultUser.rows[0].username
        const userRenewed = resultUser.rows[0].renewed

        //amount tolerance +U$ 700 and -U$ 10
        const invoicePriceWithFee = parseFloat(invoice.price) + 10 //invoice +U$ 10 fee
        const oneDollarToBtc = await blockchain.usdToBtc(1)
        let amount_received_dollar = parseFloat(amount_received) / parseFloat(oneDollarToBtc)
        amount_received_dollar = parseFloat(amount_received_dollar.toFixed(2))
        const min = invoicePriceWithFee - 10
        const max = invoicePriceWithFee + 3000

        console.log('[Webhook] ' + min, amount_received_dollar, max, amount_received, userUsername)

        //if amount received in dollar is not between invoice price -10 or +10 dollar then return
        if (amount_received_dollar < min || amount_received_dollar > max) {
            return { error: null }
        }

        if (confirmations == 0) {
            //await database.query(`UPDATE invoices SET status = 'waiting_confirmations', tx_id = $2 WHERE id = $1`, [invoice.id, txid])
            await database.query(`UPDATE users SET plan_id = $2 WHERE id = $1`, [invoice.user_id, invoice.plan_id])

            if (invoice.is_upgrade) { //if is upgrade, update old invoice to plan cycle completed and role to user if leader
                await database.query(`UPDATE invoices SET status = 'plan_cycle_completed' WHERE status = 'payment_confirmed' AND user_id = $1`, [invoice.user_id])
                await database.query(`UPDATE users SET role = 'user' WHERE role = 'leader' AND id = $1`, [invoice.user_id])
            }

            await database.query(`UPDATE invoices SET status = 'payment_confirmed', paid_at = CURRENT_TIMESTAMP, tx_id = $2 WHERE id = $1`, [invoice.id, txid])

            if (!userRenewed) {
                const unilevelService = new UnilevelService()
                await unilevelService.payDirectAndIndirectGains(invoice.user_id, invoice.price, invoice.plan_id)

                const binaryService = new BinaryService()
                await binaryService.incrementPreviousPointsCount(invoice.user_id, Math.trunc(invoice.price)) //invoice.price é equivalente ao pontos a ser pago, pois em upgrade é pago so os pontos da diferença. O Math.trunc() garante que os pontos serao inteiros
            }

            //checkQualification() precisa vir depois do incrementPreviousPointsCount() se não os pontos vão sempre subir pq sempre vai estar qualificado
            const binaryService = new BinaryService()
            const sponsorIdResult = await database.query(`SELECT parent_id FROM users where id = $1`, [invoice.user_id])
            const sponsorId = sponsorIdResult.rows[0].parent_id
            await binaryService.checkQualification(sponsorId)

            mailgun.invoicePaymentConfirmed(userEmail, userUsername, invoice.plan_name)

            return { error: null }
        }
    }
}

module.exports = WebHookService