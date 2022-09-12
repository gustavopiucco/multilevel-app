const security = require('../lib/security');
const UsersService = require('../services/users');

class UsersRoute {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post('/users', this.createUser.bind(this))
        this.router.get('/user', security.applyJwt(), this.getUser.bind(this))
        this.router.get('/users_fullname/:invite_hash', this.getUserFullname.bind(this))
        this.router.get('/user/binaryside', security.applyJwt(), this.getUserBinarySide.bind(this))
        this.router.put('/user/binaryside', security.applyJwt(), this.updateUserBinarySide.bind(this))
        this.router.put('/user/btcaddress', security.applyJwt(), this.updateUserBtcAddress.bind(this))
        this.router.put('/user/password', security.applyJwt(), this.updateUserPassword.bind(this))
        this.router.put('/user/pin', security.applyJwt(), this.updateUserPin.bind(this))
        this.router.put('/user/name', security.applyJwt(), this.changeUserName.bind(this))
        this.router.put('/user/email', security.applyJwt(), this.changeUserEmail.bind(this))
        this.router.get('/user/balance', security.applyJwt(), this.getUserBalance.bind(this))
        this.router.post('/user/document', security.applyJwt(), this.uploadUserDocument.bind(this))
    }

    async createUser(req, res, next) {
        if (!await security.isRecaptchaValid(req.body.recaptcha_token)) return res.status(400).json({ error: 'Invalid request.' })
        
        try {
            const usersService = new UsersService()
            const result = await usersService.createUser(req.body)

            if (result.error)
                res.status(result.errorCode).json({ error: result.error })
            else
                res.status(201).json();
        }
        catch (err) {
            console.error(err.stack);
            res.status(500).end();
        }
    }

    async updateUserBinarySide(req, res, next) {
        try {
            const usersService = new UsersService()
            const result = await usersService.updateUserBinarySide(req.user.sub, req.body.binarySide)

            if (result.error)
                res.status(result.errorCode).json({ error: result.error })
            else
                res.end()
        }
        catch (err) {
            console.error(err.stack)
            res.status(500).end()
        }
    }

    async updateUserBtcAddress(req, res, next) {
        try {
            const usersService = new UsersService()
            const result = await usersService.updateUserBtcAddress(req.user.sub, req.body.btcAddress, req.body.pin)

            if (result.error)
                res.status(result.errorCode).json({ error: result.error })
            else
                res.end()
        }
        catch (err) {
            console.error(err.stack)
            res.status(500).end()
        }
    }

    async updateUserPassword(req, res, next) {
        try {
            const usersService = new UsersService()
            const result = await usersService.updateUserPassword(req.user.sub, req.body.newPassword, req.body.confirmNewPassword)

            if (result.error)
                res.status(result.errorCode).json({ error: result.error })
            else
                res.end()
        }
        catch (err) {
            console.error(err.stack);
            res.status(500).end();
        }
    }

    async updateUserPin(req, res, next) {
        try {
            const usersService = new UsersService()
            const result = await usersService.updateUserPin(req.user.sub, req.body.pin, req.body.newPin, req.body.confirmNewPin)

            if (result.error)
                res.status(result.errorCode).json({ error: result.error })
            else
                res.end()
        }
        catch (err) {
            console.error(err.stack);
            res.status(500).end();
        }
    }

    async getUserBinarySide(req, res, next) {
        try {
            const usersService = new UsersService()
            const result = await usersService.getUserBinarySide(req.user.sub)
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

    async getUserFullname(req, res, next) {
        try {
            const usersService = new UsersService()
            const result = await usersService.getUserFullname(req.params.invite_hash)
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

    async getUser(req, res, next) {
        try {
            const usersService = new UsersService()
            const result = await usersService.getUser(req.user.sub)
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

    async changeUserName(req, res, next) {
        try {
            const usersService = new UsersService()
            const result = await usersService.changeUserName(req.user.sub, req.body.newName)
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

    async changeUserEmail(req, res, next) {
        try {
            const usersService = new UsersService()
            const result = await usersService.changeUserEmail(req.user.sub, req.body.newEmail, req.body.confirmNewEmail, req.body.pin)
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

    async getUserBalance(req, res, next) {
        try {
            const usersService = new UsersService()
            const result = await usersService.getUserBalance(req.user.sub)
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

    async uploadUserDocument(req, res, next) {
        try {
            const usersService = new UsersService()
            const result = await usersService.uploadUserDocument(req.user.sub)
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

module.exports = UsersRoute