const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const { verify } = require('../../lib/util/token-service');

describe.skip('user e2e', () => {

    const checkOk = res => {
        if(!res.ok) throw res.error;
        return res;
    };

    before(() => dropCollection('users'));
    before(() => dropCollection('lakes'));

    let user1 = {
        password: 'galluzzo1',
        role: 'admin',
        name: 'galluzzo'
    };

    let user2 = {
        password: 'walston1',
        role: 'admin',
        name: 'walston'
    };

    before(() => {
        return request
            .post('/auth/signup')
            .send(user1)
            .then(({ body }) => {
                user1._id = verify(body.token).id;
                user1.token = body.token;
            });
    });

    before(() => {
        return request
            .post('/auth/signup')
            .send(user2)
            .then(({ body }) => {
                user2._id = verify(body.token).id;
                user2.token = body.token;
            });
    });

    it('GET - a user by ID', () => {
        return request.get(`/users/${user1._id}`)
            .then(({ body }) => {
                assert.equal(body.name, 'galluzzo');
            });
    });

});