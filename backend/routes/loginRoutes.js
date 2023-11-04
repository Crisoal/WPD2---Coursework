const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// GET request to display the registration form
router.get('/', (req, res) => {
  res.render('login');
});

// POST request to register a new student
router.post('/user', loginController.login);

module.exports = router;
