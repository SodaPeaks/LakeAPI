const { assert } = require('chai');
const Lake = require('../../lib/models/Lake');
const { getErrors } = require('./helpers');

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
            surfaceElevation: '2,000 mi',
            tsi: 'Oliotrophic',
            avgTemp: '68',
            notes: '',
            bestSeason: ''
        };

        const lake = new Lake(input);

        input._id = lake._id;
        assert.deepEqual(lake.toJSON(), input);
        assert.isUndefined(lake.validateSync());
    });

    it('if required field is empty throws error', () => {
        const lake = new Lake({});
        const errors = getErrors(lake.validateSync(), 13);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.state.kind, 'required');
    });

});