const Role = require('../model/role');
const User = require('../model/user');

const isRoleValid = async (role = '') => {
   const roleExists = await Role.findOne({ role });
   if( !roleExists ) {
       throw new Error(`The rol ${ role } does not exist in the Database`);
   }
}

const emailExists = async ( email = '' ) => {
    const isEmail = await User.findOne( { email } );
    if( isEmail ) {
        throw new Error(`This email ${ email } already exist`);
    }
}

const userExistById = async ( id ) => {
    const userExists = await User.findById( id );
    if( !userExists ) {
        throw new Error(`This user ID ${ id } does not exist in the database`);
    }
}

module.exports = {
    isRoleValid,
    emailExists,
    userExistById
}