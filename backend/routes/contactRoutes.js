const express = require('express');
const { body } = require('express-validator');
const { handleContactFormSubmission } = require('../controllers/contactController');

const router = express.Router();

router.get('/', (req, res) => {
  // Render the contact.html file using express.static middleware
  res.sendFile('contact.html', { root: 'public/html' });
});

const validateContactForm = [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('message').trim().isLength({ min: 1 }).withMessage('Message is required'),
];

router.post('/message', validateContactForm, handleContactFormSubmission);

module.exports = router;
