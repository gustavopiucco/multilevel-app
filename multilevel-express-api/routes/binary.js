const security = require('../lib/security')
const BinaryService = require('../services/binary')

class Binaryroute {
    constructor(router) {
        this.router = router
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.get('/binary', security.applyJwt(), this.getBinary.bind(this))
        this.router.get('/binary/:username', security.applyJwt(), this.getUsernameBinary.bind(this))
    }

    async getBinary(req, res, next) {
        try {
            const binaryService = new BinaryService()
            const result = await binaryService.getBinaryNetwork(req.user.sub)
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

    async getUsernameBinary(req, res, next) {
        try {
            const binaryService = new BinaryService()
            const result = await binaryService.getUsernameBinaryNetwork(req.user.sub, req.params.username)
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

module.exports = Binaryroute