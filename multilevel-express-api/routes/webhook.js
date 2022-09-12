const security = require('../lib/security');
const WebHookService = require('../services/webhook');

class WebHookRoute {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post('/webhook', this.webhook.bind(this))
    }

    async webhook(req, res, next) {
        try {
            const webHookService = new WebHookService()
            await webHookService.handleBlockIoNotification(req.body)
            res.status(200).end()
        }
        catch (err) {
            console.error(err)
            res.status(500).end();
        }
    }
}

module.exports = WebHookRoute