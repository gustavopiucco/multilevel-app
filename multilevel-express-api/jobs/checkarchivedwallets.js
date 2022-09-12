require('dotenv').config()
const database = require('../lib/database')
const blockio = require('../lib/blockio')

async function main() {
    let count = 0
    let totalCount = 0
    let addressesWithBalance = []
    const archivedAddresses = await blockio.getArchivedAddresses()

    archivedAddresses.addresses.reverse()

    for (let address of archivedAddresses.addresses) {
        totalCount++
    }

    for (let address of archivedAddresses.addresses) {
        console.log(count++ + ' of ' + totalCount)

        const addressBalance = await blockio.getAddressBalance(address.address)
        const available_balance = parseFloat(addressBalance.balances[0].available_balance)

        if (available_balance > 0 ) {
            //console.log(await blockio.unarchiveAddress(address.address))
            addressesWithBalance.push({address: address.address, available_balance: available_balance})
            console.log(address.address, available_balance)
        }
    }

    console.log(addressesWithBalance)
}

main()