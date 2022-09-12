const database = require('../lib/database')
const mailgun = require('../lib/mailgun')

class CareerPlanService {
    constructor() { }

    getPointsNeededByCode(code) {
        switch (code) {
            case 'bronze':
                return 50000
            case 'silver':
                return 100000
            case 'gold':
                return 250000
            case 'ruby':
                return 500000
            case 'emerald':
                return 1000000
            case 'diamond':
                return 2500000
            case 'double_diamond':
                return 5000000
            case 'triple_diamond':
                return 12500000
            case 'black_diamond':
                return 50000000
            default:
                return null
        }
    }

    getCodeByPoints(points) {
        if (points >= 50000 && points < 100000)
            return 'bronze'
        else if (points >= 100000 && points < 250000)
            return 'silver'
        else if (points >= 250000 && points < 500000)
            return 'gold'
        else if (points >= 500000 && points < 1000000)
            return 'ruby'
        else if (points >= 1000000 && points < 2500000)
            return 'emerald'
        else if (points >= 2500000 && points < 5000000)
            return 'diamond'
        else if (points >= 5000000 && points < 12500000)
            return 'double_diamond'
        else if (points >= 12500000 && points < 50000000)
            return 'triple_diamond'
        else if (points >= 50000000)
            return 'black_diamond'
        else
            return 'none'
    }

    getPrizeByCode(code) {
        switch (code) {
            case 'bronze':
                return 500
            case 'silver':
                return 1000
            case 'gold':
                return 2500
            case 'ruby':
                return 5000
            case 'emerald':
                return 10000
            case 'diamond':
                return 25000
            case 'double_diamond':
                return 50000
            case 'triple_diamond':
                return 150000
            case 'black_diamond':
                return 1000000
            default:
                return null
        }
    }

    getNamebyCode(code) {
        switch (code) {
            case 'bronze':
                return 'Bronze'
            case 'silver':
                return 'Silver'
            case 'gold':
                return 'Gold'
            case 'ruby':
                return 'Ruby'
            case 'emerald':
                return 'Emerald'
            case 'diamond':
                return 'Diamond'
            case 'double_diamond':
                return 'Double Diamond'
            case 'triple_diamond':
                return 'Triple Diamond'
            case 'black_diamond':
                return 'Black Diamond'
            default:
                return null
        }
    }

    async requestCareerPlan(userId, code) {
        return { error: 'Career Plan system in maintenance.', errorCode: 400 }

        if (!this.getNamebyCode(code)) return { error: 'Invalid request.', errorCode: 400 }
        if (code != 'bronze' && code != 'silver' && code != 'gold') return { error: 'Please contact support.', errorCode: 400 }

        const resultUser = await database.query('SELECT username, email, career_points FROM users WHERE id = $1', [userId])
        const careerPoints = resultUser.rows[0].career_points
        const username = resultUser.rows[0].username
        const email = resultUser.rows[0].email
        const pointsNeeded = this.getPointsNeededByCode(code)
        const prize = this.getPrizeByCode(code)
        const codeName = this.getNamebyCode(code)

        if (careerPoints < pointsNeeded) return { error: 'Insufficient points.', errorCode: 400 }

        const resultCareer = await database.query('SELECT * FROM career_transactions WHERE user_id = $1 AND code = $2', [userId, code])
        if (resultCareer.rowCount > 0) return { error: 'You already made this request.', errorCode: 400 }

        await database.query('UPDATE users SET balance = balance + $2, total_profit = total_profit + $2 WHERE id = $1', [userId, prize])
        await database.query('INSERT INTO career_transactions (user_id, points, code, prize, points_needed, paid) VALUES ($1, $2, $3, $4, $5, $6)', [userId, careerPoints, code, prize, pointsNeeded, true])
        mailgun.careerPlanCongratulations(email, username, codeName)

        return { error: null }
    }
}

module.exports = CareerPlanService