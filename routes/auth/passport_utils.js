'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const {users} = require('../../backend/mongo/collections');
const LOGGER = require('../../loggers/appLogger');

module.exports = {
    authenticate,
    ensureAuthentcation,
    getPassport,
    logout
}

function authenticate(req, res, next) {
    const doAuth = passport.authenticate('local-mongo', {
        session: true,
        successRedirect: '/admin/dashboard',
        failureRedirect: '/login'
    });
    return doAuth(req, res, next);
}

function ensureAuthentcation(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.logger.warn('Unauthenticated request received');
    res.status(401).json({message: 'Signin required to access this resource'});
    // res.redirect('/signin.html');
}

function getPassport() {
    _configureStrategies(passport);
    _configureSessionSerializer(passport);
    return passport;
}

function logout(req, res) {
    if (req.user) {
        const username = req.user.username
        req.logout();
        LOGGER.info({username}, 'User has logged out');
    }
    res.redirect('/login');
}

///////////////////////

function _configureSessionSerializer(passport) {
    passport.serializeUser((user, done) => done(null, user.username));
    passport.deserializeUser((username, done) => _getUser(username, done));
}

function _configureStrategies(passport) {
    passport.use(
        'local-mongo',
        new LocalStrategy(
            { usernameField: 'username', passwordField: 'password' },
            _validateUser
        )
    )
}

async function _getUser(username, callback) {
    try {
        const collection = await users();
        const user = await collection.findOne({username});
        if (callback) {
            return callback(null, user);
        }
        return user;
    } catch(err) {
        if (callback) {
            return callback(err)
        }
        throw err;
    }
}

async function _validateUser(username, password, done) {
    try {
        const user = await _getUser(username);
        if (!user) {
            LOGGER.info({username}, 'Login attempted with invalid username');
            return done(null, false, {message: 'Invalid username'});
        }

        if (user.password !== password) {
            LOGGER.info({username}, 'Login attempted with incorrect password');
            return done(null, false, {message: 'Incorrect password'});
        }

        LOGGER.info({username}, 'Successful login');
        return done(null, user);
    } catch (err) {
        done(err);
    }
}