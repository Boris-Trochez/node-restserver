const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

        //Connect database
        this.connectDB();
        
        //MiddleWares
        this.middleWares();

        //App Routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middleWares() {
        //CORS
        this.app.use( cors() );   
        
        //Read and Parse of the body
        this.app.use( express.json() );

        //Public directory
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.userPath, require('../routes/user') );
    }

    listen() { 
        this.app.listen( this.port, () => {
            console.log(`Listening at PORT ${ this.port }`);
        });
    }
}

module.exports = Server;