const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN2, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database connected');
    } catch (error) {
        console.log( error );
        throw new Error('Error to start the database');
    }
}

module.exports = {
    dbConnection
}