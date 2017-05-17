'use strict';

const ObjectID = require('mongodb').ObjectID;

const {messages, messageThreads} = require('../../../backend/mongo/collections');
const {newMessageNotify} = require('../../../backend/redis/publishers');

module.exports = {
    createMessageThread,
    getMessagesByThreadId,
    getUserThreads,
    sendMessage,
    updateThreadStats
}

///////////////////////

async function createMessageThread(thread) {
    const collection = await messageThreads();
    collection.insertOne(thread);
    return thread;
}

async function getMessagesByThreadId(threadId, {skip, take}) {
    const collection = await messages();
    return collection.find({threadId}).skip(skip).limit(take).toArray();
}

async function getUserThreads(userid, {skip, take}) {
    const collection = await messageThreads();
    return collection.find({participants: userid}).skip(skip).limit(take).toArray();
}

async function sendMessage(message) {
    const collection = await messages();
    collection.insertOne(message);
    newMessageNotify(message);
    return message;
}

async function updateThreadStats(threadId, updates) {
    const collection = await messageThreads();
    return collection.updateOne({_id: new ObjectID(threadId)}, {$set: updates});
}