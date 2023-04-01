const jwt = require('jsonwebtoken')
require("dotenv").config();
const {Customer} = require('../database/models')
const { StatusCodes } = require('http-status-codes');
const jwtSecret = process.env.SECRET_KEY

const createUserAuth = async({payload}, res) => {
     //the maxAge of the token
     const maxAge = 3 * 60 * 60;
     const token = jwt.sign({payload},jwtSecret,{ expiresIn: maxAge})
     res.cookie('accessToken', token,{
         httpOnly: true,
         secure: true,
         sameSite: 'strict',
         maxAge: maxAge * 1000, // 3hrs in ms
     })
}

const userLoginAuth = async(req, res, next) => {
    //the maxAge of the token
    const maxAge = 3 * 60 * 60;
    const token = jwt.sign({ payload },jwtSecret,{ expiresIn: maxAge})
    res.cookie('accessToken', token,{
        httpOnly: true,
        maxAge: maxAge * 1000, // 3hrs in ms
    })
}


const verifyToken = async (req, res, next) => {
    const customer = await Customer.findById(req.params.id)
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
    jwt.verify(token, jwtSecret, (err, payload) => {
        if (err) {
            return res.status(401).json({ message: "Not authorized, invalid token provided" })
        }
        next() 
    })
}


const logout = async(req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000)
    })
    res.status(StatusCodes.OK).json({ msg: 'user logged out'})
}

module.exports = {createUserAuth,userLoginAuth, verifyToken}



