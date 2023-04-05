const jwt = require('jsonwebtoken')
require("dotenv").config();
const {Customer} = require('../database/models')
const { StatusCodes } = require('http-status-codes');
const jwtSecret = process.env.SECRET_KEY

const createUserAuth = async (payload, res) => {
    //the maxAge of the token
    const maxAge = 3 * 60 * 60;
    const token = jwt.sign({ payload }, jwtSecret, { expiresIn: maxAge })
    res.cookie('accessToken', token, {
        httpOnly: true,
        maxAge: maxAge * 1000, // 3hrs in ms
    })
}

const verifyToken = async (req, res, next) => {
    const customer = await Customer.findById(req.params.userId)
    if (!customer) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'customer not found' })
        return
    }
    // if customer is found, we check for the authentication token
    let token = req.cookies.accessToken 
    if (!token) {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }

    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: "Not authorized, invalid token provided" })
        }
        req.payload = decodedToken.payload //passing the decoded token payload incase it is needed s
        next() 
    })
}

const removeToken = async( res) => {
    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000)
    })
}

module.exports = {createUserAuth, verifyToken, removeToken}
