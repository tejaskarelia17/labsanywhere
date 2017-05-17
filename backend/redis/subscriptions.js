'use strict';

const connection = require('./connection');

const LOGGER = require('../../loggers/appLogger');

setupSubscriptions();

module.exports = {
    testReports: (userId, handle) => subscribers.testReports[userId] = handle,
    doctorComments: (userId, handle) => subscribers.doctorComments[userId] = handle,
    messages: (userId, handle) => subscribers.messages[userId] = handle
}

///////////////////////////////

const subscribers = {
    testReports: {},
    doctorComments: {},
    messages: {}
};

const channelFilters = {
    testReports: (userId, message) => ([message.patient.id, doctor.patient.id].indexOf(userId) !== -1),
    doctorComments: (userId, message) => (message.patient.id === userId),
    messages: (userId, message) => (to.participantId == userId)
}

async function setupSubscriptions() {
    const sub = await connection();

    sub.subscribe('testReports', 'doctorComments', 'messages', (err) => {
        if (err) {
            LOGGER.error({err}, 'Could not subscribe to channels');
        } else {
            sub.on('message', (channel, message) => {
                const thisMessage = JSON.parse(message);
                LOGGER.info({thisMessage}, `[${channel}] Received message`);
                const theList = Object.keys(subscribers[channel]).filter((userId) => channelFilters[channel](userId, thisMessage));
                theList.forEach((userId) => subscribers[channel][userId].handle(channel, thisMessage));
            });
        }
    });
}