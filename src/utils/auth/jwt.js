const jwt = require('jsonwebtoken');

const createJWT = ({ payload }) =>{
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
  })

  return token
}

const maxAge = 3 * 60 * 60;
const token = jwt.sign({payload},jwtSecret,{ expiresIn: maxAge})
res.cookie('jwt', token,{
    httpOnly: true,
    maxAge: maxAge * 1000, // 3hrs in ms
})


const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
    const token = createJWT({ payload: user});
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date (Date.now() + oneDay),
        signed: true
    })
}


module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse

}