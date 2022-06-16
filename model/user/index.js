const fs = require('fs');

class UserModel {
    static findAll(cb) {
        let data = fs.readFileSync('./users.json', 'utf-8')
        data = JSON.parse(data);
        
        return data
    }

    static findOne(userid) {
        let result = false;
        let data = this.findAll();
        for (let i = 0; i < data.length; i++) {
            if (data[i].userid == userid) {
                result = data[i]
                break;
            }
        }

        return result;
    }

    static findByName(username) {
        let result = false;
        let data = this.findAll();
        for (let i = 0; i < data.length; i++) {
            if (data[i].username == username) {
                result = data[i]
                break;
            }
        }

        return result;
    }

    static create_user(payload){
        const data = this.findAll();

        payload = {
            userid: payload.userid,
            username: payload.username,
            fullname: payload.fullname,
            password: payload.password,
        };

        data.push(payload);
        
        fs.writeFileSync("./users.json", JSON.stringify(data, null, 2));

        return true;
    }

    static update_user(userid, payload){
        const user = this.findAll();
        let result = false;

        payload = {
            userid: userid,
            username: payload.username,
            fullname: payload.fullname,
            password: payload.password,
        };

        let new_user = [];

        if(user.length > 0) {
            for (let i = 0; i < user.length; i++) {
                if(user[i].userid != userid){
                    new_user.push(user[i])
                }
                else{
                    result = true;
                    new_user.push(payload);
                }
            }
        }
        
        fs.writeFileSync("./users.json", JSON.stringify(new_user, null, 2));

        return result;
    }
}

module.exports = UserModel;