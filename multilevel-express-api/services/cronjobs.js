const schedule = require('node-schedule')
const database = require('../lib/database')
const BinaryService = require('../services/binary')
const blockio = require('../lib/blockio')

class CronJobService {
    constructor() {
        this.registerCronJobs()
    }

    registerCronJobs() {
        //https://crontab.guru

        //every 1 minute
        schedule.scheduleJob('* * * * *', () => {
            this.expireInvoices()
        });

        //at every 5th minute
        schedule.scheduleJob('*/3 * * * *', () => {
            //this.setQualification()
        })

        schedule.scheduleJob('0 * * * *', () => {
            //this.archiveUnusedAddresses()
        })
    }

    async expireInvoices() {
        console.log('Running expireInvoices()')
        await database.query(`UPDATE invoices SET status = 'expired' WHERE status = 'waiting_payment' AND created_at + INTERVAL '720 min' <= CURRENT_TIMESTAMP`)
    }

    async setQualification() {
        console.log('Running setQualification()')
        const binaryService = new BinaryService()
        await binaryService.setUsersQualified()
    }

    async archiveUnusedAddresses() {
        console.log('Running archiveUnusedAddresses()')
        const unarchivedAddresses = await blockio.getUnarchivedAddresses()

        for (let address of unarchivedAddresses.addresses) {
            if (address.label == 'default') continue
            if (parseFloat(address.pending_received_balance) > 0) continue
            if (parseFloat(address.available_balance) > 0) continue

            try {
                await blockio.archiveAddress(address.address)
            }
            catch (err) {
                console.log(err.message)
            }
        }
    }
}

module.exports = CronJobService