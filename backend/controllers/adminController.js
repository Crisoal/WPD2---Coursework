const adminModel = require('../models/adminModel');
const passport = require('passport');
const authController = require('../controllers/authController');



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
    adminModel.getAllStudents((err, students) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.render('manageStudents', { students: students }); // Pass students data to the view
      }
    });
  },



  addStudentRecord: async (req, res, next) => {
    passport.authenticate('local-student', async (err, user, info) => {
        if (err || !user) {
            return res.status(401).send('Authentication failed');
        }

        req.logIn(user, async (err) => {
            if (err) {
                return next(err);
            }

            try {
                
                return res.redirect('/admin/students');
            } catch (error) {
                console.error('Error processing student:', error);
                return res.status(500).send('Failed to process student');
            }
        });
    })(req, res, next);
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
  const id = req.params.user_id; // Use 'id' instead of 'user_id'
  console.log(id);
  adminModel.delete(id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.redirect('/admin/students');
    }
  });
},


  // Function to get the mentors.
  getMentors: (req, res) => {
    adminModel.getAllMentors((err, admins) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.render('manageMentors', { mentors: mentors });
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

  // // // Function to get the coaching opportunities.
  // // getOpportunities: (req, res) => {
  // //   opportunityModel.getAllOpportunities((err, admins) => {
  // //     if (err) {
  // //       res.status(500).send(err);
  // //     } else {
  // //       res.render('manageOpportunities', { oportunities: opportunities });
  // //     }
  // //   });
  // // },

  // // Function to add a new coaching opportunity.
  // addOpportunity: (req, res) => {
  //   const newOpportunity = req.body;
  //   adminModel.add(newOpportunity, (err, admin) => {
  //     if (err) {
  //       res.status(500).send(err);
  //     } else {
  //       res.redirect('/admins/dashboard');
  //     }
  //   });
  // },

  // // Function to delete a coaching opportunity.
  // deleteOpportunity: (req, res) => {
  //   const id = req.params.id;
  //   adminModel.delete(id, (err) => {
  //     if (err) {
  //       res.status(500).send(err);
  //     } else {
  //       res.redirect('/admins/dashboard');
  //     }
  //   });
  // }
};

module.exports = adminController;
