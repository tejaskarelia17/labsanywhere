'use strict';

const express = require('express');

const data = require('./data');

const router = module.exports = express.Router();

router.post('/', addNewLab);
router.get('/:id', getLabById);
router.post('/:id/test-reports', addNewTestReport);
router.get('/:id/test-reports/:reportId', getTestReportById);
router.post('/:id/test-reports/:reportId/comment', postDoctorComment);

/////////////////////

async function addNewLab(req, res) {
    try {
        await data.addNewLab(req.body);
        res.json({message: 'New Lab added successfully'});
    } catch (err) {
        req.logger.error({err}, 'while adding new lab');
        res.status(500).json({message: 'server error: unable to add new lab'});
    }
}

async function addNewTestReport(req, res) {
    try {
        const testReport = Object.assign({}, req.body);
        testReport.lab.id = req.params.id;
        await data.addNewTestReport(testReport);
        res.json({message: 'Report added successfully'});
    } catch (err) {
        req.logger.error({err}, 'while adding new test report');
        res.status(500).json({message: 'server error: unable to add new test report'});
    }
}

async function getLabById(req, res) {
    try {
        const lab = await data.getLabById(req.params.id);
        if (lab) {
            res.json({labs:[lab]});
        } else {
            res.status(404).json({message: 'No Lab with this ID found!'});
        }
    } catch (err) {
        req.logger.error({err}, `while getting details for lab ${req.params.id}`);
        res.status(500).json({message: `server error: unable to fetch details for lab ${req.params.id}`});
    }
}

async function getTestReportById(req, res) {
    try {
        const testReport = await data.getTestReportById(req.params.reportId);
        if (testReport) {
            res.json({testReports:[testReport]});
        } else {
            res.status(404).json({message: 'No test report with this ID found!'});
        }
    } catch (err) {
        req.logger.error({err}, `while getting details for test report ${req.params.reportId}`);
        res.status(500).json({message: `server error: unable to fetch details for test report ${req.params.reportId}`});
    }
}

async function postDoctorComment(req, res) {
    try {
        await data.postDoctorComment(req.params.reportId, req.body.comment);
        res.json({message: 'successfully posted doctor comment'});
    } catch (err) {
        req.logger.error({err}, `while posting doctor's comment for test report ${req.params.reportId}`);
        res.status(500).json({message: `server error: unable to post comment for test report ${req.params.reportId}`});
    }
}