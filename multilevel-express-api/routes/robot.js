const security = require('../lib/security')
const RobotService = require('../services/robot')
const cache = require('memory-cache')

class RobotRoute {
    constructor(router) {
        this.router = router
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.get('/robot', security.applyJwt(), this.getRobot.bind(this))
    }

    async getRobot(req, res, next) {
        try {
            const robotService = new RobotService()
            const result = await robotService.getRobotData(cache)
            if (result.error)
                res.status(result.errorCode).json({ error: result.error })
            else
                res.json(result)
        }
        catch (err) {
            console.error(err.stack)
            res.status(500).end()
        }
    }
}

module.exports = RobotRoute