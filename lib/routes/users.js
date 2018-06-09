const router = require('express').Router();
const User = require('../models/User');
const { getParam, respond } = require('./route-helpers');
// const createEnsureAuth = require('../util/ensure-auth');
// const createEnsureRole = require('../util/ensure-role');
// const ensureAuth = createEnsureAuth();
// const ensureRole = createEnsureRole('admin');
// const createEnsureSameUser = require('../util/ensure-same-user');
// const ensureSameUser = createEnsureSameUser();

module.exports = router

    .param('id', getParam)

    .get('/:id', respond(
        ({ id }) => User.getDetailById(id)
    ))

    .get('/', respond(
        ({ query }) => User.getByQuery(query)
    ));