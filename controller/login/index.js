const userModel = require('../../model/user');
const { comparePassword } = require('../../auth/bcrypt');
const { generateToken } = require('../../auth/jwt');

class loginController {

    static do_login(req, res) {
        const { username, password } = req.body;
        const user = userModel.findByName(username);

        if (user) {
            const response = comparePassword(password, user.password);
            if (response) {
                const token = generateToken(user);
                res.status(200).json({ status: true, message: 'Berhasil Login!', error: null, token: token });
            }
            else {
                res.status(200).json({ status: false, message: 'Username atau Password Salah!', error: null, token: null });
            }

        }
        else {
            res.status(400).json({ status: false, message: 'Username Tidak Terdaftar!', error: null, token: null });
        }

    }

}

module.exports = loginController;