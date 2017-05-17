'use strict';

const bunyan = require('bunyan');
const moment = require('moment');
global.Promise = require('bluebird');

const esConnection = require('./backend/elasticsearch/connection');
const {applogConsumer} = require('./backend/rabbitmq/consumers');

const INDEX_PREFIX_APPLOGS = 'applogs';

const LOGGER = bunyan.createLogger({
    name: 'labs-anywhere-log_writer',
    serializers: {
        err: bunyan.stdSerializers.err
    }
});

startLogWriter();

/////////////////////////////

async function startLogWriter() {
    try {
        // attempt connection to ES
        const esClient = await esConnection();
        await applogConsumer((channel, message) => _onMessage(esClient, channel, message));

        LOGGER.info(' [*] Waiting for messages. To exit press CTRL+C');
    } catch (err) {
        LOGGER.error({err});
    }
}

function _onMessage(esClient, channel, message) {
    if (message.properties.contentType === 'application/json') {
        const payload = JSON.parse(message.content.toString());
        // create monthly index based on the time found in the logline
        esClient
            .index({
                index: `${INDEX_PREFIX_APPLOGS}-${moment(payload.time).utc().format('YYYY-MM')}`,
                type: payload.name,
                body: payload
            })
            .then(() => channel.ack(message))
            .catch((err) => {
                LOGGER.error({err}, 'error attempting to publish to ES');
                channel.ack(message);
            });
    } else {
        LOGGER.error({contentType: message.properties.contentType}, 'Unknown content type...');
    }
}