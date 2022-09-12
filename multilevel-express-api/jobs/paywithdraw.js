require('dotenv').config()
const database = require('../lib/database')
const mailgun = require('../lib/mailgun')
const blockio = require ('../lib/blockio')
const blockchain = require ('../lib/blockchain')
const request = require('request-promise')

async function main() {
    // let count = 0
    // const resultWithdraws = await database.query(`SELECT * FROM withdraw_transactions WHERE paid = false AND id IN (95524) ORDER BY created_at ASC`)

    // for (let withdraw of resultWithdraws.rows) {
    //     console.log(count++)

    //     const fee = 0.11
    //     const amountMinusFee = parseFloat( (parseFloat(withdraw.amount) - (parseFloat(withdraw.amount * fee))).toFixed(2) )
    //     const totalBtc = await blockchain.usdToBtc(amountMinusFee)

    //     const blockIoWithdraw = await blockio.withdraw(withdraw.btc_address, totalBtc)

    //     await database.query(`UPDATE withdraw_transactions SET tx_id = $2, paid = true WHERE id = $1`, [withdraw.id, blockIoWithdraw.txid])

    //     const userResult = await database.query(`SELECT username, email FROM users WHERE id = $1`, [withdraw.user_id])
    //     const username = userResult.rows[0].username
    //     const email = userResult.rows[0].email

    //     mailgun.withdrawPaymentConfirmed(email, username, withdraw.amount, blockIoWithdraw.txid)

    //     console.log(username, withdraw.amount, amountMinusFee, totalBtc, withdraw.btc_address, blockIoWithdraw.txid)
    // }

    let count = 0
    const resultWithdraws = await database.query(`SELECT w.id, u.username, u.email, u.name, w.amount FROM withdraw_transactions w
    LEFT JOIN users u ON w.user_id = u.id
    WHERE w.paid = false`)

    for (let withdraw of resultWithdraws.rows) {
        console.log(count++)

        const addSaldo = parseFloat(withdraw.amount) / 0.10

        const result = await request({ 
            method: 'POST', 
            uri: 'https://888cryptotrade.com/api/saldoCryptotrade',
            headers: {
                token: 'FDSfsdf#sfs@sdfsfFSDf8979fsdsFSDf8sfDSF#2dsffds@sdf'
            },
            body: {
                nome_completo: 'Multilevel',
                usuario: withdraw.username,
                email: withdraw.email,
                //email: '888test@mailinator.com',
                add_saldo: addSaldo
            },
            json: true
        })

        if (result.success == false) {
            console.log(withdraw.username, withdraw.name, withdraw.email)
            console.log(result)
            continue
        }

        await database.query(`UPDATE withdraw_transactions SET tx_id = $2, paid = true WHERE id = $1`, [withdraw.id, '888 Coin'])

        mailgun.withdrawPaymentConfirmed(withdraw.email, withdraw.username, withdraw.amount)

        console.log(withdraw.username, withdraw.amount, addSaldo)
    }
}

main()