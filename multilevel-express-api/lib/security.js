const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const request = require('request-promise')

const applyJwt = () => {
    return expressJwt({ secret: process.env.JWT_SECRET, isRevoked: checkTokenInBlacklistCallback })
}

const checkTokenInBlacklistCallback = async (req, payload, done) => {
    return done(null, false)
}

async function isRecaptchaValid(recaptcha_token) {
    if (!recaptcha_token) return false

    let resultRecaptcha = await request.post('https://www.google.com/recaptcha/api/siteverify')
            .form({
                secret: '6LfUPqIUAAAAAD_88Si9ZECxIE-PJZgjIuJ4af-x',
                response: recaptcha_token
            })
        resultRecaptcha = JSON.parse(resultRecaptcha)

        return resultRecaptcha.success
}

module.exports = {
    applyJwt,
    isRecaptchaValid
}