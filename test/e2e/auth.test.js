const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('auth api', () => {

    beforeEach(() => dropCollection('users'));

    let token = null;

    beforeEach(() => {
        return request
            .post('/auth/signup')
            .send({
                password: 'galluzzo1',
                role: 'admin',
                name: 'galluzzo'
            })
            .then(({ body }) => {
                console.log('BODY', body);
                token = body.token;
            });
    });

    it('Signup', () => {
        assert.ok(token);
    });
});