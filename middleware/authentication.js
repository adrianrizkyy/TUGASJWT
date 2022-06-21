const userModel = require('../model/user');
const { verifyToken } = require('../auth/jwt');

class Authentication {
    static verifyToken(req, res, next) {
        const token = req.headers.token;
        
        let result = false;
        if (token) {
            const userDecoded = verifyToken(token);
            const response = userModel.findOne(userDecoded.userid);
            
            if (response) {
                result = true;
            }
        }

        if (result) {
            next();
        }
        else {
            res.status(400).json({ status: false, message: 'Token tidak valid!' });
        }
    }
}

module.exports = Authentication;