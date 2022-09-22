const modelUsers = require("../models/user.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const [user] = await modelUsers.findByEmail(email)

        const passwordMatches = await bcrypt.compare(password, user.password)
        if (!passwordMatches) {
            const errorRes = new Error("You entered the wrong email / password!")
            errorRes.status = 403
            return next(errorRes)
        } else {
            const secretKey = process.env.SECRET_KEY
            const payload = {
                email: user.email,
                username: user.username,
                id: user.id
            }
            // console.log(payload)
            const tokenExpiration = {
                expiresIn: 60 * 60 * 72
            }
            const token = jwt.sign(payload, secretKey, tokenExpiration)
            user.token = token
            res.json({
                status: 200,
                result: [user, token],
                message: "login succeeded"
            })
        }
    } catch (error) {
        const errorRes = new Error("Internal Server Error")
        errorRes.status = 500
        console.log(error)
        next(errorRes)
    }
}

const register = async (req, res, next) => {
    try {
        const { email, password, username } = req.body
        const emailavailablitiy = await modelUsers.findByEmail(email)

        if (emailavailablitiy.length > 0) {
            const errorRes = new Error("Email already exist!")
            errorRes.status = 403
            next(errorRes)
        } else {
            const passwordHashed = await bcrypt.hash(password, 10)
            const data = {
                username,
                email,
                password: passwordHashed
            }
            const accountCreated = await modelUsers.register(data)
            res.json({
                status: 201,
                result: accountCreated,
                message: "A new account has been successfully made"
            })
        }
    } catch (error) {
        const errorRes = new Error("Internal Server Error")
        errorRes.status = 500
        console.log(error)
        next(errorRes)
    }
}


module.exports = {
    login,
    register
}