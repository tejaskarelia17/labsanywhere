'use strict';

const ObjectID = require('mongodb').ObjectID;

const patients = require('../../../backend/mongo/collections').patients;

module.exports = {
    addNewPatient,
    getPatientById,
    getPatients
}

///////////////////////

async function addNewPatient(patient) {
    const collection = await patients()
    collection.insertOne(patient);
    return patient;
}

async function getPatientById(id) {
    const collection = patients()
    return collection.findOne({_id: new ObjectID(id)});
}

async function getPatients({skip, take}) {
    const collection = await patients();
    return collection.find().skip(skip).limit(take).toArray();
}