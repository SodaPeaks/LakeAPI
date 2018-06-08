const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('../util/mongoose-helpers');

const schema = new Schema ({
    name: RequiredString,
    state: RequiredString,
    country: RequiredString,
    type: {
        ...RequiredString,
        enum: ['Natural Lake', 'Manmade Lake', 'Endorheic', 'Reservoir']
    },
    coordinates: RequiredString,
    maxLength: RequiredString,
    maxWidth: RequiredString,
    surfaceArea: RequiredString,
    maxDepth: RequiredString,
    avgDepth: RequiredString,
    surfaceElevation: RequiredString
});

schema.statics = {

    findByQuery(query) {
        return this.find(query)
            .lean()
            .select();
    }

};

module.exports = mongoose.model('Lake', schema); 