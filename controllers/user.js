const { response } = require('express');

const getUser = (req, res = response) => {
    const { name = 'No mane', age = 1, page = 1 } = req.query; //Default values can be defined.
    res.json({
        msg: 'getUser - controller',
        name,
        age,
        page
    });
}

const postUser = (req, res = response) => {
    const { name } = req.body;
    res.json({
        msg: 'postUser - controller',
        name
    });
}

const putUser = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'putUser - controller',
        id
    });
}

const patchUser = (req, res = response) => {
    res.json({
        msg : 'patchUser - controller'
    });
}

const deleteUser = (req, res) => {
    res.json({
        msg: 'deleteUser - controller'
    });
}

module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}