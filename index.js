'use strict';

// get the port from environment variables or use the default port
const PORT = process.env.PORT || 8888;

const http = require('http');

const LOGGER = require('./loggers/appLogger');
const webapp = require('./app/webapp');
const socketapp = require('./app/socketapp');

const {server, app} = webapp.setup(http.Server);
app.io = socketapp.setup(server);

// start the webserver
server.listen(PORT, () => {
    LOGGER.info('Server started on port ', PORT);
});