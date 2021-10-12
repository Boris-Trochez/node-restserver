const { Router } = require('express');

const { getUser, 
        postUser, 
        putUser, 
        patchUser, 
        deleteUser } = require('../controllers/user');

const route = Router();

route.get('/', getUser );

route.post('/', postUser );

route.put('/:id', putUser );

route.patch('/', patchUser );

route.delete('/', deleteUser );

module.exports = route;