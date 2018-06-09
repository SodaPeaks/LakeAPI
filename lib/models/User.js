const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const { RequiredString } = require('../util/mongoose-helpers');

const schema = new Schema({
    name: RequiredString,
    hash: RequiredString,
    role: RequiredString
});

// const updateOptions = {
//     new: true,
//     runValidators: true
// };

schema.methods = {
    generateHash(password) {
        this.hash = bcrypt.hashSync(password);
    },
    comparePassword(password) {
        return bcrypt.compareSync(password, this.hash);
    }
};

schema.statics = {
    getDetailById(id) {
        return this.findById(id)
            .lean()
            .select()
            .then((user) => {
                if(!user) return null;
                return user;
            });
    },
    
    getByQuery(query) {
        return this.find(query)
            .lean()
            .select('name email following')
            .populate({
                path: 'playlists',
                select: 'name'
            })
            .populate({
                path: 'following',
                select: 'name'
            });
    },
    // updateUserById(id, update) {
    //     return this.findByIdAndUpdate(id, update, updateOptions)
    //         .select('name email following')
    //         .populate({
    //             path: 'playlists',
    //             select: 'name'
    //         })
    //         .populate({
    //             path: 'following',
    //             select: 'name'
    //         });
    // }
};

module.exports = mongoose.model('User', schema);