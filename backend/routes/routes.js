const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const mentorController = require('../controllers/mentorController');
const authController = require('../controllers/authController');

router.get('/login', (req, res) => res.render('login'));

router.post('/login', authController.login);

router.get('/register-student', (req, res) => res.render('registerStudent'));
router.post('/student-register', authController.registerStudent);

router.get('/register-mentor', (req, res) => res.render('registerMentor'));
router.post('/mentor-register', authController.registerMentor);

router.get('/dashboard', isAuthenticated, (req, res) => {
    switch (req.user.role) {
        case 'student':
            return res.render('studentDashboard', { user: req.user });
        case 'mentor':
            return res.render('mentorDashboard', { user: req.user });
        case 'admin':
            return res.render('adminDashboard', { user: req.user });
        default:
            return res.redirect('/login');
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

// Handle 404 - Not Found
router.use((req, res, next) => {
    res.status(404).render('error', { message: 'Page not found.' });
});

// Handle 500 - Internal Server Error
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { message: 'Internal Server Error.' });
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
