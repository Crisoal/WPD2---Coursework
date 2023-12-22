const express = require('express');
const opportunityController = require('../controllers/opportunityController');
const studentController = require('../controllers/studentController');
const studentModel = require('../models/studentModel');
const router = express.Router();


// Use the built-in body-parser middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Define routes
router.get('/', opportunityController.getOpportunities);

// Route to the dashboard with user ID parameter
router.get('/user/:userId', (req, res) => {
  const user_id = req.params.userId;
  // Call the studentController.getDashboard function passing the user ID
  studentController.getDashboard(user_id, res);
});

router.get('/user/:user_id/addOpportunity/:id', studentController.addOpportunity);

router.get('/user/:user_id/viewOpportunity', studentController.viewOpportunities);

router.get('/user/:user_id/opportunityDetails/:id', studentController.opportunityDetails);

// Route to save modified opportunity
router.post('/user/:user_id/opportunityDetails/:id', studentController.updateOpportunity);


router.post('/:user_id/removeOpportunity/:id', studentController.removeOpportunity);

router.get('/user/:user_id/profile', studentController.viewProfile);


router.post('/:user_id/setGoals', async (req, res) => {
  try {
    const { user_id } = req.params;
    const { goalInput, startDate, endDate, goalDescription } = req.body;

    // Do validation checks here if needed

    // Update student data with the new goal
    const studentData = await studentModel.findByUserId(user_id);

    if (!studentData) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    // Check if studentData.goals exists or initialize it as an empty array
    if (!studentData.goals) {
      studentData.goals = []; // Initialize as an empty array if not present
    }

    // Create a new goal object
    const newGoal = {
      goal: goalInput,
      startDate,
      endDate,
      description: goalDescription,
    };

    // Add the new goal to the student's goals array
    studentData.goals.push(newGoal);

    // Save the updated student data to the database
    await studentModel.updateStudent(studentData._id, { goals: studentData.goals });

    // Send a success response
    res.redirect(`/students/user/${user_id}/profile`);

  } catch (error) {
    console.error('Error setting goal:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// router.get('/user/:user_id/find-mentor', studentController.viewMentor);

module.exports = router;
