const database = require('../lib/database')
const randomKey = require('random-key')
const base32 = require('thirty-two')
const notp = require('notp')

class OTPService {
    constructor() { }

    async startOTP(userId) {
        const resultUser = await database.query('SELECT username, otp_enabled, otp_key FROM users WHERE id = $1', [userId])
        const username = resultUser.rows[0].username
        const userOTPEnabled = resultUser.rows[0].otp_enabled
        //const userOTPKey = resultUser.rows[0].otp_key

        if (userOTPEnabled === true) return { error: 'You have already enabled OTP.', errorCode: 400 }

        const key = randomKey.generate(30)

        await database.query('UPDATE users SET otp_key = $2 WHERE id = $1', [userId, key])

        let encoded = base32.encode(key)
        encoded = encoded.toString().replace(/=/g,'')

        var uri = 'otpauth://totp/Multilevel:' + username + '?secret=' + encoded

        return { error: null, uri: uri }
    }

    async verifyToken(userId, token) {
        const resultUser = await database.query('SELECT username, otp_key FROM users WHERE id = $1', [userId])
        const userOTPKey = resultUser.rows[0].otp_key

        const result = notp.totp.verify(token, userOTPKey)

        if (result && result.delta == 0) {
            await database.query('UPDATE users SET otp_enabled = true WHERE id = $1', [userId])

            return { error: null }
        }
        else
            return { error: 'Invalid token.', errorCode: 400 }
    }

    async verify(userId, token) {
        const resultUser = await database.query('SELECT username, otp_key FROM users WHERE id = $1', [userId])
        const userOTPKey = resultUser.rows[0].otp_key

        const result = notp.totp.verify(token, userOTPKey)

        if (result && result.delta == 0)
            return true
        else
            return false
    }
}

module.exports = OTPService