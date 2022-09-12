const security = require('../lib/security')
const AuthService = require('../services/auth')

class AuthRoute {
    constructor(router) {
        this.router = router
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.post('/auth', this.authenticate.bind(this))
        this.router.post('/auth/reset-password', this.resetPassword.bind(this))
    }

    async authenticate(req, res, next) {
        if (!await security.isRecaptchaValid(req.body.recaptcha_token)) return res.status(400).json({ error: 'Invalid request.' })

        try {
            const authService = new AuthService()
            const result = await authService.authenticate(req.body)

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

    async resetPassword(req, res, next) {
        if (!await security.isRecaptchaValid(req.body.recaptcha_token)) return res.status(400).json({ error: 'Invalid request.' })
        
        try {
            const authService = new AuthService()
            const result = await authService.resetPassword(req.body.username, req.body.email)

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

module.exports = AuthRoute