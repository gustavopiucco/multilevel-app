const database = require('../lib/database')
const OTPService = require ('../services/otp')

class WithdrawService {
    constructor() { }

    async withdraw(userId, type, amount, token) {
        if (!type || !amount || !token) return { error: 'Please fill in all required fields.', errorCode: 400 }
        if (isNaN(amount)) return { error: 'Amount must be numeric with 2 decimal places. Example: 150.50', errorCode: 400 }

        return { error: 'Withdraw will be available on December 1st.', errorCode: 400}

        amount = parseFloat(amount)

        if (amount < 0) return { error: 'Amount can not be negative.', errorCode: 400 }
        if (amount < 50) return { error: 'Amount must be greater than U$ 50.00.', errorCode: 400 }

        const otpService = new OTPService()
        if (!await otpService.verify(userId, token)) return { error: 'Invalid token.', errorCode: 400 }

        //const resultWithdraws = await database.query('SELECT * FROM withdraw_transactions WHERE user_id = $1 AND created_at::date = current_timestamp::date', [userId])
        //if (resultWithdraws.rowCount > 0) return { error: 'You have already requested a withdraw today.', errorCode: 400 }

        const resultLeaderNotQualified = await database.query(`SELECT 1 FROM users WHERE role = 'leader' AND qualified = false AND id = $1`, [userId])
        if (resultLeaderNotQualified.rowCount > 0) return { error: 'You need to qualify your binary to withdraw.', errorCode: 400 }

        if (type == 'network_balance') 
            return this.withdrawNetworkBalance(userId, amount)
        else 
            return this.withdrawBalance(userId, amount)
    }

    async withdrawNetworkBalance(userId, amount) {
        const userResult = await database.query('SELECT network_balance, btc_address FROM users WHERE id = $1', [userId])
        const networkBalance = parseFloat(userResult.rows[0].network_balance)
        const btcAddress = userResult.rows[0].btc_address

        if (!btcAddress) return { error: 'You do not have a Bitcoin Address registered.', errorCode: 400 }

        if (amount > networkBalance) return { error: 'Insufficient funds.', errorCode: 400 }

        database.query('UPDATE users SET network_balance = network_balance - $2 WHERE id = $1', [userId, amount])
        database.query(`INSERT INTO withdraw_transactions(user_id, amount, btc_address, withdraw_type) VALUES ($1, $2, $3, 'network_balance')`, [userId, amount, btcAddress])

        return { error: null }
    }

    async withdrawBalance(userId, amount) {
        const userResult = await database.query('SELECT balance, btc_address FROM users WHERE id = $1', [userId])
        const balance = parseFloat(userResult.rows[0].balance)
        const btcAddress = userResult.rows[0].btc_address

        if (!btcAddress) return { error: 'You do not have a Bitcoin Address registered.', errorCode: 400 }

        if (amount > balance) return { error: 'Insufficient funds.', errorCode: 400 }

        database.query('UPDATE users SET balance = balance - $2 WHERE id = $1', [userId, amount])
        database.query(`INSERT INTO withdraw_transactions(user_id, amount, btc_address, withdraw_type) VALUES ($1, $2, $3, 'balance')`, [userId, amount, btcAddress])

        return { error: null }
    }

    getWeekDay() {
        const weekdays = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
        const date = new Date()
        return weekdays[date.getDay()]
    }
}

module.exports = WithdrawService