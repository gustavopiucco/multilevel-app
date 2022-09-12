require('dotenv').config()
const database = require('../lib/database')
const blockio = require('../lib/blockio')

async function main() {
    console.log('Running archiveUnusedAddresses()')
    const unarchivedAddresses = await blockio.getUnarchivedAddresses()
    let count = 0

    for (let address of unarchivedAddresses.addresses) {
        count++

        if (address.label == 'default') continue
        if (parseFloat(address.pending_received_balance) > 0) continue
        if (parseFloat(address.available_balance) > 0) continue

        try {
            console.log(await blockio.archiveAddress(address.address))
            console.log(count)
        }
        catch (err) {
            console.log(err.message)
        }
    }
}

main()