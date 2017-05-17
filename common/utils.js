'use strict';

const bunyan = require('bunyan');
const RabbitMQStream = require('bunyan-rabbitmq-stream').stream;

const {RABBIT_MQ} = require('../config/backend');

const rmqStream = new RabbitMQStream({
    uri: RABBIT_MQ.URI,
    exchangeName: RABBIT_MQ.EXCHANGE_NAME,
    namePrefix: RABBIT_MQ.QUEUE_NAME_PREFIX,
    routingKey: RABBIT_MQ.ROUTING_KEY
});

rmqStream.connect()
  .then(() => console.log('rabbitmq log stream connected'));

const LOGGER = bunyan.createLogger({
    name: 'labs-anywhere-server',
    streams: [
        { stream: process.stdout },
        { stream: rmqStream }
    ],
    serializers: {
        err: bunyan.stdSerializers.err,
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res
    }
});

module.exports = {
    getLogger: () => LOGGER,
}