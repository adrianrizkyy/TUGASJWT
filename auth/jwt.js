const jwt = require("jsonwebtoken");
const SECRET_KEY = "inirahasia";

const generateToken = function(payload){
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 60 * 5 });
    console.log('Token');
    return token;
};

const verifyToken = function(token){
    const decoded = jwt.verify(token, SECRET_KEY, function(err, decoded){
        if(err){
            return err;
        }
        else{
            return decoded;
        }
    });

    return decoded;
}

module.exports = {generateToken, verifyToken};