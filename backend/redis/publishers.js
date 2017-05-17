'use strict';

const connection = require('./connection');

const LOGGER = require('../../loggers/appLogger');

const notifierConnections = {};

module.exports = {
    testReportsNotify: (message) => publish('testReports', message),
    doctorCommentsNotify: (message) => publish('doctorComments', message),
    newMessageNotify: (message) => publish('messages', message)
}

////////////////////

async function publish(channel, message) {
    let pub = notifierConnections[channel];
    if (!pub) {
        pub = notifierConnections[channel] = await connection();
    }

    LOGGER.info({message}, `[${channel}] Publishing message`);
    pub.publish(channel, JSON.stringify(message));
}