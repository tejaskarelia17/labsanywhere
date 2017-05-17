'use strict';

const {MONGO} = require('../../config/backend');

const MongoClient = require('mongodb').MongoClient;
const db = null;

module.exports = function connect() {
    if (db) {
        return Promise.resolve(db);
    }

    return MongoClient.connect(`mongodb://${MONGO.URL}/${MONGO.DB_NAME}`);
}