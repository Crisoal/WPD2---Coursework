const adminModel = require('../models/adminModel');

// Define the admin controller.
const adminController = {
 // Function to get the admin dashboard.
 getDashboard: (req, res) => {
   adminModel.getAll((err, admins) => {
     if (err) {
       res.status(500).send(err);
     } else {
       res.render('adminDashboard', { admins: admins });
     }
   });
 },

 // Function to get the student's records.
 getStudentRecords: (req, res) => {
   adminModel.getAll((err, admins) => {
     if (err) {
       res.status(500).send(err);
     } else {
       res.render('viewStudentRecords', { admins: admins });
     }
   });
 },

 // Function to add a new student record.
 addStudentRecord: (req, res) => {
   const newStudent = req.body;
   adminModel.add(newStudent, (err, admin) => {
     if (err) {
       res.status(500).send(err);
     } else {
       res.redirect('/admins/dashboard');
     }
   });
 },

 // Function to modify a student record.
 modifyStudentRecord: (req, res) => {
   const id = req.params.id;
   const updatedStudent = req.body;
   adminModel.update(id, updatedStudent, (err, admin) => {
     if (err) {
       res.status(500).send(err);
     } else {
       res.redirect('/admins/dashboard');
     }
   });
 },

 // Function to delete a student record.
 deleteStudentRecord: (req, res) => {
   const id = req.params.id;
   adminModel.delete(id, (err) => {
     if (err) {
       res.status(500).send(err);
     } else {
       res.redirect('/admins/dashboard');
     }
   });
 },

 // Function to get the mentors.
 getMentors: (req, res) => {
   adminModel.getAll((err, admins) => {
     if (err) {
       res.status(500).send(err);
     } else {
       res.render('manageMentors', { admins: admins });
     }
   });
 },

 // Function to add a new mentor.
 addMentor: (req, res) => {
   const newMentor = req.body;
   adminModel.add(newMentor, (err, admin) => {
     if (err) {
       res.status(500).send(err);
     } else {
       res.redirect('/admins/dashboard');
     }
   });
 },

 // Function to delete a mentor.
 deleteMentor: (req, res) => {
   const id = req.params.id;
   adminModel.delete(id, (err) => {
     if (err) {
       res.status(500).send(err);
     } else {
       res.redirect('/admins/dashboard');
     }
   });
 },

 // Function to get the coaching opportunities.
 getOpportunities: (req, res) => {
   adminModel.getAll((err, admins) => {
     if (err) {
       res.status(500).send(err);
     } else {
       res.render('manageOpportunities', { admins: admins });
     }
   });
 },

 // Function to add a new coaching opportunity.
addOpportunity: (req, res) => {
    const newOpportunity = req.body;
    adminModel.add(newOpportunity, (err, admin) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.redirect('/admins/dashboard');
      }
    });
  },
  
  // Function to delete a coaching opportunity.
  deleteOpportunity: (req, res) => {
    const id = req.params.id;
    adminModel.delete(id, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.redirect('/admins/dashboard');
      }
    });
  }
  };
  
  module.exports = adminController;
  