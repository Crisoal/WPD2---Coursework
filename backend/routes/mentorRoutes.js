const express = require('express');
const mentorController = require('../controllers/mentorController');
const router = express.Router();

// Define routes
router.get('/', mentorController.getDashboard);

router.get('/opportunities', mentorController.getOpportunities);

router.post('/opportunities', mentorController.addOpportunity);

router.put('/opportunities/:id', mentorController.modifyOpportunity);

router.delete('/opportunities/:id', mentorController.deleteOpportunity);

module.exports = router;
