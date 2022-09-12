const security = require('../lib/security')
const PaymentService = require('../services/payment')

class PaymentRoute {
    constructor(router) {
        this.router = router
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/payment', security.applyJwt(), this.payment.bind(this))
    }

    async payment(req, res, next) {
        try {
            const paymentService = new PaymentService()
            const result = await paymentService.payment(req.user.sub, req.body.type, req.body.invoiceId, req.body.invoicePrice, req.body.token)
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

module.exports = PaymentRoute