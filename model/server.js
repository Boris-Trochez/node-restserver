require('dotenv').config();
const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';
        
        //MiddleWares
        this.middleWares();

        //App Routes
        this.routes();
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
        console.log("ddd")
        this.app.use( this.userPath, require('../routes/user') );
    }

    listen() { 
        this.app.listen( this.port, () => {
            console.log(`Listening at PORT ${ this.port }`);
        });
    }
}

module.exports = Server;