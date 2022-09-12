const request = require('request-promise')

async function usdToBtc(value) {
    const url = `https://blockchain.info/tobtc?currency=USD&value=${value}`
    const result = await request.get(url)
    return result
}

module.exports = {
    usdToBtc
}