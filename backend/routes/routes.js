const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authController = require('../controllers/authController');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

router.get('/login', (req, res) => {
    res.render('login', { error: req.flash('error') });
});

router.post('/login', authController.login);

router.get('/register-student', (req, res) => {
    res.render('registerStudent', { error: req.flash('error') });
});

router.post('/student-register', authController.registerStudent);

router.get('/register-mentor', (req, res) => res.render('registerMentor'));
router.post('/mentor-register', authController.registerMentor);


router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/user/login');
    });
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



// Add a Forgot Password route
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Find the user by email
        const user = await User.findByEmail(email);

        if (!user) {
            // Handle case where email is not found in the database
            return res.status(404).json({ message: 'Email not found' });
        }

        // Generate reset token and set expiry time (1 hour)
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        // Save the user with the reset token and expiry time
        await user.save();

        // Send reset password email
        const transporter = nodemailer.createTransport({
            // Set up your email service configuration here
            // Example using Gmail:
            service: 'Gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-password'
            }
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: user.email,
            subject: 'Password Reset',
            text:
                `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                `http://${req.headers.host}/reset/${resetToken}\n\n` +
                `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                // Handle email sending failure
                return res.status(500).json({ message: 'Failed to send reset email' });
            }
            console.log('Reset email sent: ' + info.response);
            return res.status(200).json({ message: 'Reset email sent successfully' });
        });
    } catch (error) {
        console.error(error);
        // Handle any other errors
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to handle password reset with token verification
router.get('/reset/:token', async (req, res) => {
    try {
        const { token } = req.params;

        // Find the user by the reset token and check expiry time
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            // Handle case where token is invalid or expired
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Render a password reset form
        // Example: res.render('resetPassword', { token });

        // Alternatively, you can send a JSON response and handle the password reset UI on the client-side
        return res.status(200).json({ message: 'Valid token' });
    } catch (error) {
        console.error(error);
        // Handle any other errors
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to handle updating the password after reset
router.post('/reset/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Find the user by the reset token and check expiry time
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            // Handle case where token is invalid or expired
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Reset token and expiry time
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        // Update password and save the user
        user.password = password;
        await user.save();

        // Password reset successful
        return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        // Handle any other errors
        return res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
