'use strict';

const amqp = require('amqplib');

const {RABBIT_MQ} = require('../../config/backend');

module.exports = async function connect() {
    // attempt connection to RMQ
    const connection = await amqp.connect(RABBIT_MQ.URI);
    process.once('SIGINT', () => connection.close());
    return connection;
}