'use strict';

const elasticsearch = require('elasticsearch');

const {ELASTICSEARCH} = require('../../config/backend');

module.exports = async function connect() {
    const esClient = new elasticsearch.Client({
        host: ELASTICSEARCH.HOST
    });
    await esClient.ping({ requestTimeout: 30000 });
    return esClient;
}

