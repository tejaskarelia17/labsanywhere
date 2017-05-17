'use strict';

const ObjectID = require('mongodb').ObjectID;

const {labs, testReports} = require('../../../backend/mongo/collections');
const {testReportsNotify, doctorCommentsNotify} = require('../../../backend/redis/publishers');

module.exports = {
    addNewLab,
    addNewTestReport,
    getLabById,
    getTestReportById,
    postDoctorComment
}

///////////////////////

async function addNewLab(lab) {
    const collection = await labs();
    collection.insertOne(lab);
    return lab;
}

async function addNewTestReport(testReport) {
    const collection = await testReports();
    collection.insertOne(testReport);
    testReportsNotify(testReport);
    return testReport;
}

async function getLabById(id) {
    const collection = await labs();
    return collection.findOne({_id: new ObjectID(id)});
}

async function getTestReportById(id) {
    const collection = await testReports();
    return collection.findOne({_id: new ObjectID(id)});
}

async function postDoctorComment(id, doctorComment) {
    const collection = await testReports();
    const result = collection.updateOne({_id: new ObjectID(id)}, {$set: {doctorComment}});
    doctorCommentsNotify({reportId: id, doctorComment});
    return result;
}