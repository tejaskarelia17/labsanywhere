'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const routes = require('../routes');
const requestLogger = require('../loggers/requestLogger');
const {REDIS} = require('../config/backend');

const THREE_HOURS = 3 * 60 * 60 * 1000;

module.exports = {
    setup
}

//////////////////////

function setup(Server) {
    // create the express app and setup the routes
    // using the routes module
    let app = express();
    // add session support
    app.use(session({
        store: new RedisStore({host: REDIS.HOST, port: REDIS.PORT, db: 10}),
        secret: 'l3V!tatE',
        cookie: {maxAge: THREE_HOURS},
        // Forces the session to be saved back to the session store, even if the session was never modified during the request.
        resave: false,
        // Force a session identifier cookie to be set on every response
        rolling: true,
        // Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
        saveUninitialized: false
    }));
    // body parser which ensure that server only accepts json
    app.use(bodyParser.json());
    // add a request response logger
    app.use(requestLogger);
    // serve static assets normally
    app.use(express.static(path.resolve(__dirname, '..', 'public')));
    // setup all routes
    app = routes.setup(app);
    // Handles all routes so you do not get a not found error
    app.get('*', function (request, response) {
        response.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
    })
    // add an error handler
    app.use(errorHandler);

    return {app, server: Server(app)};
}

function errorHandler(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Something went wrong!!! :|');
}