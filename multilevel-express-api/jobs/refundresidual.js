require('dotenv').config()
const database = require('../lib/database')

async function main() {
    const residuals = await database.query(`SELECT * FROM residual_transactions WHERE created_at::date = '2019-08-29'`)

    for (let residual of residuals.rows) {
        //await database.query('UPDATE users SET network_balance = network_balance - $2 WHERE id = $1', [residual.user_id, residual.amount_paid])
        //await database.query('UPDATE users SET balance = balance + $2 WHERE id = $1', [residual.user_id, residual.amount_paid])

        console.log(residual.user_id, residual.amount_paid)
    }
}

main()