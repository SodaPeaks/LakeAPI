const { assert } = require('chai');
const Lake = require('../../lib/models/Lake');
const { getErrors } = require('./helpers');
const { Types } = require('mongoose');

describe('Lake unit test', () => {

    it('model is valid', () => {
        const input = {
            name: 'Lake',
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

        const lake = new Lake(input);

        input._id = lake._id;
        assert.deepEqual(lake.toJSON(), input);
        assert.isUndefined(lake.validateSync());
    });

});