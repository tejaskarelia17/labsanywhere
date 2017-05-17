'use strict';

const auth = require('./auth');
const doctors = require('../api/v1/doctors/routes');
const labs = require('../api/v1/labs/routes');
const messages = require('../api/v1/messages/routes');
const patients = require('../api/v1/patients/routes');
const tests = require('../api/v1/tests/routes');

module.exports.setup = function(app) {
    app = auth.setup(app);

    app.use('/api/v1/doctors', doctors);
    app.use('/api/v1/labs', labs);
    app.use('/api/v1/messages', messages);
    app.use('/api/v1/patients', patients);
    app.use('/api/v1/tests', tests);

    return app;
}