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

async function main() {
    const paidBinaryResult = await database.query('SELECT * FROM binary_transactions WHERE created_at::date = CURRENT_TIMESTAMP::date LIMIT 1')

    if (paidBinaryResult.rowCount > 0) {
        console.log('Daily binary already paid.')
        return
    }

    const usersResult = await database.query('SELECT id, username, plan_id, total_points_left, total_points_right, qualified FROM users ORDER BY id')
    const users = usersResult.rows

    for (let user of users) {
        user.total_points_left = parseInt(user.total_points_left)
        user.total_points_right = parseInt(user.total_points_right)

        if (user.plan_id == null) continue
        if (!user.qualified) continue
        if (user.total_points_left == 0 || user.total_points_right == 0) continue

        console.log(user.username, user.total_points_left, user.total_points_right)

        let amountToPay
        let maxGain = getPlanIdPrice(user.plan_id) //the max earn for binary is the plan price

        if (user.total_points_left == user.total_points_right) {
            amountToPay = (user.total_points_left * 0.10) //can be left or right because both side are equal
            if (amountToPay > maxGain) {
                amountToPay = maxGain
            }
            amountToPay = parseInt(amountToPay)

            await database.query('UPDATE users SET total_points_left = 0, total_points_right = 0 WHERE id = $1', [user.id])
            await database.query('UPDATE users SET career_points = career_points + $2 WHERE id = $1', [user.id, user.total_points_left]) //can be left or right because both side are equal
        }
        else if (user.total_points_left < user.total_points_right) { //left minor, pay left
            amountToPay = (user.total_points_left * 0.10)
            if (amountToPay > maxGain) {
                amountToPay = maxGain
            }
            amountToPay = parseInt(amountToPay)

            await database.query('UPDATE users SET total_points_left = 0, total_points_right = total_points_right - $2 WHERE id = $1', [user.id, user.total_points_left])
            await database.query('UPDATE users SET career_points = career_points + $2 WHERE id = $1', [user.id, user.total_points_left])
        }
        else { //right minor, pay right
            amountToPay = (user.total_points_right * 0.10)
            if (amountToPay > maxGain) {
                amountToPay = maxGain
            }
            amountToPay = parseInt(amountToPay)

            await database.query('UPDATE users SET total_points_right = 0, total_points_left = total_points_left - $2 WHERE id = $1', [user.id, user.total_points_right])
            await database.query('UPDATE users SET career_points = career_points + $2 WHERE id = $1', [user.id, user.total_points_right])
        }

        const cycleService = new CycleService()
        await cycleService.increaseNetworkBalance(user.id, user.plan_id, amountToPay)
        await database.query('INSERT INTO binary_transactions (user_id, amount_paid) VALUES ($1, $2)', [user.id, amountToPay])
    }
}

main()