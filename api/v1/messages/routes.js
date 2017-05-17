'use strict';

const express = require('express');

const data = require('./data');

const router = module.exports = express.Router();

router.post('/', sendMessage);
router.get('/:userid/threads', getUserThreads);
router.get('/:userid/threads/:id', getMessagesByThreadId);

/////////////////////

async function getMessagesByThreadId(req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const take = req.query.take ? parseInt(req.query.take) : 20;

    if (take > 100) {
        res.status(400).json({message: 'cannot retrieve more than 100 messages in one fetch'});
    } else {
        try {
            const messages = await data.getMessagesByThreadId(req.params.id, {skip, take});
            res.json(messages);
        } catch (err) {
            req.logger.error({err}, 'while retreiving messages in thread');
            res.status(500).json({message: 'server error: unable to retrieve messages'});
        }
    }
}

async function getUserThreads(req, res) {
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const take = req.query.take ? parseInt(req.query.take) : 20;

    if (take > 100) {
        res.status(400).json({message: 'cannot retrieve more than 100 threads in one fetch'});
    } else {
        try {
            const threads = await data.getUserThreads(req.params.userid, {skip, take});
            res.json(threads);
        } catch (err) {
            req.logger.error({err, skip, take}, `while getting list of threads for ${req.params.userid}`);
            res.status(500).json({message: `server error: unable to fetch list of threads for ${req.params.userid}`});
        }
    }
}

async function sendMessage(req, res) {
    try {
        const now = Date.now();
        let threadId = req.body.threadId;
        if (typeof threadId === 'undefined') {
            const thread = {
                participants: [
                    `${req.body.from.type}-${req.body.from.participantId}`,
                    `${req.body.to.type}-${req.body.to.participantId}`,
                ],
                startedOn: now
            }
            const result = await data.createMessageThread(thread);
            threadId = result._id.toHexString();
        }

        const message = Object.assign({threadId, sentOn: now}, req.body);
        await data.sendMessage(message);

        await data.updateThreadStats(threadId, {lastInteractionOn: now});
        res.send({message: 'Message sent successfully'});
    } catch (err) {
        req.logger.error({err}, 'while sending message');
        res.status(500).json({message: 'server error: unable to send message'});
    }
}