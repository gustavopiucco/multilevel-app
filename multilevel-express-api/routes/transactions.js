const security = require('../lib/security')
const TransactionsService = require('../services/transactions')

class TransactionsRoute {
    constructor(router) {
        this.router = router
        this.registerRoutes()
    }

    registerRoutes() {
        this.router.get('/transactions/unilevel', security.applyJwt(), this.getUnilevelTransactions.bind(this))
        this.router.get('/transactions/binary', security.applyJwt(), this.getBinaryTransactions.bind(this))
        this.router.get('/transactions/robot', security.applyJwt(), this.getRobotTransactions.bind(this))
        this.router.get('/transactions/residual', security.applyJwt(), this.getResidualTransactions.bind(this))
        this.router.get('/transactions/careerplan', security.applyJwt(), this.getCareerPlanTransactions.bind(this))
        this.router.get('/transactions/withdraw', security.applyJwt(), this.getWithdrawTransactions.bind(this))
    }

    async getUnilevelTransactions(req, res, next) {
        try {
            const transactionsService = new TransactionsService()
            const result = await transactionsService.getUnilevelTransactions(req.user.sub)

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

    async getBinaryTransactions(req, res, next) {
        try {
            const transactionsService = new TransactionsService()
            const result = await transactionsService.getBinaryTransactions(req.user.sub)

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

    async getRobotTransactions(req, res, next) {
        try {
            const transactionsService = new TransactionsService()
            const result = await transactionsService.getRobotTransactions(req.user.sub)

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

    async getResidualTransactions(req, res, next) {
        try {
            const transactionsService = new TransactionsService()
            const result = await transactionsService.getResidualTransactions(req.user.sub)

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

    async getCareerPlanTransactions(req, res, next) {
        try {
            const transactionsService = new TransactionsService()
            const result = await transactionsService.getCareerPlanTransactions(req.user.sub)

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

    async getWithdrawTransactions(req, res, next) {
        try {
            const transactionsService = new TransactionsService()
            const result = await transactionsService.getWithdrawTransactions(req.user.sub)

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

module.exports = TransactionsRoute