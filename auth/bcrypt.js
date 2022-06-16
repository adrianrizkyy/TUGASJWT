const bcryptjs = require('bcryptjs');
const { response } = require('express');

const hashPassword = function (password) {
    const saltRounds = 10;
    const salt = bcryptjs.genSaltSync(saltRounds);
    const hash = bcryptjs.hashSync(password, salt);

    return hash;
};


const comparePassword =  (password, hash) => {
    return bcryptjs.compareSync(password, hash);
}

module.exports = { hashPassword, comparePassword };