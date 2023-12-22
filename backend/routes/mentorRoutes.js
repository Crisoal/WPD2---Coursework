const express = require('express');
const mentorController = require('../controllers/mentorController');
const router = express.Router();

// Define routes
router.get('/', mentorController.getDashboard);

// Route to the dashboard with user ID parameter
router.get('/user/:userId', (req, res) => {
    const user_id = req.params.userId;
    // Call the studentController.getDashboard function passing the user ID
    mentorController.getDashboard(user_id, res);
  });

router.get('/opportunities', mentorController.getOpportunities);

router.post('/opportunities', mentorController.addOpportunity);

router.put('/opportunities/:id', mentorController.modifyOpportunity);

router.delete('/opportunities/:id', mentorController.deleteOpportunity);

module.exports = router;
