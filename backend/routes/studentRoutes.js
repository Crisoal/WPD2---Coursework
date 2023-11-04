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


// Define a route to add an opportunity to the students' database.
router.get('/addOpportunity/:id', studentController.addOpportunity);

router.get('/viewOpportunity', studentController.viewOpportunities);

router.get('/opportunityDetails/:id', studentController.opportunityDetails);

// Route to save modified opportunity
router.post('/opportunityDetails/:id/updateOpportunity/:id', studentController.updateOpportunity);

router.delete('/viewOpportunity/removeOpportunity/:id', studentController.removeOpportunity);


// // Route to render the modification form for opportunities
// router.get('/modifyOpportunity/:id', studentController.renderModifyOpportunity);

// // Route to delete an opportunity
// router.get('/deleteOpportunity/:id', studentController.deleteOpportunity);

module.exports = router;
