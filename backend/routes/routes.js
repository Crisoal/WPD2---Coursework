const studentController = require('../controllers/studentController');
const mentorController = require('../controllers/mentorController');

module.exports = (app, passport) => {
    app.get('/login', (req, res) => res.render('login'));

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/student/register', (req, res) => res.render('student-registration'));
    app.post('/student/register', studentController.register);

    app.get('/mentor/register', (req, res) => res.render('mentor-registration'));
    app.post('/mentor/register', mentorController.register);

    app.get('/dashboard', isAuthenticated, (req, res) => {
        switch (req.user.role) {
            case 'student':
                return res.render('student-dashboard', { user: req.user });
            case 'mentor':
                return res.render('mentor-dashboard', { user: req.user });
            case 'admin':
                return res.render('admin-dashboard', { user: req.user });
            default:
                return res.redirect('/login');
        }
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/login');
    });

    // Handle 404 - Not Found
    app.use((req, res, next) => {
        res.status(404).render('error', { message: 'Page not found.' });
    });

    // Handle 500 - Internal Server Error
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).render('error', { message: 'Internal Server Error.' });
    });
};

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
