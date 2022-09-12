const security = require('../lib/security')
const AdminService = require('../services/admin')
const BinaryService = require('../services/binary')
const RobotService = require('../services/robot')
const WithdrawService = require('../services/withdraw')

class PlansRoute {
    constructor(router) {
        this.router = router
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.put('/admin/activateuser', security.applyJwt(), this.activateUser.bind(this))
        this.router.put('/admin/activateleader', security.applyJwt(), this.activateLeader.bind(this))
        this.router.put('/admin/changeleaderplan', security.applyJwt(), this.changeLeaderPlan.bind(this))
        this.router.put('/admin/changeuser', security.applyJwt(), this.changeUser.bind(this))
        this.router.put('/admin/resetotp', security.applyJwt(), this.resetOTP.bind(this))
        this.router.get('/admin/searchuser', security.applyJwt(), this.searchUser.bind(this))
        this.router.get('/admin/teamprofit', security.applyJwt(), this.getTeamProfit.bind(this))
    }

    async test(req, res, next) {
        let data = {
            reqIp: req.ip,
            appEngineHeaderIp: req.headers['x-appengine-user-ip'],
            headers: req.headers
        }

        res.json(data)
    }

    async activateUser(req, res, next) {
        try {
            const adminService = new AdminService()
            const result = await adminService.activateUser(req.user.sub, req.user.role, req.body.address, req.body.amount)
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

    async activateLeader(req, res, next) {
        try {
            const adminService = new AdminService()
            const result = await adminService.activateLeader(req.user.sub, req.user.role, req.body.leaderUsername, req.body.leaderPlanId)
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

    async changeLeaderPlan(req, res, next) {
        try {
            const adminService = new AdminService()
            const result = await adminService.changeLeaderPlan(req.user.sub, req.user.role, req.body.leaderUsername, req.body.leaderPlanId)
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

    async changeUser(req, res, next) {
        try {
            const adminService = new AdminService()
            const result = await adminService.changeUser(req.user.sub, req.user.role, req.body.username, req.body.newUsername, req.body.newEmail, req.body.newName)
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

    async resetOTP(req, res, next) {
        try {
            const adminService = new AdminService()
            const result = await adminService.resetOTP(req.user.sub, req.user.role, req.body.username)
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

    async searchUser(req, res, next) {
        try {
            const adminService = new AdminService()
            const result = await adminService.searchUser(req.user.sub, req.user.role, req.query.email)
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

    async getTeamProfit(req, res, next) {
        try {
            const adminService = new AdminService()
            const result = await adminService.getTeamProfit(req.user.sub, req.user.role, req.query.fromDate, req.query.toDate)
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

module.exports = PlansRoute