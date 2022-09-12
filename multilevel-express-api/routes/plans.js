const security = require('../lib/security');
const PlansService = require('../services/plans');

class PlansRoute {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/plans/:id', security.applyJwt(), this.getPlan.bind(this))
    }

    async getPlan(req, res, next) {
        try {
            const plansService = new PlansService()
            const result = await plansService.getPlan(req.params.id)
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

module.exports = PlansRoute