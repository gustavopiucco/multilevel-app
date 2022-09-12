require('dotenv').config()
const database = require('../lib/database')
const blockio = require('../lib/blockio')

async function main() {
    //console.log(await blockio.withdrawFromAddress('34dgB26N9LTPhimDDF1swFj2fJLNUPGjLg', '17XzGyLoC96jqCqGZBvCZJ1r6Z7z2t8qrM', 0.281123))

    const result = await blockio.getAddressBalance('341rcCoHQa5MG4Z9jL8ejChY1TipjZ1yHk,3KNWTDZeLcuRrNu7yeNiSrwBJeHQjCymoM,3HKkrBZiTnbDdYQCGEMaenYmMFdqvcdt16,3DSKcyJXFT7NwcFE4Byu5Gn37KT4oiVvjG,35qL3njFSdjaH7mYBSpNUvKg7YFcHtAhzs,3KQJVTKxrvsXg73h2U1Y985pL3iyxCjs5e,3BKkFwix3borfDY24hmZBPnxpab4fe5Sv9,3BUQ3jBfJ1YZxWjMSRqYnu6QtHPcr7gukD,3C3zAkTcmeLbhpK7cCBkXfTS2i5CqvH1SZ,3HHawAXQXM6HEvJQWHKN72RsP5nbzuwgB4,3Do2UFRpw7BTFv1xA4zhELGXE2RVyqhXNN,34m9Q4EpoCTYLxAbZonAFrkMvnzwb2H2vY,363aATKvbW9fNEHT83Uor5RCoE58SNgVEm,3Qsm9cPPujAaUZTckNvbSRGLdPR2P29q7W,34dgB26N9LTPhimDDF1swFj2fJLNUPGjLg,3GgnvA7q9dcp2fSAyBa87pUo4UR2F6JFKr,32o94K9bAwWcBa4ZbnV98j8sZniDix7Gxh,35tPhy3WzxxERKd8tJ6yP2hnzCw2daDmvB,347mzRpBjkmboaB2S2j12dBPiECPTWxZJH,3EmucbLZSNy7FeHvRCvo2UWLxs16sEUGRw,3QmqiYCifD2oJ7vsFfqUczbBgpAxF7Kd4o,34pQSkxCs5xPjsMQuFhqbS47fNMAWrpote,32xuppJuKv15xGSwwGJFAjJfU49aFVockS,3EbqbdyBoBxaT4uiSRLNNSzJgsb4eJpKMe,336Mo5LcTs3rxxXhtW3ADqThBtjzEJ6wHS,37g1z6xbP2bwekCpJfdUtGwoC5LmDkTWxm,3Afyk6akJ7cFuVBuB11SicpWqoyQJ1NghL,31vZczKtysiFbz51CSJKdsZxisaXCMvHeL,3DtxT8vp8yH6EnoYEJYTCC3a1Dd728Y3yR,39fCPgFuxgRfu7BSCGSqCBxjrSasvNxhLz,32vekmR6HvX3q48k2s9mPiZEZ1am8qBnWE,3NARTdeXfUbBwffThjgkMR4eeVsG5wgf31,3A4TYT3ayjmbiccotJnPefzDFpBphZavYr')

    for (balance of result.balances) {
        balance.available_balance = parseFloat(balance.available_balance)
        const balance_ok = parseFloat((balance.available_balance - 0.001).toFixed(8))

        if (balance_ok < 0) continue

        console.log(await blockio.withdrawFromAddress(balance.address, '188Sj9jvyq3V2uuUm75b5chuYS6gAibXsa', balance_ok))

        console.log(balance.address + ' ' + balance.available_balance + ' ' + balance_ok)
    }
}

main()