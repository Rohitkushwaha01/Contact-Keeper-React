const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next)=>{

    // Get token from header 
    const token = req.header("x-auth-token");

    // Check if not token
    if(!token){
        return res.status(401).json({msg: "No token Authorization denied"});
    }

    // Verify token
    try{
        const decode = jwt.verify(token, config.get('jwtToken'));
        req.user = decode.user;
        next();
    }catch(err){
        res.status(401).json({msg: "Token in not Valid"});
    }
}