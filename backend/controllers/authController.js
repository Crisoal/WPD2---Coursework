const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const studentModel = require('../models/studentModel');
const mentorModel = require('../models/mentorModel');
const studentController = require('../controllers/studentController');

passport.serializeUser((user, done) => {
    done(null, user); // Serialize based on the user's _id
});

passport.deserializeUser(async (_id, done) => {
    try {
        const user = await User.findById(_id);

        if (!user) {
            console.log('User not found with _id:', _id);
            return done(null, false);
        }

        console.log('Found user:', user);
        done(null, user); // Return the entire user object
    } catch (err) {
        console.error('Deserialization error:', err);
        done(err, null);
    }
});

passport.use('local', new LocalStrategy({
    usernameField: 'usernameOrEmail',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, usernameOrEmail, password, done) => {
    try {
        const user = await User.findByUsernameOrEmail(usernameOrEmail);

        if (!user) {
            return done(null, false, { message: 'User not found.' });
        }

        if (user.password !== password) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    } catch (error) {
        console.error(error);
        return done(error);
    }
}));

passport.use('local-student', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    try {
        const existingUser = await User.findByEmail(email);

        if (existingUser) {
            return done(null, false, { message: 'Email already in use.' });
        }

        const newUser = {
            username: req.body.username,
            email: email,
            password: password,
            role: 'student',
        };

        const insertedUser = await User.insert(newUser);

        await studentModel.insert({
            ...newUser,
            user_id: insertedUser._id,
        });

        return done(null, newUser);
    } catch (error) {
        console.error(error);
        return done(error);
    }
}));

passport.use('local-mentor', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    try {
        const existingUser = await User.findByEmail(email);

        if (existingUser) {
            return done(null, false, { message: 'Email already in use.' });
        }

        const newUser = {
            username: req.body.username,
            email: email,
            password: password,
            role: 'mentor',
        };

        await User.insert(newUser);
        await mentorModel.insert(newUser);

        return done(null, newUser);
    } catch (error) {
        console.error(error);
        return done(error);
    }
}));

const authController = {
    login: (req, res, next) => {
        passport.authenticate('local', async (err, user, info) => {
            if (err) {
                console.error(err);
                return next(err);
            }

            if (!user) {
                return res.redirect('/user/login');
            }

            req.logIn(user, async (err) => {
                if (err) {
                    console.error(err);
                    return next(err);
                }

                console.log('Logged in user role:', user.role);

                if (!req.user || !req.user._id) {
                    console.error('User ID not available in the request.');
                    return res.status(401).json({ error: 'Unauthorized' });
                }

                if (user.role === 'student') {
                    await studentController.getDashboard(req.user._id, res);
                } else {
                    res.redirect(redirectPath);
                }
            });
        })(req, res, next);
    },

    registerStudent: (req, res, next) => {
        passport.authenticate('local-student', {
            successRedirect: '/user/login',
            failureRedirect: '/user/register-student',
            failureFlash: true
        })(req, res, next);
    },

    registerMentor: (req, res, next) => {
        passport.authenticate('local-mentor', {
            successRedirect: '/user/login',
            failureRedirect: '/user/register-mentor',
            failureFlash: true
        })(req, res, next);
    },

    logout: (req, res) => {
        req.logout();
        res.redirect('/user/login');
    },

    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/user/login');
    },
};

module.exports = authController;
