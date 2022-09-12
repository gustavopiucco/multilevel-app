const security = require('../lib/security')
const PinService = require('../services/pin')

class PinRoute {
    constructor(router) {
        this.router = router
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/pin', security.applyJwt(), this.createPin.bind(this))
    }

    async createPin(req, res, next) {
        try {
            const pinService = new PinService()
            const result = await pinService.createPin(req.user.sub)

            if (result.error) {
                res.status(400).json({ error: result.error })
            }
            else {
                res.json(result)
            }
        }
        catch (err) {
            console.error(err.stack)
            res.status(500).end()
        }
    }
}

module.exports = PinRoute