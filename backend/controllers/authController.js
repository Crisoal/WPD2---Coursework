const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const studentModel = require('../models/studentModel');
const mentorModel = require('../models/mentorModel');
const adminModel = require('../models/adminModel');
const studentController = require('../controllers/studentController');

// Helper function to validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

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
            // User does not exist
            return done(null, false, { message: 'User not found.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            // Password is incorrect
            return done(null, false, { message: 'Incorrect password.' });
        }

        // Password is correct, proceed with authentication
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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword, // Store the hashed password
            role: 'student',
            fullName: req.body.fname,
            studentId: req.body.studentId,
            university: req.body.universityName,
            department: req.body.department,
        };

        const insertedUser = await User.insert(newUser);

        await studentModel.insert({
            ...newUser,
            user_id: insertedUser._id,
        });

        await adminModel.addStudent({
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
 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
 
        const newUser = {
            username: req.body.username,
            email: email,
            password: hashedPassword, // Store the hashed password
            role: 'mentor',
            fullName: req.body.fullName,
            basicInfo: {
                occupation: req.body.occupation,
                expertise: req.body.expertise,
            },
            experience:{
                years: req.body.yearsExperience,
                skills: req.body.skills.split(',') 
            },
            bio: req.body.bio,
            image: req.body.image,
        };
 
        const insertedUser = await User.insert(newUser);

        await mentorModel.insert({
            ...newUser,
            user_id: insertedUser._id,
        });

        await adminModel.addMentor({
            ...newUser,
            user_id: insertedUser._id,
        });
 
        return done(null, newUser);
    } catch (error) {
        console.error(error);
        return done(error);
    }
 }));
 

const authController = {
    // Inside the login controller:
    // Modify the login route to handle authentication for admins and mentors as well as students
    login: [
        async (req, res, next) => {
            try {
                const { usernameOrEmail, password } = req.body;

                if (!usernameOrEmail || !password) {
                    req.flash('error', 'Username/email and password are required');
                    return res.redirect('/user/login');
                }

                // Authenticate against student, admin, and mentor databases
                passport.authenticate('local', async (err, user, info) => {
                    if (err) {
                        console.error(err);
                        return next(err);
                    }

                    if (!user) {
                        // User not found or incorrect password
                        req.flash('error', 'Incorrect username/email or password.');
                        return res.redirect('/user/login');
                    }

                    req.logIn(user, async (err) => {
                        if (err) {
                            console.error(err);
                            return next(err);
                        }

                        console.log('Logged in user role:', user.role);

                        if (user.role === 'student') {
                            const userId = req.user._id; // Assuming req.user._id contains the user ID
                            res.redirect(`/students/user/${userId}`);
                        } else if (user.role === 'admin') {
                            // Redirect admins to their dashboard or appropriate section
                            // You might have an adminController to handle admin dashboard or actions
                            res.redirect('/admin');
                        } else if (user.role === 'mentor') {
                            // Redirect mentors to their dashboard or appropriate section
                            // You might have a mentorController to handle mentor dashboard or actions
                            const userId = req.user._id; 
                            res.redirect(`/mentors/user/${userId}`);
                        } else {
                            req.flash('error', 'Unauthorized role');
                            return res.redirect('/user/login');
                        }
                    });
                })(req, res, next);
            } catch (error) {
                console.error(error);
                // Handle the error appropriately
                // Redirect or show an error page
            }
        }
    ],

    registerStudent: [
        async (req, res, next) => {
            try {
                const { fname, username, studentId, email, password, confirmPassword } = req.body;
                const errors = [];


                // Check if username already exists
                const existingUser = await User.findByUsernameOrEmail(username);
                if (existingUser) {
                    errors.push('Username already exists');
                }

                // Check if email already exists
                const existingEmailUser = await User.findByUsernameOrEmail(email);
                if (existingEmailUser) {
                    errors.push('Email already exists. <a href="/user/login">Log in</a>');
                }

                // Perform your own validation checks
                if (!fname) {
                    errors.push('Full name is required');
                }
                if (!username) {
                    errors.push('Username is required');
                }
                if (!studentId) {
                    errors.push('Student ID is required');
                }
                if (!email || !isValidEmail(email)) {
                    errors.push('Invalid email');
                }
                if (password.length < 8) {
                    errors.push('Password must contain at least 8 characters');
                }
                if (!password.match(/[A-Z]/)) {
                    errors.push('Password must contain at least an uppercase letter');
                }
                if (!password.match(/[a-z]/)) {
                    errors.push('Password must contain at least a lowercase letter');
                }
                if (!password.match(/\d/)) {
                    errors.push('Password must contain at least a number');
                }
                if (!password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
                    errors.push('Password must contain at least a special character');
                }
                if (password !== confirmPassword) {
                    errors.push('Passwords do not match');
                }

                if (errors.length > 0) {
                    // Store errors in req.flash or another storage mechanism
                    req.flash('error', errors);
                    return res.redirect('/user/register-student');
                }

                // If validation passes, proceed with passport authentication
                passport.authenticate('local-student', {
                    successRedirect: '/user/login',
                    failureRedirect: '/user/register-student',
                    failureFlash: true
                })(req, res, next);
            } catch (error) {
                console.error(error);
                // Handle the error appropriately
                // Redirect or show an error page
            }
        }
    ],

    registerMentor: [
        async (req, res, next) => {
            try {
                const { fullName, username, email, occupation, expertise, yearsExperience, skills, bio, password, confirmPassword } = req.body;
                const errors = [];
      
                // Check if username already exists
                const existingUser = await User.findByUsernameOrEmail(username);
                if (existingUser) {
                    errors.push('Username already exists');
                }
      
                // Check if email already exists
                const existingEmailUser = await User.findByUsernameOrEmail(email);
                if (existingEmailUser) {
                    errors.push('Email already exists. <a href="/user/login">Log in</a>');
                }
      
                // Perform your own validation checks
                if (!fullName) {
                    errors.push('Full name is required');
                }
                if (!username) {
                    errors.push('Username is required');
                }
                if (!email || !isValidEmail(email)) {
                    errors.push('Invalid email');
                }
                if (password.length < 8) {
                    errors.push('Password must contain at least 8 characters');
                }
                if (!password.match(/[A-Z]/)) {
                    errors.push('Password must contain at least an uppercase letter');
                }
                if (!password.match(/[a-z]/)) {
                    errors.push('Password must contain at least a lowercase letter');
                }
                if (!password.match(/\d/)) {
                    errors.push('Password must contain at least a number');
                }
                if (!password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
                    errors.push('Password must contain at least a special character');
                }
                if (password !== confirmPassword) {
                    errors.push('Passwords do not match');
                }
      
                if (errors.length > 0) {
                    // Store errors in req.flash or another storage mechanism
                    req.flash('error', errors);
                    return res.redirect('/user/login');
                }
      
                // If validation passes, proceed with passport authentication
                passport.authenticate('local-mentor', {
                    successRedirect: '/user/login',
                    failureRedirect: '/user/register-mentor',
                    failureFlash: true
                })(req, res, next);
            } catch (error) {
                console.error(error);
                // Handle the error appropriately
                // Redirect or show an error page
            }
        }
      ],
      
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
