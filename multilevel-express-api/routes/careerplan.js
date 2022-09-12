const security = require('../lib/security');
const CareerPlanService = require('../services/careerplan');

class CareerPlanRoute {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        //this.router.post('/careerplan', security.applyJwt(), this.requestCareerPlan.bind(this))
    }

    async requestCareerPlan(req, res, next) {
        try {
            const careerPlanService = new CareerPlanService()
            const result = await careerPlanService.requestCareerPlan(req.user.sub, req.body.code)
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

module.exports = CareerPlanRoute