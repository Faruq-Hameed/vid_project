const jwt = require('jsonwebtoken')
require("dotenv").config();
const jwtSecret = process.env.SECRET_KEY

const userRegisterAuth = async(req, res, next) => {
     //the maxAge of the token
     const maxAge = 3 * 60 * 60;
     const token = jwt.sign({ id: user._id, username, role: user.role },jwtSecret,{ expiresIn: maxAge})
     res.cookie('jwt', token,{
         httpOnly: true,
         maxAge: maxAge * 1000, // 3hrs in ms
     })
}

const userLoginAuth = async(req, res, next) => {
    //the maxAge of the token
    const maxAge = 3 * 60 * 60;
    const token = jwt.sign({ id: user._id, username, role: user.role },jwtSecret,{ expiresIn: maxAge})
    res.cookie('jwt', token,{
        httpOnly: true,
        maxAge: maxAge * 1000, // 3hrs in ms
    })
}




