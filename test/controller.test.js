const request = require('supertest');
const app = require("../index");
let token = "";
let userid = 1;

describe('POST /login/do_login', function () {
    test('Berhasil Login', (done) => {
        request(app)
            .post('/login/do_login')
            .send({
                username: 'admin',
                password: 'admin'
            })
            .expect(200)
            .then((res) => {
                expect(res.body.status).toBeTruthy();
                token = res.body.token;
                done();
            })
            .catch(err => {
                done(err)
            });
    });

    test('Gagal Login, username atau password salah!', (done) => {
        request(app)
            .post('/login/do_login')
            .send({
                username: 'admin',
                password: 'admin1'
            })
            .expect(200)
            .then((res) => {
                expect(res.body.status).toBeFalsy();
                done();
            })
            .catch(err => {
                done(err)
            });
    });
});

describe('GET /user', function () {
    test('GET /user/get_users with Token', (done) => {
        request(app)
            .get('/user/get_users')
            .set({
                token: token
            })
            .expect(200)
            .then((res) => {
                expect(res.body.status).toBeTruthy();
                userid = res.body.data.length + 1;
                done();
            })
            .catch(err => {
                done(err)
            });
    });

    test('GET /user/get_users without Token', (done) => {
        request(app)
            .get('/user/get_users')
            .expect(400)
            .then((res) => {
                expect(res.body.status).toBeFalsy();
                done();
            })
            .catch(err => {
                done(err)
            });
    });

    test('GET /user/get_one_user with id', (done) => {
        request(app)
            .get('/user/get_one_user/1')
            .set({
                token: token
            })
            .expect(200)
            .then((res) => {
                expect(res.body.status).toBeTruthy();
                done();
            })
            .catch(err => {
                done(err)
            });
    });

    test('GET /user/get_one_user without id', (done) => {
        request(app)
            .get('/user/get_one_user')
            .set({
                token: token
            })
            .expect(404)
            .then((res) => {
                done();
            })
            .catch(err => {
                done(err)
            });
    });

    test('GET /user/get_one_user with false id', (done) => {
        request(app)
            .get('/user/get_one_user/asd')
            .set({
                token: token
            })
            .expect(200)
            .then((res) => {
                expect(res.body.status).toBeFalsy();
                done();
            })
            .catch(err => {
                done(err)
            });
    });

    test('POST /user/create_user', (done) => {
        request(app)
            .post('/user/create_user')
            .set({
                token: token
            })
            .send({
                userid : userid, 
                username : 'test', 
                fullname : 'Jest test', 
                password : 'test'
            })
            .expect(200)
            .then((res) => {
                expect(res.body.status).toBeTruthy();
                done();
            })
            .catch(err => {
                done(err)
            });
    });

});