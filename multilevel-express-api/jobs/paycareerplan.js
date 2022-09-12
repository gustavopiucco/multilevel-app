require('dotenv').config()
const database = require('../lib/database')
const DirectService = require('../services/direct')
const mailgun = require('../lib/mailgun')

async function isQualified(userId, careerPlanId) {
    const directService = new DirectService()
    const directNetwork = await directService.getDirectNetworkData(userId)
    
    let qualifiedLeft = false
    let qualifiedRight = false

    for (let direct of directNetwork) {
        if (direct.career_plan == null) continue

        if (direct.side == 'left' && direct.career_plan >= careerPlanId) {
            qualifiedLeft = true
        }

        if (direct.side == 'right' && direct.career_plan >= careerPlanId) {
            qualifiedRight = true
        }
    }

    return qualifiedLeft && qualifiedRight
}

async function alreadPaid(userId, careerPlanId) {
    const careerResult = await database.query(`SELECT * FROM career_transactions WHERE user_id = $1 AND career_plan = $2`, [userId, careerPlanId])
    
    return careerResult.rowCount > 0
}

async function main() {
    const users = await database.query(`SELECT id, username, email, career_points, career_plan FROM users WHERE career_points >= 50000`)

    for (let user of users.rows) {
        console.log('checking', user.username)

        if (user.career_points >= 50000) { //bronze
            if (!await alreadPaid(user.id, 1)) {
                await database.query('UPDATE users SET balance = balance + $2, total_profit = total_profit + $2, career_plan = $3 WHERE id = $1', [user.id, 500, 1])
                await database.query('INSERT INTO career_transactions (user_id, prize, points_needed, paid, career_plan) VALUES ($1, $2, $3, $4, $5)', [user.id, 500, 50000, true, 1])
                mailgun.careerPlanCongratulations(user.email, user.username, 'Bronze')
                console.log(user.username, 'bronze prize')
            }
        }
        
        if (user.career_points >= 100000) { //silver
            if (!await alreadPaid(user.id, 2)) {
                await database.query('UPDATE users SET balance = balance + $2, total_profit = total_profit + $2, career_plan = $3 WHERE id = $1', [user.id, 1000, 2])
                await database.query('INSERT INTO career_transactions (user_id, prize, points_needed, paid, career_plan) VALUES ($1, $2, $3, $4, $5)', [user.id, 1000, 100000, true, 2])
                mailgun.careerPlanCongratulations(user.email, user.username, 'Silver')
                console.log(user.username, 'silver prize')
            }
        }

        if (user.career_points >= 250000) { //gold
            if (!await alreadPaid(user.id, 3)) {
                await database.query('UPDATE users SET balance = balance + $2, total_profit = total_profit + $2, career_plan = $3 WHERE id = $1', [user.id, 2500, 3])
                await database.query('INSERT INTO career_transactions (user_id, prize, points_needed, paid, career_plan) VALUES ($1, $2, $3, $4, $5)', [user.id, 2500, 250000, true, 3])
                mailgun.careerPlanCongratulations(user.email, user.username, 'Gold')
                console.log(user.username, 'gold prize')
            }
        }
        
        if (user.career_points >= 500000) { //ruby
            if (await isQualified(user.id, 2)) { //silver each side
                if (!await alreadPaid(user.id, 4)) {
                    await database.query('UPDATE users SET balance = balance + $2, total_profit = total_profit + $2, career_plan = $3 WHERE id = $1', [user.id, 5000, 4])
                    await database.query('INSERT INTO career_transactions (user_id, prize, points_needed, paid, career_plan) VALUES ($1, $2, $3, $4, $5)', [user.id, 5000, 500000, true, 4])
                    mailgun.careerPlanCongratulations(user.email, user.username, 'Ruby')
                    console.log(user.username, 'ruby prize')
                }
            }
        }
        
        if (user.career_points >= 1000000) { //emerald
            if (await isQualified(user.id, 3)) { //gold each side
                if (!await alreadPaid(user.id, 5)) {
                    await database.query('UPDATE users SET balance = balance + $2, total_profit = total_profit + $2, career_plan = $3 WHERE id = $1', [user.id, 10000, 5])
                    await database.query('INSERT INTO career_transactions (user_id, prize, points_needed, paid, career_plan) VALUES ($1, $2, $3, $4, $5)', [user.id, 10000, 1000000, true, 5])
                    mailgun.careerPlanCongratulations(user.email, user.username, 'Emerald')
                    console.log(user.username, 'emerald prize')
                }
            }
        }
        
        // if (user.career_points >= 2500000) { //diamond
        //     if (await isQualified(user.id, 5)) { //emerald each side
        //         if (!await alreadPaid(user.id, 6)) {
        //             await database.query('UPDATE users SET balance = balance + $2, total_profit = total_profit + $2, career_plan = $3 WHERE id = $1', [user.id, 100000, 6])
        //             await database.query('INSERT INTO career_transactions (user_id, prize, points_needed, paid, career_plan) VALUES ($1, $2, $3, $4, $5)', [user.id, 100000, 2500000, true, 6])
        //             mailgun.careerPlanCongratulations(user.email, user.username, 'Diamond')
        //             console.log(user.username, 'diamond prize')
        //         }
        //     }
        // }
        
        // if (user.career_points >= 5000000) { //double diamond
        //     if (await isQualified(user.id, 6)) { //diamond each side
        //         if (!await alreadPaid(user.id, 7)) {
        //             await database.query('UPDATE users SET balance = balance + $2, total_profit = total_profit + $2, career_plan = $3 WHERE id = $1', [user.id, 200000, 7])
        //             await database.query('INSERT INTO career_transactions (user_id, prize, points_needed, paid, career_plan) VALUES ($1, $2, $3, $4, $5)', [user.id, 200000, 5000000, true, 7])
        //             mailgun.careerPlanCongratulations(user.email, user.username, 'Double Diamond')
        //             console.log(user.username, 'double diamond prize')
        //         }
        //     }
        // }
        
        // if (user.career_points >= 12500000) { //triple diamond
        //     if (await isQualified(user.id, 7)) { //double diamond each side
        //         if (!await alreadPaid(user.id, 8)) {
        //             await database.query('UPDATE users SET balance = balance + $2, total_profit = total_profit + $2, career_plan = $3 WHERE id = $1', [user.id, 400000, 8])
        //             await database.query('INSERT INTO career_transactions (user_id, prize, points_needed, paid, career_plan) VALUES ($1, $2, $3, $4, $5)', [user.id, 400000, 12500000, true, 8])
        //             mailgun.careerPlanCongratulations(user.email, user.username, 'Triple Diamond')
        //             console.log(user.username, 'triple diamond prize')
        //         }
        //     }
        // }
        
        // if (user.career_points >= 50000000) { //black diamond
        //     if (await isQualified(user.id, 8)) { //triple diamond each side
        //         if (!await alreadPaid(user.id, 9)) {
        //             await database.query('UPDATE users SET balance = balance + $2, total_profit = total_profit + $2, career_plan = $3 WHERE id = $1', [user.id, 1000000, 9])
        //             await database.query('INSERT INTO career_transactions (user_id, prize, points_needed, paid, career_plan) VALUES ($1, $2, $3, $4, $5)', [user.id, 1000000, 50000000, true, 9])
        //             mailgun.careerPlanCongratulations(user.email, user.username, 'Black Diamond')
        //             console.log(user.username, 'black diamond prize')
        //         }
        //     }
        // }
    }
}

main()