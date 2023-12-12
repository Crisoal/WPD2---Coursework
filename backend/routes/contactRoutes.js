const express = require('express');
const path = require('path');
const router = express.Router();
const contactController = require('../controllers/contactController'); // Import the contactController module

// Define the route for /contact
router.get('/', (req, res) => {
 // Get the absolute path to the contact.html file within the html folder
 const filePath = path.join(__dirname, '../public/html/contact.html');
 
 // Send the contact.html file as the response
 res.sendFile(filePath);
});

// Define the route for /contact/message
router.post('/message', contactController.handleContactFormSubmission); // Use the handleContactFormSubmission method as the route handler

module.exports = router;
