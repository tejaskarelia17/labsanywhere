'use strict';

const uuidV1 = require('uuid/v1');

const LOGGER = require('../common/utils').getLogger();

module.exports = function logRequest(req, res, next) {
    // log all request bodies, as well as the route they are requesting and the HTTP verb
    const start = Date.now();
    const reqId = uuidV1();

    req.logger = LOGGER.child({reqId});

    res.on('finish', () => {
        const end = Date.now();
        let username = null;
        if (req.user) {
            username = req.user.username;
        }
        LOGGER.info({category: 'accessLogs', reqId, username, req, res, responseTime: (end - start)});
    });

    next();
}