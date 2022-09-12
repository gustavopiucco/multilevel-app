require('dotenv').config()
const CronJobService = require('./services/cronjobs')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const responseTime = require('response-time')
const rateLimit = require('express-rate-limit')
const speedLimit = require('express-slow-down')
const apiRouter = require('./apiRouter')
const app = express()
const database = require('./lib/database')
const utils = require('./lib/utils')
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, //5 minutes
    max: 150
})
const speedLimiter = speedLimit({
    windowMs: 30000,
    delayAfter: 20,
    delayMs: 3500
})

async function main() {
    new CronJobService()

    await database.testConnection()

    app.enable('trust proxy') //behind Nginx reverse proxy
    //app.use(limiter)
    //app.use(speedLimiter)
    app.use(morgan('dev'))
    app.use(helmet())
    // app.use(async (req, res, next) => {
    //         await utils.sleep(250)
    //     next()
    // })
    app.all('*', (req, res, next) => {
        /* TODO: Check CORS correct security implementation. Note the OPTIONS response
        To make a long story short, the browser might first send a pre-flight
        request with method OPTIONS to get allowed origins, headers and methods. 
        So for this request you should return nothing but the Access-Control-* headers. 
        If the pre-flight went fine, the browser will continue with the original request. 
        More info: https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
        */
        if (process.env.NODE_ENV != 'development') {
            res.header('Access-Control-Allow-Origin', "*")
        }
        else {
            res.header('Access-Control-Allow-Origin', "*")
        }
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        //res.header('Access-Control-Allow-Credentials', 'true') //wtf
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Key, Authorization')

        if (req.method === 'OPTIONS') {
            return res.status(200).end()
        }

        next()
    })
    app.use(responseTime())
    app.use(bodyParser.json())
    app.use('/api', apiRouter)
    app.use((req, res, next) => {
        res.status(404).json({ error: 'Not found' })
    })
    app.use((err, req, res, next) => {
        if (err && err.name === 'UnauthorizedError') {
            res.status(401).json({ error: `${err.name}: ${err.message}` })
        }
        else {
            res.status(500).json({ error: `${err.name}: ${err.message}` })
        }
    })

    const PORT = process.env.PORT || 8080; //App engine must run on port 8080
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })

    process.on('unhandledRejection', error => {
        console.error('Uncaught Promise Error:', error)
    })
}

main().catch(console.error)