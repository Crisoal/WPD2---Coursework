const express = require('express');
const opportunityController = require('../controllers/opportunityController');
const studentController = require('../controllers/studentController');
const router = express.Router();


// Use the built-in body-parser middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Define routes
router.get('/', opportunityController.getOpportunities);

// // Route to view opportunities
// router.get('/myOpportunities', studentController.viewOpportunities);


router.get('/user/:user_id/addOpportunity/:id', studentController.addOpportunity);

// router.post('/user/:user_id/schedule', studentController.scheduleOpportunity);

router.get('/user/:user_id/viewOpportunity', studentController.viewOpportunities);

router.get('/opportunityDetails/:id', studentController.opportunityDetails);

// Route to save modified opportunity
router.put('/opportunityDetails/:id/*', studentController.updateOpportunity);

router.post('/opportunityDetails/:id/*', studentController.updateOpportunity);

//router.delete('/viewOpportunity/removeOpportunity/:id', studentController.removeOpportunity);

router.post('/viewOpportunity/removeOpportunity/:id', studentController.removeOpportunity);


module.exports = router;
