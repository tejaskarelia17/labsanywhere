'use strict';

const connection = require('./connection');

module.exports = {
    applogConsumer: (messageHandler) => getQueue('applogs-01', messageHandler)
}

async function getQueue(queueName, messageHandler) {
    const conn = await connection();

    const channel = await conn.createChannel();
    // assertQueue will create the queue if it does not exits
    await channel.assertQueue(queueName);
    // setup a callback which will be triggered when messages are found
    // on selected queue
    return await channel.consume(queueName, (message) => messageHandler(channel, message));
}