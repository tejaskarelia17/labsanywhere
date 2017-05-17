'use strict';

const ObjectID = require('mongodb').ObjectID;

const doctors = require('../../../backend/mongo/collections').doctors;

module.exports = {
    addNewDoctor,
    getDoctorById,
    getDoctors
}

///////////////////////

async function addNewDoctor(doctor) {
    const collection = await doctors();
    collection.insertOne(doctor);
    return doctor;
}

async function getDoctorById(id) {
    const collection = await doctors();
    return collection.findOne({_id: new ObjectID(id)});
}

async function getDoctors({skip, take}) {
    const collection = await doctors();
    return collection.find().skip(skip).limit(take).toArray();
}