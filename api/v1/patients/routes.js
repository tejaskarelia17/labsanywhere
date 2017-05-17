'use strict';

const express = require('express');

const data = require('./data');

const router = module.exports = express.Router();

router.post('/', addNewPatient);
router.get('/', getPatients);
router.get('/:id', getPatientById);

/////////////////////

async function addNewPatient(req, res) {
    try {
        await data.addNewPatient(req.body);
        res.json({message: 'New patient added successfully'});
    } catch (err) {
        req.logger.error({err}, 'while adding new patient');
        res.status(500).json({message: 'server error: unable to add new patient'});
    }
}

async function getPatientById(req, res) {
    try {
        const patient = await data.getPatientById(req.params.id);
        if (patient) {
            res.json({patients:[patient]});
        } else {
            res.status(404).json({message: 'No patient with this ID found!'});
        }
    } catch(err) {
        req.logger.error({err}, `while getting details for patient ${req.params.id}`);
        res.status(500).json({message: `server error: unable to fetch details for patient ${req.params.id}`});
    }
}

async function getPatients(req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const take = req.query.take ? parseInt(req.query.take) : 20;

    if (take > 100) {
        res.status(400).json({message: 'cannot retrieve more than 100 patients in one fetch'});
    } else {
        try {
            const patients = await data.getPatients({skip, take});
            res.json(patients);
        } catch (err) {
            req.logger.error({err, skip, take}, 'while getting list of patients');
            res.status(500).json({message: 'server error: unable to fetch list of patients'});
        }
    }
}