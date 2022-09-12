const security = require('../lib/security')
const WithdrawService = require('../services/withdraw')

class withdrawRoute {
    constructor(router) {
        this.router = router
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/withdraw', security.applyJwt(), this.withdraw.bind(this))
    }

    async withdraw(req, res, next) {
        try {
            const withdrawlService = new WithdrawService()
            const result = await withdrawlService.withdraw(req.user.sub, req.body.type, req.body.amount, req.body.token)
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

module.exports = withdrawRoute