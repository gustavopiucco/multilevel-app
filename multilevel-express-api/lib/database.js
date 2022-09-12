const { Pool } = require('pg')

//const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const pool = new Pool({})

const testConnection = async () => {
    try {
        await pool.query('SELECT 1')
        console.log('Connected to the database.')
    }
    catch (err) {
        console.error('Database error: ' + err)
        process.exit(1)
    }
}

async function getPoolClient() {
    return await pool.connect()
}

async function query(text, params) {
    return await pool.query(text, params)
}

async function getUsers() {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY id ASC')
        return result.rows
    }
    catch (err) {
        throw err
    }
}

async function getUserByInviteHash(inviteHash) {
    try {
        const result = await pool.query('SELECT id, name FROM users WHERE invite_hash = $1', [inviteHash])
        return result.rows[0];
    }
    catch (err) {
        throw err
    }
}

async function getPlan(id) {
    try {
        const result = await pool.query('SELECT * FROM plans WHERE id = $1', [id])
        return result.rows[0];
    }
    catch (err) {
        throw err
    }
}

async function createInvoice(userId, planId, btcPrice, btcAddress, blockIoNotificationId) {
    try {
        const result = await pool.query(`INSERT INTO invoices(user_id, plan_id, btc_price, btc_address, blockio_notification_id) VALUES($1, $2, $3, $4, $5)`, [userId, planId, btcPrice, btcAddress, blockIoNotificationId])
    }
    catch (err) {
        throw err
    }
}

async function getUserInvoice(userId, invoiceId) {
    try {
        const result = await pool.query(`SELECT * FROM invoices WHERE user_id = $1 AND id = $2`, [userId, invoiceId])
        return result.rows[0]
    }
    catch (err) {
        throw err
    }
}

async function hasUserInvoiceWaitingPaymentOrConfirmed(userId) {
    try {
        const result = await pool.query(`SELECT * FROM invoices WHERE user_id = $1 AND status = 'waiting_payment' OR user_id = $1 AND status = 'payment_confirmed'`, [userId])
        return result.rowCount > 0
    }
    catch (err) {
        throw err
    }
}

module.exports = {
    testConnection,
    getPoolClient,
    query,
    getUsers,
    getUserByInviteHash,
    getPlan,
    createInvoice,
    getUserInvoice,
    hasUserInvoiceWaitingPaymentOrConfirmed,
}