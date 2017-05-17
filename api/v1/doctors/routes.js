'use strict';

const express = require('express');

const data = require('./data');

const router = module.exports = express.Router();

router.post('/', addNewDoctor);
router.get('/', getDoctors);
router.get('/:id', getDoctorById);

/////////////////////

async function addNewDoctor(req, res) {
    await data.addNewDoctor(req.body);
    res.send({message: 'New doctor added successfully'});
}

async function getDoctorById(req, res) {
    const doctor = await data.getDoctorById(req.params.id);
    if (doctor) {
        res.send({doctors:[doctor]});
    } else {
        res.status(404).send({message: 'No doctor with this ID found!'});
    }
}

async function getDoctors(req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const take = req.query.take ? parseInt(req.query.take) : 20;

    if (take > 100) {
        res.status(400).json({message: 'cannot retrieve more than 100 doctors in one fetch'});
    } else {
        try {
            const doctors = await data.getDoctors({skip, take});
            res.json(doctors);
        } catch (err) {
            req.logger.error({err, skip, take}, 'while getting list of doctors');
            res.status(500).json({message: 'server error: unable to fetch list of doctors'});
        }
    }
}