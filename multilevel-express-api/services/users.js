const database = require('../lib/database')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const shortid = require('shortid')
const mailgun = require('../lib/mailgun')
const WAValidator = require('wallet-address-validator')
const BinaryService = require('./binary')
const PinService = require('./pin')
const utils = require('../lib/utils')

class UsersService {
    constructor() { }

    async createUser(user) {
        if (!user.name || !user.country || !user.username || !user.email || !user.confirmEmail || !user.password || !user.confirmPassword) return { error: 'Please fill in all required fields.', errorCode: 400 }
        if (!validator.isAlphanumeric(user.username)) return { error: 'Username must be alphanumeric.', errorCode: 400 }
        if (!validator.isLength(user.username, { min: 4, max: 30 })) return { error: 'Username must be between 4 and 30 characters', errorCode: 400 }
        if (!validator.isEmail(user.email)) return { error: 'Email is not valid.', errorCode: 400 }
        if (user.email !== user.confirmEmail) return { error: 'Email confirmation does not match.', errorCode: 400 }
        if (!validator.isLength(user.password, { min: 6, max: 30 })) return { error: 'Password must be between 6 and 30 characters.', errorCode: 400 }
        if (user.password !== user.confirmPassword) return { error: 'Password confirmation does not match.', errorCode: 400 }

        const sponsor = await database.getUserByInviteHash(user.inviteHash)

        if (!sponsor) return { error: 'Sponsor does not exist.', errorCode: 400 }

        try {
            const salt = await bcrypt.genSalt(10)
            const password_hash = await bcrypt.hash(user.password, salt)
            const invite_hash = shortid.generate()

            const result = await database.query(`
            INSERT INTO users(parent_id, country_id, invite_hash, name, username, email, password_hash) 
            VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, username, email`,
                [sponsor.id, user.country, invite_hash, user.name, user.username.toLowerCase(), user.email.toLowerCase(), password_hash])

            const createdUserId = result.rows[0].id
            const createdUsername = result.rows[0].username
            const createdEmail = result.rows[0].email

            const binaryService = new BinaryService()
            await binaryService.setBinaryPosition(sponsor.id, createdUserId)
            await binaryService.incrementPreviousUsersCount(createdUserId)

            mailgun.registrationSuccessful(createdEmail, createdUsername)

            return { error: null }
        }
        catch (err) {
            if (err.code === '23505' && err.constraint === 'users_username_key')
                return { error: 'Username already exists.', errorCode: 400 }
            else
                throw err
        }
    }

    async updateUserBinarySide(userId, binarySide) {
        await database.query('UPDATE users SET binary_side = $2 WHERE id = $1', [userId, binarySide])

        return { error: null }
    }

    async updateUserBtcAddress(userId, btcAddress, pin) {
        if (!btcAddress || !pin) return { error: 'Please fill in all required fields.', errorCode: 400 }
        if (!WAValidator.validate(btcAddress, 'BTC')) return { error: 'Invalid BTC Address.', errorCode: 400 }
        
        const pinService = new PinService()

        if (! await pinService.validatePin(userId, pin)) return { error: 'Invalid PIN.', errorCode: 400}

        await database.query('UPDATE users SET btc_address = $2 WHERE id = $1', [userId, btcAddress])

        return { error: null }
    }

    async updateUserPassword(userId, newPassword, confirmNewPassword) {
        if (!newPassword || !confirmNewPassword) return { error: 'Please fill in all required fields.', errorCode: 400 }
        if (!validator.isLength(newPassword, { min: 6, max: 30 })) return { error: 'Password must be between 6 and 30 characters.', errorCode: 400 }
        if (newPassword !== confirmNewPassword) return { error: 'Password confirmation does not match.', errorCode: 400 }

        const salt = await bcrypt.genSalt(10)
        const password_hash = await bcrypt.hash(newPassword, salt)

        await database.query('UPDATE users SET password_hash = $2 WHERE id = $1', [userId, password_hash])

        return { error: null }
    }

    async updateUserPin(userId, pin, newPin, confirmNewPin) {
        if (isNaN(newPin)) return { error: 'New PIN must be numeric.', errorCode: 400 }
        if (!validator.isLength(newPin, { min: 6, max: 6 })) return { error: 'New PIN must have exactly 6 digits.', errorCode: 400 }
        if (newPin != confirmNewPin) return { error: 'PIN confirmation does not match.', errorCode: 400 }

        const resultPin = await database.query(`SELECT pin FROM users WHERE id = $1`, [userId])
        const userPin = resultPin.rows[0].pin
        
        if (!pin) {
            if (userPin) return { error: 'You must enter your current PIN.', errorCode: 400 }
        } else {
            if (pin != userPin) return { error: 'PIN is incorrect.', errorCode: 400 }
        }

        if (!newPin || !confirmNewPin) return { error: 'Please fill in all required fields.', errorCode: 400 }

        await database.query(`UPDATE users SET pin = $2 WHERE id = $1`, [userId, newPin])

        return { error: false }
    }

    async getUserBinarySide(userId) {
        const result = await database.query('SELECT binary_side FROM users WHERE id = $1', [userId])
        const binarySide = result.rows[0].binary_side

        return { error: null, data: binarySide }
    }

    async getUserFullname(inviteHash) {
        const user = await database.getUserByInviteHash(inviteHash)

        if (user) {
            const data = { name: user.name } //send only name, because getUserByInviteHash can return restricted data
            return { error: null, data: data }
        }
        else
            return { error: true, errorCode: 400 }
    }

    async getUser(userId) {
        const result = await database.query('SELECT id, total_points_left, total_points_right, total_users_left, total_users_right, invite_hash, binary_side, qualified, plan_id, username, name, email, balance, network_balance, total_profit, career_points, career_plan, total_plan_cycle, btc_address, created_at FROM users WHERE id = $1', [userId])

        const user = result.rows[0]

        if (user.pin) {
            user.pin = true
        }

        return { error: null, data: user }
    }

    async changeUserName(userId, newName) {
        if (!newName) return { error: 'Please fill in all required fields.', errorCode: 400 }

        await database.query('UPDATE users SET name = $2 WHERE id = $1', [userId, newName])

        return { error: null }
    }

    async changeUserEmail(userId, newEmail, confirmNewEmail, pin) {
        if (!newEmail || !confirmNewEmail || !pin) return { error: 'Please fill in all required fields.', errorCode: 400 }
        if (newEmail !== confirmNewEmail) return { error: 'Email confirmation does not match.', errorCode: 400 }
        if (!validator.isEmail(newEmail)) return { error: 'Email is not valid.', errorCode: 400 }

        const pinService = new PinService()

        if (! await pinService.validatePin(userId, pin)) return { error: 'Invalid PIN.', errorCode: 400}

        await database.query('UPDATE users SET email = $2 WHERE id = $1', [userId, newEmail])

        return { error: null }
    }

    async getUserBalance(userId) {
        const result = await database.query('SELECT balance, network_balance, btc_address FROM users WHERE id = $1', [userId])

        return { error: null, data: result.rows[0] }
    }

    async uploadUserDocument(userId) {
        await utils.sleep(5000)

        return { error: null}
    }
}

module.exports = UsersService