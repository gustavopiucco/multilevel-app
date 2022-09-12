require('dotenv').config()
const database = require('../lib/database')
const fs = require('fs')

async function main() {
    //const usersResult = await database.query(`SELECT * FROM users WHERE total_profit > 0 AND country_id = 'BR' AND plan_id > 2 ORDER BY total_profit DESC`)
    const usersResult = await database.query(`SELECT * FROM users WHERE username IN ('888top')`)

    let count = 0
    let total = 0

    for (let user of usersResult.rows) {
        count++

        const withdrawResult = await database.query('SELECT SUM(amount) FROM withdraw_transactions WHERE paid = true AND user_id = $1', [user.id])
        const totalWithdraw = (withdrawResult.rows[0].sum != null ? parseFloat(withdrawResult.rows[0].sum) : 0)

        const invoicesResult = await database.query(`SELECT SUM(price) FROM invoices WHERE user_id = $1 AND tx_id IS NOT NULL AND paid_at IS NOT NULL`, [user.id])
        const totalInvoices = (invoicesResult.rows[0].sum != null ? parseFloat(invoicesResult.rows[0].sum) : 0)

        console.log(totalInvoices, totalWithdraw)

        if (totalInvoices > totalWithdraw) {
            total = total + (totalInvoices - totalWithdraw)

            //fs.appendFileSync('report.txt', user.username + ' ' + totalInvoices + ' ' + totalWithdraw + '\r\n')

            console.log(count + ' ' + user.username + ' investiu ' + totalInvoices + ' e sacou ' + totalWithdraw)
            console.log(total)
        }

        // if (totalInvoices > totalWithdraw) {
            
        //     if ((totalInvoices - totalWithdraw) > (totalInvoices / 2)) { //abaixo 50%
        //         total = total + (totalInvoices - totalWithdraw)

        //         fs.appendFileSync('report.txt', user.username + ' ' + totalInvoices + ' ' + totalWithdraw + '\r\n')

        //         console.log(count + ' ' + user.username + ' investiu ' + totalInvoices + ' e sacou ' + totalWithdraw)
        //         console.log(total)
        //     }
        // }
    }
}

main()