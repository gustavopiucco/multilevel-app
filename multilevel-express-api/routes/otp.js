const security = require('../lib/security')
const OTPService = require('../services/otp')

class OTPRoute {
    constructor(router) {
        this.router = router
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/otp/start', security.applyJwt(), this.startOTP.bind(this))
        this.router.post('/otp/verify', security.applyJwt(), this.verifyToken.bind(this))
    }

    async startOTP(req, res, next) {
        try {
            const otpService = new OTPService()
            const result = await otpService.startOTP(req.user.sub)

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

    async verifyToken(req, res, next) {
        try {
            const otpService = new OTPService()
            const result = await otpService.verifyToken(req.user.sub, req.body.token)

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

module.exports = OTPRoute