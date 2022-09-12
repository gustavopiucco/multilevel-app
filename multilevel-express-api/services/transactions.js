const database = require('../lib/database')
const validator = require('validator')

class TransactionsService {
    constructor() { }

    async getUnilevelTransactions(userId) {
        const result = await database.query(`
            SELECT users.username AS from, plans.name AS plan, unilevel_transactions.amount_paid AS amount, unilevel_transactions.level, unilevel_transactions.created_at AS date
            FROM unilevel_transactions
                JOIN plans
                    ON plans.id = unilevel_transactions.plan_id
                JOIN users
                    ON users.id = unilevel_transactions.from_user_id
            WHERE unilevel_transactions.to_user_id = $1 ORDER BY unilevel_transactions.created_at DESC
            `, [userId])

        return { error: null, data: result.rows }
    }

    async getBinaryTransactions(userId) {
        const result = await database.query(`SELECT amount_paid, created_at AS date FROM binary_transactions WHERE user_id = $1 ORDER BY created_at DESC`, [userId])

        result.rows.map((result) => {
            return result.date = new Date(result.date).toDateString()
        })

        return { error: null, data: result.rows }
    }

    async getRobotTransactions(userId) {
        const result = await database.query(`SELECT amount_paid, percentage, created_at AS date FROM robot_transactions WHERE user_id = $1 ORDER BY created_at DESC`, [userId])

        result.rows.map((result) => {
            return result.date = new Date(result.date).toDateString()
        })

        return { error: null, data: result.rows }
    }

    async getResidualTransactions(userId) {
        const result = await database.query(`
            SELECT residual_transactions.amount_paid, plans.name AS plan_name, residual_transactions.percentage, residual_transactions.created_at AS date 
            FROM residual_transactions
                INNER JOIN plans 
                    ON plans.id = residual_transactions.plan_id
            WHERE residual_transactions.user_id = $1 
            ORDER BY residual_transactions.created_at DESC`, [userId])

        result.rows.map((result) => {
            return result.date = new Date(result.date).toDateString()
        })

        return { error: null, data: result.rows }
    }

    async getCareerPlanTransactions(userId) {
        const result = await database.query(`SELECT prize, points_needed, career_plan, created_at AS date FROM career_transactions WHERE user_id = $1 ORDER BY created_at DESC`, [userId])

        return { error: null, data: result.rows }
    }

    async getWithdrawTransactions(userId) {
        const result = await database.query(`SELECT withdraw_type, btc_address, amount, paid, tx_id, created_at AS date FROM withdraw_transactions WHERE user_id = $1 ORDER BY created_at DESC`, [userId])

        return { error: null, data: result.rows }
    }
}

module.exports = TransactionsService