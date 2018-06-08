const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');
const { verify } = require('../../lib/util/token-service');

describe('Lake API', () => {

    before(() => dropCollection('lakes'));

    const checkOk = res => {
        if(!res.ok) throw res.error;
        return res;
    };

    let lake1 = {
        name: 'Lake1',
        state: 'Oregon',
        country: 'United States',
        type: 'Natural Lake',
        coordinates: '43 51',
        maxLength: '15 mi',
        maxWidth: '7 mi',
        surfaceArea: '2,000 square mi',
        maxDepth: '11 ft',
        avgDepth: '7 ft',
        surfaceElevation: '2,000 mi'
    };

    let lake2 = {
        name: 'Lake2',
        state: 'Oregon',
        country: 'United States',
        type: 'Natural Lake',
        coordinates: '43 51',
        maxLength: '21 mi',
        maxWidth: '10 mi',
        surfaceArea: '3,000 square mi',
        maxDepth: '11 ft',
        avgDepth: '7 ft',
        surfaceElevation: '3,000 mi'
    };

    it('saves a song', () => {
        return request.post('/lakes')
            // .set('Authorization', user1.token)
            .send(lake1)
            .then(checkOk)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.equal(body.name, lake1.name);
                lake1 = body;
            });
    });

    it('saves a second song', () => {
        return request.post('/lakes')
        // .set('Authorization', user1.token)
            .send(lake2)
            .then(checkOk)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.equal(body.name, lake2.name);
                lake2 = body;
            });
    });

    it('gets all lakes', () => {
        return request.get('/lakes')
            .then(({ body }) => {
                assert.deepEqual(body, [lake1, lake2]);
            });
    });

});