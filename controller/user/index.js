const userModel = require('../../model/user');
const { hashPassword } = require('../../auth/bcrypt');

class userController {

    static get_users(req, res) {
        const data = userModel.findAll();

        if (data) {
            res.status(200).json({ status: true, message: 'Data ditemukan!', error: null, data: data });
        }
        else {
            res.status(200).json({ status: true, message: 'Data tidak ditemukan!', error: null, data: null });
        }
    }

    static get_one_user(req, res) {
        const userid = req.params.userid
        const data = userModel.findOne(userid);

        if (data) {
            res.status(200).json({ status: true, message: 'Data ditemukan!', error: null, data: data });
        }
        else {
            res.status(200).json({ status: true, message: 'Data tidak ditemukan!', error: null, data: null });
        }

    }

    static create_user(req, res){
        let {userid, username, fullname, password} = req.body;
        password = hashPassword(password);
        const ressponse = userModel.create_user({userid, username, fullname, password});

        if (ressponse) {
            res.status(200).json({ status: true, message: 'Berhasil membuat user baru!', error: null, data: {userid, username, fullname, password} });
        }
        else {
            res.status(200).json({ status: true, message: 'Gagal membuat user!', error: null, data: null });
        }

    }

    static update_user(req, res){
        const userid = req.params.userid
        let {username, fullname, password} = req.body;
        password = hashPassword(password);
        const ressponse = userModel.update_user(userid, {username, fullname, password});

        if (ressponse) {
            res.status(200).json({ status: true, message: 'Berhasil merubah data user!', error: null, data: {userid, username, fullname, password} });
        }
        else {
            res.status(200).json({ status: true, message: 'Gagal merubah data user!', error: null, data: null });
        }

    }

}

module.exports = userController;