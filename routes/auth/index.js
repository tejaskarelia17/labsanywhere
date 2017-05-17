'use strict';

const passportUtils = require('./passport_utils');

module.exports.setup = function(app) {
    const passport = passportUtils.getPassport();
    app.use(passport.initialize());
    app.use(passport.session());

    app.post('/api/v1/auth/login', passportUtils.authenticate);
    app.get('/api/v1/auth/logout', passportUtils.logout);

    app.all('/api/*', passportUtils.ensureAuthentcation);

    return app;
}