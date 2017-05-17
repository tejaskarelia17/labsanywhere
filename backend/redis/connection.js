'use strict';

const ioredis = require('ioredis');

const {REDIS} = require('../../config/backend');

module.exports = async function connect() {
    return Promise.resolve(ioredis(REDIS.PORT, REDIS.HOST));
}