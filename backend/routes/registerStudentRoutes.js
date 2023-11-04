const express = require('express');
const router = express.Router();
const registerStudentController = require('../controllers/registerStudentController');

// Use the built-in body-parser middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// GET request to display the registration form
router.get('/', (req, res) => {
  res.render('registerStudent');
});

// POST request to register a new student
router.post('/student', registerStudentController.registerStudent);

router.get('/student/confirm-email', registerStudentController.confirmEmail);

module.exports = router;
