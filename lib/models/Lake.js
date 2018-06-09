const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('../util/mongoose-helpers');

const schema = new Schema ({
    name: RequiredString,
    state: RequiredString,
    country: RequiredString,
    type: RequiredString,
    coordinates: RequiredString,
    maxLength: RequiredString,
    maxWidth: RequiredString,
    surfaceArea: RequiredString,
    maxDepth: RequiredString,
    avgDepth: RequiredString,
    surfaceElevation: RequiredString,
    tsi: RequiredString,
    avgTemp: RequiredString,
    notes: String,
    bestSeason: String
});

schema.statics = {

    getDetailById(id) {
        return this.findById(id)
            .lean()
            .select()
            .then((lake) => {
                if(!lake) return null;
                return lake;
            });
    },

    findByQuery(query) {
        return this.find(query)
            .lean()
            .select();
    },

    removeById(id) {
        return this.findOneAndRemove({
            _id: id
        });
    }

};

module.exports = mongoose.model('Lake', schema); 