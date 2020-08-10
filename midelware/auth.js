//main auth midelware

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports =  (req,res,next) => {
//Get the token from the Header 
const token = req.header('x-auth-token');

//Check if not token 

if (!token) {
    return res.status(401).json({msg:'No token, Authentication denied'})
}

try{
const decoded = jwt.verify(token, config.get('jwt'));

req.user = decoded.user;

next()


} catch(err) {

    res.status(401).json({msg: 'token is not Valid'})



}
}