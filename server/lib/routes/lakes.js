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

    .get('/:id', respond(
        ({ id }) => Lake.getDetailById(id)
    ))
    
    .get('/', respond(
        ({ query }) => Lake.findByQuery(query)
    ))
    
    .put('/:id', respond(
        ({ id, body, }) => Lake.updateById(id, body)
    ))
    
    .delete('/:id', respond(
        ({ id }) => Lake.removeById(id)
            .then(deleted => {
                return { removed: !!deleted };
            })
    ));