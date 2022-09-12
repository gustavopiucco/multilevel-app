const database = require('../lib/database')
const UnilevelService = require('../services/unilevel')
const BinaryService = require('../services/binary')
const OTPService = require ('../services/otp')

class PaymentService {
    constructor() { }

    async payment(userId, type, invoiceId, invoicePrice, token) {
        if (!type || !invoiceId || !invoicePrice || !token) return { error: 'Please fill in all required fields.', errorCode: 400 }
        if (isNaN(invoicePrice)) return { error: 'Invoice Price must be numeric with 2 decimal places. Example: 150.50', errorCode: 400 }

        //return { error: 'Temporarily disabled for maintenance.', errorCode: 400 }

        invoicePrice = parseFloat(invoicePrice)

        if (invoicePrice < 0) return { error: 'Invoice Price can not be negative.', errorCode: 400 }
        if (invoicePrice < 100) return { error: 'Invoice Price must be greater than U$ 100.00.', errorCode: 400 }

        const otpService = new OTPService()
        if (!await otpService.verify(userId, token)) return { error: 'Invalid token.', errorCode: 400 }

        if (type == 'network_balance') 
            return this.paymentNetworkBalance(userId, invoiceId, invoicePrice)
        else 
            return this.paymentBalance(userId, invoiceId, invoicePrice)
    }

    async paymentNetworkBalance(userId, invoiceId, invoicePrice) {
        const invoiceResult = await database.query('SELECT * FROM invoices WHERE id = $1', [invoiceId])
        const invoice = invoiceResult.rows[0]

        if (!invoice) return { error: 'Invoice does not exist.', errorCode: 400 }
        if (invoice.plan_id > 5) return { error: 'You can only pay invoices up to BT-5000 with Network Balance.', errorCode: 400 }
        if (invoice.status != 'waiting_payment') return { error: 'Invoice must be Waiting Payment.', errorCode: 400 }
        if (invoicePrice != invoice.price) return { error: 'Invoice Price does not match.', errorCode: 400 }

        //verificar se o usuario tem saldo suficiente
        const userResult = await database.query('SELECT network_balance, renewed FROM users WHERE id = $1', [userId])
        const user = userResult.rows[0]

        user.network_balance = parseFloat(user.network_balance)

        if (user.network_balance < invoice.price) return { error: 'Insufficient funds.', errorCode: 400 }

        database.query('UPDATE users SET network_balance = network_balance - $2 WHERE id = $1', [userId, invoice.price])

        //realizar ativaçao webhook
        this.pay(userId, invoice.id, invoice.user_id, invoice.plan_id, invoice.price, invoice.is_upgrade, user.renewed)

        //cria payment_transactions
        database.query('INSERT INTO payment_transactions(user_id, invoice_id, balance_type) VALUES ($1, $2, $3)', [userId, invoiceId, 'network_balance'])

        return { error: null }
    }

    async paymentBalance(userId, invoiceId, invoicePrice) {
        const invoiceResult = await database.query('SELECT * FROM invoices WHERE id = $1', [invoiceId])
        const invoice = invoiceResult.rows[0]

        if (!invoice) return { error: 'Invoice does not exist.', errorCode: 400 }
        if (invoice.plan_id > 5) return { error: 'You can only pay invoices up to BT-5000 with Network Balance.', errorCode: 400 }
        if (invoice.status != 'waiting_payment') return { error: 'Invoice must be Waiting Payment.', errorCode: 400 }
        if (invoicePrice != invoice.price) return { error: 'Invoice Price does not match.', errorCode: 400 }

        //verificar se o usuario tem saldo suficiente
        const userResult = await database.query('SELECT balance FROM users WHERE id = $1', [userId])
        const user = userResult.rows[0]

        user.balance = parseFloat(user.balance)

        if (user.balance < invoice.price) return { error: 'Insufficient funds.', errorCode: 400 }

        database.query('UPDATE users SET balance = balance - $2 WHERE id = $1', [userId, invoice.price])

        //realizar ativaçao webhook
        this.pay(userId, invoice.id, invoice.user_id, invoice.plan_id, invoice.price, invoice.is_upgrade)

        //cria payment_transactions
        database.query('INSERT INTO payment_transactions(user_id, invoice_id, balance_type) VALUES ($1, $2, $3)', [userId, invoiceId, 'balance'])

        return { error: null }
    }

    async pay(userId, invoiceId, invoiceUserId, invoicePlanId, invoicePrice, invoiceIsUpgrade) {
        const txId = 'activated_with_balance'

        await database.query(`UPDATE users SET plan_id = $2 WHERE id = $1`, [invoiceUserId, invoicePlanId])

        if (invoiceIsUpgrade) {
            await database.query(`UPDATE invoices SET status = 'plan_cycle_completed' WHERE status = 'payment_confirmed' AND user_id = $1`, [invoiceUserId])
            await database.query(`UPDATE users SET role = 'user' WHERE role = 'leader' AND id = $1`, [invoiceUserId])
        }

        await database.query(`UPDATE invoices SET status = 'payment_confirmed', paid_at = CURRENT_TIMESTAMP, tx_id = $2 WHERE id = $1`, [invoiceId, txId])

        const invoiceUserResult = await database.query('SELECT renewed FROM users WHERE id = $1', [invoiceUserId])
        const invoiceUser = invoiceUserResult.rows[0]

        if (!invoiceUser.renewed) {
            const unilevelService = new UnilevelService()
            await unilevelService.payDirectAndIndirectGains(invoiceUserId, invoicePrice, invoicePlanId)

            const binaryService = new BinaryService()
            await binaryService.incrementPreviousPointsCount(invoiceUserId, Math.trunc(invoicePrice))
        }

        const binaryService = new BinaryService()
        const sponsorIdResult = await database.query(`SELECT parent_id FROM users where id = $1`, [invoiceUserId])
        const sponsorId = sponsorIdResult.rows[0].parent_id
        await binaryService.checkQualification(sponsorId)
    }
}

module.exports = PaymentService