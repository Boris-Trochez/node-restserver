const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../model/user');

const getUser = async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query; //Default values can be defined.
    const query = { state: true }

    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip( Number( from ) )
            .limit( Number( limit ) )
    ]);
        
    res.json({ 
        total,
        users
    });
}

const postUser = async (req, res = response) => {

    const { name, password, email, role } = req.body;
    const user = new User( { name, password, email, role } );

    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    //Save in database
    await user.save();
    
    res.status(201).json({
        user
    });
}

const putUser = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if( password ) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json( user );
}

const patchUser = (req, res = response) => {
    res.json({
        msg : 'patchUser - controller'
    });
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate( id, { state: false } );

    res.json(
        user
    );
}

module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}