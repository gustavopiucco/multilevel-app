const security = require('../lib/security');
const InvoicesService = require('../services/invoices');

class InvoicesRoute {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post('/invoices', security.applyJwt(), this.createInvoice.bind(this))
        this.router.post('/invoices/upgrade', security.applyJwt(), this.createInvoiceUpgrade.bind(this))
        this.router.get('/user_invoices', security.applyJwt(), this.getUserInvoices.bind(this))
        this.router.put('/user_invoices', security.applyJwt(), this.cancelUserInvoice.bind(this))
    }

    async createInvoice(req, res, next) {
        try {
            const invoicesService = new InvoicesService()
            const result = await invoicesService.createInvoice(req.user.sub, req.body.planId)
            if (result.error)
                res.status(result.errorCode).json({ error: result.error })
            else
                res.json(result);
        }
        catch (err) {
            console.error(err)
            res.status(500).end();
        }
    }

    async createInvoiceUpgrade(req, res, next) {
        try {
            const invoicesService = new InvoicesService()
            const result = await invoicesService.createInvoiceUpgrade(req.user.sub, req.body.planId)
            if (result.error)
                res.status(result.errorCode).json({ error: result.error })
            else
                res.json(result);
        }
        catch (err) {
            console.error(err)
            res.status(500).end();
        }
    }

    async getUserInvoices(req, res, next) {
        try {
            const invoicesService = new InvoicesService()
            const result = await invoicesService.getUserInvoices(req.user.sub)
            if (result.error)
                res.status(result.errorCode).json({ error: result.error })
            else
                res.json(result)
        }
        catch (err) {
            console.error(err)
            res.status(500).end()
        }
    }

    async cancelUserInvoice(req, res, next) {
        try {
            const invoicesService = new InvoicesService()
            const result = await invoicesService.cancelUserInvoice(req.user.sub)
            if (result.error)
                res.status(result.errorCode).end()
            else
                res.status(200).end()
        }
        catch (err) {
            console.error(err)
            res.status(500).end()
        }
    }
}

module.exports = InvoicesRoute