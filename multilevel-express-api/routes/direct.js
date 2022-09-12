const security = require('../lib/security')
const DirectService = require('../services/direct')

class DirectRoute {
    constructor(router) {
        this.router = router
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.get('/direct', security.applyJwt(), this.getDirect.bind(this))
    }

    async getDirect(req, res, next) {
        try {
            const directService = new DirectService()
            const result = await directService.getDirectNetwork(req.user.sub)
            if (result.error)
                res.status(result.errorCode).json({ error: result.error })
            else
                res.json(result);
        }
        catch (err) {
            console.error(err.stack)
            res.status(500).end();
        }
    }
}

module.exports = DirectRoute