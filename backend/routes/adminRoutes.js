const express = require('express');
const adminController = require('../controllers/adminController');
const studentsController = require('../controllers/studentController');
const mentorsController = require('../controllers/mentorController');
const opportunitiesController = require('../controllers/opportunityController');

const router = express.Router();

// Define routes
router.get('/', adminController.getDashboard);

// Students routes

router.get('/students', adminController.getStudentRecords);

router.get('/students/add', (req, res) => {
    res.render('addStudent'); 
});

router.post('/students/added', adminController.addStudentRecord);


router.put('/students/:id', adminController.modifyStudentRecord);

router.delete('/students/:id', adminController.deleteStudentRecord);

// Mentors routes

router.get('/mentors', adminController.getMentors);

router.get('/mentors/add', (req, res) => {
    res.render('addMentor'); 
});

router.post('/mentors/added', adminController.addMentor);

router.delete('/mentors/:id', adminController.deleteMentor);

// Opportunities routes

router.get('/opportunities', adminController.getOpportunities);

router.post('/opportunities/add', adminController.addOpportunity);

router.delete('/opportunities/:id', adminController.deleteOpportunity);



// // Students routes
// router.get('/admin/students', studentsController.getAllStudents);
// router.post('/admin/students/add', studentsController.addStudent);
// router.put('/admin/students/:id', studentsController.updateStudent);
// router.delete('/admin/students/:id', studentsController.deleteStudent);

// // Mentors routes
// router.get('/admin/mentors', mentorsController.getAllMentors);
// router.post('/admin/mentors/add', mentorsController.addMentor);
// router.put('/admin/mentors/:id', mentorsController.updateMentor);
// router.delete('/admin/mentors/:id', mentorsController.deleteMentor);

// // Opportunities routes
// router.get('/admin/opportunities', opportunitiesController.getAllOpportunities);
// router.post('/admin/opportunities/add', opportunitiesController.addOpportunity);
// router.put('/admin/opportunities/:id', opportunitiesController.updateOpportunity);
// router.delete('/admin/opportunities/:id', opportunitiesController.deleteOpportunity);

module.exports = router;
