require('dotenv').config()
const database = require('../lib/database')

async function main() {
    const withdraws = await database.query(`select * from withdraw_transactions where paid = false`)

    for (let withdraw of withdraws.rows) {
        await database.query('UPDATE users SET network_balance = network_balance + $2 WHERE id = $1', [withdraw.user_id, withdraw.amount])
        await database.query('DELETE FROM withdraw_transactions WHERE id = $1', [withdraw.id])

        console.log(withdraw.user_id, withdraw.amount)
    }
}

main()