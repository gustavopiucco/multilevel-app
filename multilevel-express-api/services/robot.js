const database = require('../lib/database')
const validator = require('validator')
const request = require('request-promise')
const CycleService = require('../services/cycle')

class RobotService {
    constructor() { }

    getPlanIdPrice(planId) {
        switch (planId) {
            case 1:
                return 100.00
            case 2:
                return 500.00
            case 3:
                return 1000.00
            case 4:
                return 2500.00
            case 5:
                return 5000.00
            case 6:
                return 12500.00
            case 7:
                return 25000.00
            case 8:
                return 50000.00
            default:
                return 0
        }
    }

    getRandomTransactionId() {
        let transactionId = ''
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

        for (let i = 0; i < 20; i++)
            transactionId += possible.charAt(Math.floor(Math.random() * possible.length))

        return transactionId
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async getCryptoData() {
        let data = []
        let priceDataResult = await request.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,LTC,DASH,ADA&tsyms=USD')
        priceDataResult = JSON.parse(priceDataResult)
        
        console.log(priceDataResult)
    }

    async getRobotData(cache) {
        let data = []
        let priceData = cache.get('priceData')

        if (!priceData) {
            let priceDataResult = await request.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,XRP,ADA,DASH&tsyms=USD')
            priceDataResult = JSON.parse(priceDataResult)
            priceData = [
                priceDataResult.BTC.USD,
                priceDataResult.ETH.USD,
                priceDataResult.LTC.USD,
                priceDataResult.XRP.USD,
                priceDataResult.ADA.USD,
                priceDataResult.DASH.USD
            ]
            cache.put('priceData', priceData, 60000)
        }

        for (let i = 0; i < 30; i++) {
            let transaction = {}

            const rand = this.getRandomInt(0, 5)
            const rand2 = this.getRandomArbitrary(-2, 2)

            transaction.id = this.getRandomTransactionId()
            transaction.currency = rand
            transaction.price = priceData[rand]
            transaction.result = rand2.toFixed(2)

            data.push(transaction)
        }

        return { error: null, data: data }
    }

    async getResidualUsers(userId, planId) {
        let upToLevel = planId

        const result = await database.query(`
        WITH RECURSIVE descendants AS (
            SELECT id, parent_id, 0 depth
            FROM users
            WHERE id = $1
        UNION
            SELECT p.id, p.parent_id, d.depth + 1
            FROM users p
            INNER JOIN descendants d
            ON p.parent_id = d.id
        )
        SELECT p.username, p.plan_id, role, depth AS level, p.created_at AS date
        FROM descendants d
        INNER JOIN users p
        ON d.id = p.id
        WHERE p.id <> $1
        AND plan_id IS NOT NULL
        AND role = 'user'
        AND depth BETWEEN 1 AND $2
        `, [userId, upToLevel])

        return result.rows
    }
}

module.exports = RobotService