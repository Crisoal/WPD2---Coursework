const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
   done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
   try {
       const user = await User.findByEmail(email);
       
       if (!user) {
           console.log('User not found with email:', email);
           return done(null, false);
       }

       console.log('Found user:', user);
       done(null, user);
   } catch (err) {
       console.error('Deserialization error:', err);
       done(err, null);
   }
});

passport.use('local', new LocalStrategy({
   usernameField: 'email',
   passwordField: 'password',
   passReqToCallback: true,
}, async (req, email, password, done) => {
   try {
       const user = await User.findByEmail(email);

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

       await User.insert(newUser);

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

       return done(null, newUser);
   } catch (error) {
       console.error(error);
       return done(error);
   }
}));

const authController = {
    login: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: determineDashboardRedirect(req.user.role),
            failureRedirect: '/user/login',
            failureFlash: true
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
 
 // Helper function to determine the dashboard redirect based on user role
 function determineDashboardRedirect(role) {
     switch (role) {
         case 'admin':
             return '/admins';
         case 'mentor':
             return '/mentors';
         case 'student':
             return '/students';
         default:
            console.error('Unknown user role:', role);
            return res.redirect('/user/login'); // Redirect to login page or handle as needed
     }
 };

module.exports = authController;
