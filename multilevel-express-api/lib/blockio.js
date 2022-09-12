const BlockIo = require('block_io')

const client = new BlockIo(process.env.BLOCKIO_API_KEY, process.env.BLOCKIO_PIN, 2);

function getCurrentPrice() {
    return new Promise((resolve, reject) => {
        client.get_current_price({ price_base: 'USD' }, (error, data) => {
            if (error) {
                return reject(error)
            }
            resolve(data)
        })
    })
}

function getNewAddress() {
    return new Promise((resolve, reject) => {
        client.get_new_address({}, (error, data) => {
            if (error) {
                return reject(error)
            }
            resolve(data.data.address)
        })
    })
}

function createWebhookNotification(address) {
    return new Promise((resolve, reject) => {
        client.create_notification({ type: 'address', address: address, url: process.env.BLOCKIO_WEBHOOK_URL }, (error, data) => {
            if (error) {
                return reject(error)
            }
            resolve(data.data)
        })
    })
}

function disableWebhookNotification(notificationId) {
    return new Promise((resolve, reject) => {
        client.disable_notification({ notification_id: notificationId }, (error, data) => {
            if (error) {
                return reject(error)
            }
            resolve(data)
        })
    })
}

function getAddressBalance(address) {
    return new Promise((resolve, reject) => {
        client.get_address_balance({addresses: address}, (error, data) => {
            if (error) {
                return reject(error)
            }
            resolve(data.data)
        })
    })
}

function getArchivedAddresses() {
    return new Promise((resolve, reject) => {
        client.get_my_archived_addresses({}, (error, data) => {
            if (error) {
                return reject(error)
            }
            resolve(data.data)
        })
    })
}

function getUnarchivedAddresses() {
    return new Promise((resolve, reject) => {
        client.get_my_addresses({}, (error, data) => {
            if (error) {
                return reject(error)
            }
            resolve(data.data)
        })
    })
}

function archiveAddress(address) {
    return new Promise((resolve, reject) => {
        client.archive_addresses({ type: 'address', address: address }, (error, data) => {
            if (error) {
                return reject(error)
            }
            resolve(data.data)
        })
    })
}

function unarchiveAddress(address) {
    return new Promise((resolve, reject) => {
        client.unarchive_addresses({ type: 'address', address: address }, (error, data) => {
            if (error) {
                return reject(error)
            }
            resolve(data.data)
        })
    })
}

function withdraw(address, amount) {
    return new Promise((resolve, reject) => {
        client.withdraw({ amounts: amount, to_addresses: address }, (error, data) => {
            if (error) {
                return reject(error)
            }
            resolve(data.data)
        })
    })
}

function withdrawFromAddress(fromAddress, toAddress, amount) {
    return new Promise((resolve, reject) => {
        client.withdraw_from_addresses({ amounts: amount, from_addresses: fromAddress, to_addresses: toAddress }, (error, data) => {
            if (error) {
                return reject(error)
            }
            resolve(data.data)
        })
    })
}

module.exports = {
    getCurrentPrice,
    getNewAddress,
    createWebhookNotification,
    disableWebhookNotification,
    archiveAddress,
    unarchiveAddress,
    getUnarchivedAddresses,
    getArchivedAddresses,
    getAddressBalance,
    withdraw,
    withdrawFromAddress
}