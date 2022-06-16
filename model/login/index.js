const fs = require('fs');

class LoginModel {
    static findAll(cb) {
        let data = fs.readFileSync('./users.json', 'utf-8')
        data = JSON.parse(data);
        
        return data
    }

    static findOne(username) {
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
}

module.exports = LoginModel;