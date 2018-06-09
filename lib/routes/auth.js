require('dotenv').config();
const router = require('express').Router();
const { respond } = require('./route-helpers');
const User = require('../models/User');
const { sign } = require('../util/token-service');
const createEnsureAuth = require('../util/ensure-auth');
const admin1 = process.env.APP_ADMIN_1;
const admin2 = process.env.APP_ADMIN_2;

const hasNameAndPassword = ({ body }, res, next) => {
    const { name, password } = body;
    if(!name || !password) {
        throw {
            status: 400,
            error: 'Name and Password are Required'
        };
    }
    next();
};

module.exports = router

    .get('/verify', createEnsureAuth(), respond(
        () => Promise.resolve({ verified: true })
    ))

    .post('/signup', hasNameAndPassword, respond(
        ({ body }) => {
            console.log('BODY BEFORE NAME CHECK', body);
            const { name, password } = body;
            delete body.password;
            return User.exists({ name })
                .then(exists => {
                    if(exists) {
                        throw {
                            status: 400,
                            error: 'Name Already Exists'
                        };
                    }
                    if(name === admin1 || name === admin2) {
                        body.role = 'SodaPeaksAdmin';
                    } else {
                        throw {
                            status: 400,
                            error: 'Access denied'
                        };
                    }
                    const user = new User(body);
                    console.log('BODY AFTER NAME CHECK', user);
                    user.name = user.name.toLowerCase();
                    user.generateHash(password);
                    return user.save();
                })
                .then(user => {
                    return { token: sign(user) };
                });
        }
    ))

    .post('/signin', hasNameAndPassword, respond(
        ({ body }) => {
            const { name, password } = body;
            delete body.password;

            return User.findOne({ name })
                .then(user => {
                    if(!user || !user.comparePassword(password)) {
                        throw {
                            status: 401,
                            error: 'Invalid Name or Password'
                        };
                    }
                    return { token: sign(user) };
                });
        }
    ));