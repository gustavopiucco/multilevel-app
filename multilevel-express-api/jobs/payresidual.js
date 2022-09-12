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

async function getResidualUsers(userId, planId) {
    let upToLevel = planId

    const result = await database.query(`
    WITH RECURSIVE descendants AS (
        SELECT id, parent_id, 0 depth
        FROM users
        WHERE id = $1
    UNION
        SELECT p.id, p.parent_id, d.depth + 1
        FROM users p
        INNER JOIN descendants d
        ON p.parent_id = d.id
    )
    SELECT p.username, p.plan_id, role, depth AS level, p.created_at AS date
    FROM descendants d
    INNER JOIN users p
    ON d.id = p.id
    WHERE p.id <> $1
    AND plan_id IS NOT NULL
    AND role = 'user'
    AND depth BETWEEN 1 AND $2
    `, [userId, upToLevel])

    return result.rows
}

async function payResidual() {
    const date = '2019-10-15'
    const percentage = 0.42

    const usersResult = await database.query(`
    SELECT id, username, plan_id, role FROM users 
    WHERE plan_id IS NOT NULL 
    ORDER BY id`)

    let count = 0

    for (let user of usersResult.rows) {
        count++
        console.log(count)

        const residualAlreadyPaidResult = await database.query('SELECT 1 FROM residual_transactions WHERE user_id = $1 AND created_at::date = $2', [user.id, date])
        if (residualAlreadyPaidResult.rowCount > 0) continue //residual ja foi pago para esse usuario nessa data

        const userInvoiceResult = await database.query(`SELECT 1 FROM invoices WHERE status = 'payment_confirmed' AND (paid_at::date < $2 OR is_upgrade = true) AND user_id = $1`, [user.id, date])
        if (userInvoiceResult.rowCount == 0) continue

        const residualUsers = await getResidualUsers(user.id, user.plan_id)
        if (residualUsers.length == 0) continue

        let residualPrice = 0

        for (let residualUser of residualUsers) {
            const planPrice = getPlanIdPrice(residualUser.plan_id)
            const robotPrice = (planPrice * percentage) / 100

            residualPrice = residualPrice + robotPrice
        }

        let residualAmountToPay = (residualPrice * 2) / 100
        residualAmountToPay = parseFloat(residualAmountToPay.toFixed(2))

        const cycleService = new CycleService()
        await cycleService.increaseBalance(user.id, user.plan_id, residualAmountToPay)
        await database.query('INSERT INTO residual_transactions (user_id, plan_id, percentage, amount_paid, created_at) VALUES ($1, $2, $3, $4, $5)', [user.id, user.plan_id, percentage, residualAmountToPay, date])

        console.log(user.username, residualUsers.length, residualAmountToPay)
    }
}

payResidual()