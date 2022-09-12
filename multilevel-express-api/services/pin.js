const database = require('../lib/database')
const mailgun = require('../lib/mailgun')

class PinService {
    constructor() { }

    async createPin(userId) {
        if (await this.validatePinBruteForce(userId)) return { error: 'You can only create a new PIN every 5 minutes.', errorCode: 400 }

        const userResult = await database.query('SELECT username, email FROM users WHERE id = $1', [userId])
        const email = userResult.rows[0].email
        const username = userResult.rows[0].username
        
        const pin = this.generateRandomPin()
        
        await database.query('INSERT INTO pins(user_id, pin) VALUES($1, $2)', [userId, pin])

        mailgun.requestPin(email, username, pin)

        return { error: null }
    }

    async validatePin(userId, pin) {
        const result = await database.query(`SELECT * FROM pins WHERE user_id = $1 AND pin = $2 AND created_at + INTERVAL '30 min' >= CURRENT_TIMESTAMP`, [userId, pin])

        return result.rowCount > 0
    }

    async validatePinBruteForce(userId) {
        const result = await database.query(`SELECT * FROM pins WHERE user_id = $1 AND created_at + INTERVAL '5 min' >= CURRENT_TIMESTAMP`, [userId])

        return result.rowCount > 0
    }

    generateRandomPin() {
        let randomPin = ''
        const possible = '0123456789'

        for (let i = 0; i < 6; i++)
            randomPin += possible.charAt(Math.floor(Math.random() * possible.length))

        return randomPin
    }
}

module.exports = PinService