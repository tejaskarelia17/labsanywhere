'use strict';

module.exports = {
    MONGO: {
        URL: 'localhost:27017',
        DB_NAME: 'labsanywhere'
    },
    RABBIT_MQ: {
        URI: 'amqp://admin:Adm1n@localhost',
        EXCHANGE_NAME: 'logging',
        QUEUE_NAME_PREFIX: 'applogs-',
        ROUTING_KEY: 'log.apps'
    },
    ELASTICSEARCH: {
        HOST: '10.0.75.1:9200'
    },
    REDIS: {
        HOST: 'localhost',
        PORT: 6379
    }
}