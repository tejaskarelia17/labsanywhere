'use strict';

const connection = require('./connection');

const collections = {};

module.exports = {
    doctors: getCollectionFn('doctors'),
    labs: getCollectionFn('labs'),
    messages: getCollectionFn('messages'),
    messageThreads: getCollectionFn('messageThreads'),
    patients: getCollectionFn('patients'),
    testReports: getCollectionFn('testReports'),
    tests: getCollectionFn('tests'),
    users: getCollectionFn('users')
}

///////////////////////

function getCollectionFn(name) {
    return function getCollection() {
        if (collections[name]) {
            return Promise.resolve(collections[name]);
        }

        return (
            connection()
                .then((db) => {
                    collections[name] = db.collection(name);
                    return collections[name];
                })
        );
    }
}

