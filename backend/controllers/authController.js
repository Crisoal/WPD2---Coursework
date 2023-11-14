const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const studentModel = require('../models/studentModel');
const mentorModel = require('../models/mentorModel');
const studentController = require('../controllers/studentController'); // Import studentController

passport.serializeUser((user, done) => {
    done(null, user); // Serialize based on the user's _id
});

passport.deserializeUser(async (email, done) => {
    try {
        const user = await User.findByEmail(email);

        if (!user) {
            console.log('User not found with email:', email);
            return done(null, false);
        }

        console.log('Found user:', user);
        done(null, { ...user, role: user.role }); // Include the user's role in the deserialized object
    } catch (err) {
        console.error('Deserialization error:', err);
        done(err, null);
    }
});

passport.use('local', new LocalStrategy({
    usernameField: 'usernameOrEmail', // Use a single field for both username and email
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

        // Insert into the users.db
        await User.insert(newUser);

        // Insert into the students.db
        await studentModel.insert(newUser);

        // Call createDashboard function from studentController
        studentController.createDashboard(newUser.email); // Assuming newUser has _id field

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

        // Insert into the users.db
        await User.insert(newUser);

        // Insert into the mentors.db
        await mentorModel.insert(newUser);

        return done(null, newUser);
    } catch (error) {
        console.error(error);
        return done(error);
    }
}));

const authController = {
    login: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error(err);
                return next(err);
            }

            if (!user) {
                // Authentication failed
                return res.redirect('/user/login');
            }

            // Authentication successful, log in the user
            req.logIn(user, (err) => {
                if (err) {
                    console.error(err);
                    return next(err);
                }

                // Log user object before redirect
                console.log('Logged in user:', user);

                // // Redirect based on user role
                // const redirectPath = determineDashboardRedirect(user.role);
                console.log('Logged in user role:', user.role);

                // If the user is a student, call getDashboard function from studentController
                if (user.role === 'student') {
                    studentController.getDashboard(req, res); // Pass req and res to getDashboard
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

    // Function for handling logout
    logout: (req, res) => {
        req.logout();
        res.redirect('/user/login');
    },

    // Other authentication-related functions...

};

// // Helper function to determine the dashboard redirect based on user role
// function determineDashboardRedirect(role) {
//     switch (role) {
//         case 'admin':
//             return '/admins';
//         case 'mentor':
//             return '/mentors';
//         case 'student':
//             return '/students';
//         default:
//             console.error('Unknown user role:', role);
//             return '/user/login'; // Redirect to login page or handle as needed
//     }

// }

module.exports = authController;
