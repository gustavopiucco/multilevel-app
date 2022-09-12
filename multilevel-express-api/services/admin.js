const database = require('../lib/database')
const validator = require('validator')
const blockchain = require('../lib/blockchain')
const InvoicesService = require('../services/invoices')
const WebhookService = require('../services/webhook')

class AdminService {
    constructor() { }

    async activateUser(adminId, role, address, amount) {
        if (adminId != 1) return { error: 'Unauthorized', errorCode: 400 }
        if (role != 'admin') return { error: 'Unauthorized', errorCode: 400 }
        if (!address || !amount) return { error: 'Fill all required fields.', errorCode: 400 }

        const webhookService = new WebhookService()

        await webhookService.handleBlockIoNotification({
            type: "address",
            notification_id: "activated",
            delivery_attempt: "1",
            data: {
                address: address,
                txid: "activated",
                balance_change: "0.001",
                amount_sent: "0.001",
                amount_received: amount,
                confirmations: "0"
            }
        })

        return { error: null }
    }

    async activateLeader(adminId, role, leaderUsername, leaderPlanId) {
        if (adminId != 1) return { error: 'Unauthorized', errorCode: 400 }
        if (role != 'admin') return { error: 'Unauthorized', errorCode: 400 }
        if (!leaderPlanId || !leaderUsername) return { error: 'Fill all required fields.', errorCode: 400 }
        leaderPlanId = parseInt(leaderPlanId)
        if (isNaN(leaderPlanId) || leaderPlanId < 1 || leaderPlanId > 8) return { error: 'Plan ID must be between 1 and 8', errorCode: 400 }

        const resultLeader = await database.query('SELECT id, username FROM users WHERE username = $1', [leaderUsername])
        const leader = resultLeader.rows[0]

        if (!leader) return { error: 'Leader username does not exist.', errorCode: 400 }

        const resultInvoice = await database.query(`SELECT * FROM invoices WHERE status = 'payment_confirmed' AND user_id = $1 AND user_id = $1`, [leader.id])
        const invoice = resultInvoice.rows[0]

        if (invoice) return { error: 'There is an invoice with Payment Confirmed', errorCode: 400 }

        const client = await database.getPoolClient()

        try {
            await client.query('BEGIN')

            const invoiceService = new InvoicesService()
            await invoiceService.createInvoice(leader.id, leaderPlanId) //create a invoice with status waiting_payment

            await client.query(`UPDATE users SET role = 'leader', plan_id = $2 WHERE id = $1`, [leader.id, leaderPlanId])
            await client.query(`UPDATE invoices SET status = 'payment_confirmed', paid_at = CURRENT_TIMESTAMP WHERE status = 'waiting_payment' AND user_id = $1`, [leader.id])

            await client.query('COMMIT')
        }
        catch (err) {
            await client.query('ROLLBACK')
            return { error: err.message, errorCode: 400 }
        }
        finally {
            client.release()
        }

        return { error: null }
    }

    async changeLeaderPlan(adminId, role, leaderUsername, leaderPlanId) {
        if (adminId != 1) return { error: 'Unauthorized', errorCode: 400 }
        if (role != 'admin') return { error: 'Unauthorized', errorCode: 400 }
        if (!leaderPlanId || !leaderUsername) return { error: 'Fill all required fields.', errorCode: 400 }
        leaderPlanId = parseInt(leaderPlanId)
        if (isNaN(leaderPlanId) || leaderPlanId < 1 || leaderPlanId > 8) return { error: 'Plan ID must be between 1 and 8', errorCode: 400 }

        const resultLeader = await database.query('SELECT id, username, plan_id, role FROM users WHERE username = $1', [leaderUsername])
        const leader = resultLeader.rows[0]

        if (!leader) return { error: 'Leader username does not exist.', errorCode: 400 }
        if (leader.role == 'user') return { error: 'This username is not a leader.', errorCode: 400 }
        if (leader.plan_id == leaderPlanId) return { error: 'Leader already has Plan ID ' + leaderPlanId, errorCode: 400 }

        const resultInvoice = await database.query(`SELECT * FROM invoices WHERE status = 'payment_confirmed' AND user_id = $1`, [leader.id])
        const invoice = resultInvoice.rows[0]
        if (!invoice) return { error: 'The Leader must have an invoice with status Payment Confirmed.', errorCode: 400 }

        const resultInvoiceWaitingPayment = await database.query(`SELECT * FROM invoices WHERE status = 'waiting_payment' AND user_id = $1`, [leader.id])
        if (resultInvoiceWaitingPayment.rowCount > 0) return { error: 'The leader can not have a invoice with status Waiting Payment.', errorCode: 400 }

        const client = await database.getPoolClient()

        try {
            await client.query('BEGIN')

            await database.query(`DELETE FROM invoices WHERE status = 'payment_confirmed' AND user_id = $1`, [leader.id])

            const invoiceService = new InvoicesService()
            await invoiceService.createInvoice(leader.id, leaderPlanId)

            await client.query(`UPDATE users SET plan_id = $2 WHERE id = $1`, [leader.id, leaderPlanId])
            await client.query(`UPDATE invoices SET status = 'payment_confirmed', paid_at = CURRENT_TIMESTAMP WHERE status = 'waiting_payment' AND user_id = $1`, [leader.id])

            await client.query('COMMIT')
        }
        catch (err) {
            await client.query('ROLLBACK')
            return { error: err.message, errorCode: 400 }
        }
        finally {
            client.release()
        }

        return { error: null }
    }

    async changeUser(adminId, role, username, newUsername, newEmail, newName) {
        if (adminId != 1) return { error: 'Unauthorized', errorCode: 400 }
        if (role != 'admin') return { error: 'Unauthorized', errorCode: 400 }
        if (!username) return { error: 'Username is required.', errorCode: 400 }
        if (newEmail && !validator.isEmail(newEmail)) return { error: 'New Email is not a valid email.', errorCode: 400 }

        username = username.trim().toLowerCase()
        newUsername = newUsername.trim().toLowerCase()
        newEmail = newEmail.trim().toLowerCase()
        newName = newName.trim()

        const userResult = await database.query('SELECT 1 FROM users WHERE username = $1', [username])
        if (userResult.rowCount == 0) return { error: 'Username does not exist.', errorCode: 400 }

        if (newUsername) {
            const newUserResult = await database.query('SELECT 1 FROM users WHERE username = $1', [newUsername])
            if (newUserResult.rowCount > 0) return { error: 'New Username already exist.', errorCode: 400 }
        
            await database.query('UPDATE users SET username = $2 WHERE username = $1', [username, newUsername])
        }

        if (newEmail) {
            await database.query('UPDATE users SET email = $2 WHERE username = $1', [username, newEmail])
        }

        if (newName) {
            await database.query('UPDATE users SET name = $2 WHERE username = $1', [username, newName])
        }

        return { error: false }
    }

    async resetOTP(adminId, role, username) {
        if (adminId != 1) return { error: 'Unauthorized', errorCode: 400 }
        if (role != 'admin') return { error: 'Unauthorized', errorCode: 400 }
        if (!username) return { error: 'Username is required.', errorCode: 400 }

        const userResult = await database.query('SELECT 1 FROM users WHERE username = $1', [username])
        if (userResult.rowCount == 0) return { error: 'Username does not exist.', errorCode: 400 }

        await database.query('UPDATE users SET otp_enabled = false WHERE username = $1', [username])

        return { error: false }
    }

    async searchUser(adminId, role, email) {
        if (adminId != 1) return { error: 'Unauthorized', errorCode: 400 }
        if (role != 'admin') return { error: 'Unauthorized', errorCode: 400 }
        if (!email) return { error: 'Email is required.', errorCode: 400 }
        if (!validator.isEmail(email)) return { error: 'Email is not valid.', errorCode: 400 }

        const emailResult = await database.query('SELECT username FROM users WHERE email = $1', [email])

        if (emailResult.rowCount == 0) return { error: "No username found.", errorCode: 400 }

        let usernames = []

        for (let result of emailResult.rows) {
            usernames.push(result.username)
        }

        return { error: false, data: usernames }
    }

    async getUnilevel(adminId) {
        const unilevelResult = await database.query(`WITH RECURSIVE descendants AS (
            SELECT id, parent_id, 0 depth
            FROM users
            WHERE id = $1
        UNION
            SELECT p.id, p.parent_id, d.depth + 1
            FROM users p
            INNER JOIN descendants d
            ON p.parent_id = d.id
        )
        SELECT p.id
        FROM descendants d
        INNER JOIN users p
        ON d.id = p.id
        WHERE p.id <> $1`, [adminId])

        let usersIds = []

        for (let user of unilevelResult.rows) {
            usersIds.push(user.id)
        }

        return usersIds
    }

    async getTeamProfit(adminId, role, fromDate, toDate) {
        const allowedAdminsId = ['1', '2', '6', '8301', '51646', '1107', '8723', '3688', '1189', '4', '3150', '3000', '3']

        if (!allowedAdminsId.includes(adminId)) return { error: 'Unauthorized', errorCode: 400 }
        //if (role != 'admin') return { error: 'Unauthorized', errorCode: 400 }
        if (!fromDate || !toDate) return { error: 'Fill all required fields.', errorCode: 400 }

        let data = []
        let percentage = 0
        let onlyFromUnilevel = false
        let invoicesTotalBtcPrice = 0
        let unilevelIds = []

        switch (adminId) {
            case '1': //Multilevel
                percentage = 0.005
                onlyFromUnilevel = false
                break
            case '2': //btteam1
                percentage = 0.005
                onlyFromUnilevel = false
                break
            case '6': //btteam2
                percentage = 0.01
                onlyFromUnilevel = false
                break
            case '8301': //btteam3
                percentage = 0.015
                onlyFromUnilevel = false
                break 
            case '1107': //btteam4
                percentage = 0.015
                onlyFromUnilevel = false
                break 
            case '8723': //btteam5
                percentage = 0.002
                onlyFromUnilevel = false
                break 
            case '3688': //btteam6
                percentage = 0.005
                onlyFromUnilevel = false
                break 
            case '1189': //btteam7
                percentage = 0.015
                onlyFromUnilevel = false
                break 
            case '51646': //btteam8
                percentage = 0.0002
                onlyFromUnilevel = false
                break
            case '4': //vipbrasil
                percentage = 0.005
                onlyFromUnilevel = true
                break
            case '3150': //Phinom
                percentage = 0.03
                onlyFromUnilevel = true
                break
            case '3000': //cctv
                percentage = 0.015
                onlyFromUnilevel = true
                break
            case '3': //china
                percentage = 0.015
                onlyFromUnilevel = true
                break
            default:
                percentage = 0
                break
        }

        const invoicesResult = await database.query(`SELECT invoices.user_id, users.username, plans.name AS plan_name, invoices.btc_price, invoices.created_at, invoices.paid_at 
        FROM invoices
            INNER JOIN users ON users.id = invoices.user_id
            INNER JOIN plans ON plans.id = invoices.plan_id
        WHERE invoices.paid_at::date BETWEEN $1 AND $2
        AND tx_id IS NOT NULL
        AND tx_id != 'activated_with_balance'
        AND invoices.plan_id < 6`, [fromDate, toDate])

        if (onlyFromUnilevel) {
            unilevelIds = await this.getUnilevel(adminId)
        }

        for (let invoice of invoicesResult.rows) {
            if (onlyFromUnilevel) {
                if (unilevelIds.includes(invoice.user_id)) {
                    invoicesTotalBtcPrice += parseFloat(invoice.btc_price)
                    data.push(invoice)
                }
            }
            else {
                invoicesTotalBtcPrice += parseFloat(invoice.btc_price)
                data.push(invoice)
            }
        }

        return { error: null, data: data, totalBtcPrice: invoicesTotalBtcPrice.toFixed(8), totalProfit: (invoicesTotalBtcPrice * percentage).toFixed(8) }
    }
}

module.exports = AdminService