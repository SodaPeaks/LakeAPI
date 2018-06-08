const router = require('express').Router();
const Lake = require('../models/Lake');
const { getParam, respond } = require('./route-helpers');
// const createEnsureAuth = require('../util/ensure-auth');
// const createEnsureRole = require('../util/ensure-role');
// const ensureAuth = createEnsureAuth();
// const ensureRole = createEnsureRole('admin');

module.exports = router 

    .param('id', getParam)

    .post('/', respond(
        ({ body }) => Lake.create(body)
    ))
    
    .get('/', respond(
        ({ query }) => Lake.findByQuery(query)
    ));