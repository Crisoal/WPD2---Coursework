const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

// Define routes
router.get('/', adminController.getDashboard);

router.get('/students', adminController.getStudentRecords);

router.post('/students', adminController.addStudentRecord);

router.put('/students/:id', adminController.modifyStudentRecord);

router.delete('/students/:id', adminController.deleteStudentRecord);

router.get('/mentors', adminController.getMentors);

router.post('/mentors', adminController.addMentor);

router.delete('/mentors/:id', adminController.deleteMentor);

router.get('/opportunities', adminController.getOpportunities);

router.post('/opportunities', adminController.addOpportunity);

router.delete('/opportunities/:id', adminController.deleteOpportunity);

module.exports = router;
