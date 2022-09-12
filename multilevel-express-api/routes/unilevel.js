const security = require('../lib/security')
const UnilevelService = require('../services/unilevel')

class UnilevelRoute {
    constructor(router) {
        this.router = router
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.get('/unilevel/:level', security.applyJwt(), this.getUnilevel.bind(this))
    }

    async getUnilevel(req, res, next) {
        try {
            const unilevelService = new UnilevelService()
            const result = await unilevelService.getUnilevelNetwork(req.user.sub, req.params.level)
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

module.exports = UnilevelRoute