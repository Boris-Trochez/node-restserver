const { Router } = require('express');
const { check } = require('express-validator');
const { isRoleValid, emailExists, userExistById } = require('../helpers/db-validator');

const { getUser, 
        postUser, 
        putUser, 
        patchUser, 
        deleteUser } = require('../controllers/user');
const { validateFields } = require('../middlewares/validate-fields');

const route = Router();

route.get('/', getUser );

route.post('/', [
        check('name', 'A name is required').not().isEmpty(),
        check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
        //check('role', 'Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom( isRoleValid ),
        check('email', 'This is an invalid email').isEmail(),
        check('email').custom( emailExists ),
        validateFields
] ,postUser );

route.put('/:id',[
        check('id', 'This is not a valid ID').isMongoId(),
        check('id').custom( userExistById ),
        check('role').custom( isRoleValid ),
        validateFields

],putUser );

route.patch('/', patchUser );

route.delete('/:id', deleteUser );

module.exports = route;