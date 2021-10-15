const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'A role is required']
    }
});

module.exports = model('Role', RoleSchema);