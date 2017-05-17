'use strict';

const socketio = require('socket.io');

const {testReports, doctorComments, messages} = require('../backend/redis/subscriptions');
const LOGGER = require('../loggers/appLogger');

const userType = {
    patient: [testReports, doctorComments, messages],
    doctor:  [testReports, messages]
}

module.exports = {
    setup
}

///////////////////////

function setup(server) {
    const io = socketio(server);
    io.on('connection', _onConnection);
    return io;
}

function _onConnection(socket) {
    socket.on('join', function(message) {
        socket.join(message.userId);
        const subscriptions = userType[message.userType] || [messages];
        subscriptions.forEach((subscribe) => subscribe(message.userId, (channel, msg) => _processMessage(socket, channel, msg)))
    });
}

function _processMessage(socket, channel, msg) {
    socket.emit(channel, msg);
}