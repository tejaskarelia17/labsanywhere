'use strict';

const express = require('express');

const data = require('./data');

const router = module.exports = express.Router();

router.post('/', addNewTest);
router.get('/', getTests);
router.get('/:id', getTestById);

/////////////////////

async function addNewTest(req, res) {
    try {
        await data.addNewTest(req.body);
        res.send({message: 'New test added successfully'});
    } catch(err) {
        LOGGER.error({err}, 'while adding new test type');
        res.status(500).send({message: 'server error: unable to add new test type'});
    }
}

async function getTestById(req, res) {
    try {
        const test = await data.getTestById(req.params.id);
        if (test) {
            res.send({tests:[test]});
        } else {
            res.status(404).send({message: 'No test with this ID found!'});
        }
    } catch (err) {
        LOGGER.error({err}, `while getting details for test ${req.params.id}`);
        res.status(500).send({message: `server error: unable to fetch details for test ${req.params.id}`});
    }
}

async function getTests(req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const take = req.query.take ? parseInt(req.query.take) : 20;

    if (take > 100) {
        res.status(400).json({message: 'cannot retrieve more than 100 tests in one fetch'});
    } else {
        try {
            const tests = await data.getTests({skip, take});
            res.json(tests);
        } catch (err) {
            LOGGER.error({err, skip, take}, 'while getting list of tests');
            res.status(500).json({message: 'server error: unable to fetch list of tests'});
        }
    }
}