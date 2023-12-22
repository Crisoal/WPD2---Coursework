const adminModel = require('../models/adminModel');
const passport = require('passport');
const authController = require('../controllers/authController');
const { adminDB, validateAndInsert } = require('../schemas/admin-schema');


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
            return res.redirect('/admin/students');
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


// Function to handle updating a specific student's data
updateStudent: (req, res) => {
  const userId = req.params._id;
  console.log(userId);
 
  const updatedData = {
    username: req.body.username,
    fullName: req.body.fullName,
    studentId: req.body.studentId,
    university: req.body.university,
    department: req.body.department,
    email: req.body.email,
    password: req.body.password // Note: This should be handled securely (e.g., hashing)
    // Add other fields you want to update
  };
 
  console.log(updatedData);
 
  // Update the user's data in the database
  adminDB.update({ _id: userId }, { $set: updatedData }, {}, function (err, numReplaced) {
    if (err) {
      res.status(500).json({ error: 'Error updating user data', message: err.message });
    } else {
      console.log(`Number of documents replaced: ${numReplaced}`);
      res.json({ message: 'User data updated successfully' });
    }
  });
 },
 
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
    adminModel.getAllMentors((err, mentors) => {
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


  addMentorRecord: async (req, res, next) => {
    passport.authenticate('local-mentor', async (err, user, info) => {
        if (err || !user) {
            return res.redirect('/admin/mentors');
        }
 
        req.logIn(user, async (err) => {
            if (err) {
                return next(err);
            }
 
            try {
                const newMentor = {
                   role: req.body.role,
                   username: req.body.username,
                   fullName: req.body.fullName,
                   email: req.body.email,
                   password: req.body.password, // Note: This should be handled securely (e.g., hashing)
                   address: req.body.address,
                   phone: req.body.phone,
                   occupation: req.body.occupation,
                   company: req.body.company,
                   expertise: req.body.expertise,
                   linkedin: req.body.linkedin,
                   years: req.body.years,
                   skills: req.body.skills,
                   certifications: req.body.certifications,
                   bio: req.body.bio,
                   image: req.body.image,
                   availability: req.body.availability
                };
 
                await mentorDB.create(newMentor);
                return res.redirect('/admin/mentors');
            } catch (error) {
                console.error('Error processing mentor:', error);
                return res.status(500).send('Failed to process mentor');
            }
        });
    })(req, res, next);
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
