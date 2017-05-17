'use strict';

const ObjectID = require('mongodb').ObjectID;

const tests = require('../../../backend/mongo/collections').tests;

module.exports = {
    addNewTest,
    getTestById,
    getTests
}

///////////////////////

async function addNewTest(test) {
    const collection = await tests();
    collection.insertOne(test);
    return test;
}

async function getTestById(id) {
    const collection = await tests();
    return collection.findOne({_id: new ObjectID(id)});
}

async function getTests({skip, take}) {
    const collection = await tests();
    return collection.find().skip(skip).limit(take).toArray();
}