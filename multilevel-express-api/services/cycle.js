const database = require('../lib/database')

class CycleService {
    constructor() {}

    async increaseBalance(userIdToPay, planId, amountToPay) {
        const client = await database.getPoolClient()

        try {
            await client.query('BEGIN')

            const resultTotalPlanCycle = await client.query(`SELECT total_plan_cycle FROM users WHERE id = $1`, [userIdToPay])
            let totalPlanCycle = resultTotalPlanCycle.rows[0].total_plan_cycle
            totalPlanCycle = parseFloat(totalPlanCycle)

            const planResult = await client.query('SELECT price FROM plans WHERE id = $1', [planId])
            let planPrice = planResult.rows[0].price
            planPrice = parseFloat(planPrice)

            const maxUserPlanCanEarn = planPrice * 3 //300%

            if (amountToPay + totalPlanCycle < maxUserPlanCanEarn) {
                await client.query(`UPDATE users SET balance = balance + $1, total_profit = total_profit + $1, total_plan_cycle = total_plan_cycle + $1 WHERE id = $2`, [amountToPay, userIdToPay])
            }
            else {
                amountToPay = maxUserPlanCanEarn - totalPlanCycle
                amountToPay = parseFloat(amountToPay.toFixed(2))
                await client.query(`UPDATE users SET balance = balance + $1, total_profit = total_profit + $1, total_plan_cycle = 0.00, plan_id = null WHERE id = $2`, [amountToPay, userIdToPay])
                await client.query(`UPDATE users SET renewed = true, role = 'user' WHERE role != 'admin' AND id = $1`, [userIdToPay])
                await client.query(`UPDATE invoices SET status = 'plan_cycle_completed' WHERE status = 'payment_confirmed' AND user_id = $1`, [userIdToPay])
            }

            await client.query('COMMIT')
        }
        catch (err) {
            await client.query('ROLLBACK')
            throw err
        }
        finally {
            client.release()
        }
    }

    async increaseNetworkBalance(userIdToPay, planId, amountToPay) {
        const client = await database.getPoolClient()

        try {
            await client.query('BEGIN')

            const resultTotalPlanCycle = await client.query(`SELECT total_plan_cycle FROM users WHERE id = $1`, [userIdToPay])
            let totalPlanCycle = resultTotalPlanCycle.rows[0].total_plan_cycle
            totalPlanCycle = parseFloat(totalPlanCycle)

            const planResult = await client.query('SELECT price FROM plans WHERE id = $1', [planId])
            let planPrice = planResult.rows[0].price
            planPrice = parseFloat(planPrice)

            const maxUserPlanCanEarn = planPrice * 3 //300%

            if (amountToPay + totalPlanCycle < maxUserPlanCanEarn) {
                await client.query(`UPDATE users SET network_balance = network_balance + $1, total_profit = total_profit + $1, total_plan_cycle = total_plan_cycle + $1 WHERE id = $2`, [amountToPay, userIdToPay])
            }
            else {
                amountToPay = maxUserPlanCanEarn - totalPlanCycle
                amountToPay = parseFloat(amountToPay.toFixed(2))
                await client.query(`UPDATE users SET network_balance = network_balance + $1, total_profit = total_profit + $1, total_plan_cycle = 0.00, plan_id = null WHERE id = $2`, [amountToPay, userIdToPay])
                await client.query(`UPDATE users SET renewed = true, role = 'user' WHERE role != 'admin' AND id = $1`, [userIdToPay])
                await client.query(`UPDATE invoices SET status = 'plan_cycle_completed' WHERE status = 'payment_confirmed' AND user_id = $1`, [userIdToPay])
            }

            await client.query('COMMIT')
        }
        catch (err) {
            await client.query('ROLLBACK')
            throw err
        }
        finally {
            client.release()
        }
    }
}

module.exports = CycleService