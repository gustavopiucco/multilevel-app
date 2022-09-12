require('dotenv').config()
const database = require('../lib/database')
const CycleService = require('../services/cycle')

function getPlanIdPrice(planId) {
    switch (planId) {
        case 1:
            return 100.00
        case 2:
            return 500.00
        case 3:
            return 1000.00
        case 4:
            return 2500.00
        case 5:
            return 5000.00
        case 6:
            return 12500.00
        case 7:
            return 25000.00
        case 8:
            return 50000.00
        default:
            return 0
    }
}

async function payRobot() {
    const date = '2019-10-15'
    const percentage = 0.42

    const usersResult = await database.query(`
    SELECT id, username, plan_id, role FROM users 
    WHERE plan_id IS NOT NULL 
    AND role != 'leader'
    ORDER BY id`)

    let count = 0

    for (let user of usersResult.rows) {
        count++
        console.log(count)

        const residualAlreadyPaidResult = await database.query('SELECT 1 FROM robot_transactions WHERE user_id = $1 AND created_at::date = $2', [user.id, date])
        if (residualAlreadyPaidResult.rowCount > 0) continue //residual ja foi pago para esse usuario nessa data

        const userInvoiceResult = await database.query(`SELECT 1 FROM invoices WHERE status = 'payment_confirmed' AND (paid_at::date < $2 OR is_upgrade = true) AND user_id = $1`, [user.id, date])
        if (userInvoiceResult.rowCount == 0) continue

        const cycleService = new CycleService()

        let planPrice = getPlanIdPrice(user.plan_id)
        let amountToPay = parseFloat((planPrice * percentage) / 100)

        await cycleService.increaseBalance(user.id, user.plan_id, amountToPay)
        await database.query('INSERT INTO robot_transactions (user_id, plan_id, percentage, amount_paid, created_at) VALUES ($1, $2, $3, $4, $5)', [user.id, user.plan_id, percentage, amountToPay, date])

        console.log(user.username, amountToPay)
    }
}

payRobot()