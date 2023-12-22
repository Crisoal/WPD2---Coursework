const { adminDB, validateAndInsert } = require('../schemas/admin-schema');



// Define the admin model.
const adminModel = {
    // Function to get dashboard.
    getAll: (callback) => {
        adminDB.find({}, callback);
    },

    // Function to get all students.
    getAllStudents: (callback) => {
        adminDB.find({ role: 'student' }, callback);
    },

    findById: (id, callback) => {
        adminDB.find({ _id: id }, callback);
    },

    updateById: (id, updatedData, callback) => {
        adminDB.update({ _id: id }, { $set: updatedData }, {}, callback);
    },

    // Function to get a user by ID
 getUserById:(userId, callback) => {
    adminDB.findOne({ _id: userId }, (err, doc) => {
     if (err) {
       callback(err, null);
     } else {
       callback(null, doc);
     }
    });
   },
   
   // Function to update a user
   updateStudent: (query, update, callback) => {
    adminDB.update(query, update, {}, (err, numReplaced) => {
     if (err) {
       callback(err, null);
     } else {
       callback(null, numReplaced);
     }
    });
   },

  // model.js

// // Function to update a student record
// updateStudent: (userId, updatedData, callback) => {
//     adminDB.update({ user_id: userId }, { $set: updatedData }, {}, (err, numReplaced) => {
//       if (err) {
//         callback(err);
//       } else {
//         adminDB.persistence.compactDatafile();
//         callback(null, numReplaced);
//       }
//     });
//   },

updateStudent: (userId, updatedData, callback) => {
    adminDB.update({ _id: userId }, { $set: updatedData }, {}, (err, numReplaced) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, numReplaced);
      }
    });
   },
   
   

   
    // Function to get an admin by ID.
    getById: (id, callback) => {
        adminDB.findOne({ _id: id }, callback);
    },

    addStudent: async (adminData) => {
        try {
            const newStudent = await validateAndInsert('students', adminData);
            return newStudent;
        } catch (err) {
            throw err;
        }
    },

    addMentor: async (adminData) => {
        try {
            const newMentor = await validateAndInsert('mentors', adminData);
            return newMentor;
        } catch (err) {
            throw err;
        }
    },

    // Function to get all mentors.
    getAllMentors: (callback) => {
        adminDB.find({ role: 'mentor' }, callback);
    },

    

    // Function to get all opportunities.
    getAllOpportunities: (callback) => {
        adminDB.find({}, (err, opportunities) => {
            if (err) {
                callback(err);
            } else {
                callback(null, opportunities);
            }
        });
    },

    // Function to add a new opportunity.
    addOpportunity: (opportunityData, callback) => {
        validateAndInsert('opportunities', opportunityData)
            .then(newOpportunity => {
                callback(null, newOpportunity);
            })
            .catch(err => {
                callback(err);
            });
    },

    // Function to update an admin.
    update: (id, adminData, callback) => {
        adminDB.update({ _id: id }, adminData, { multi: false }, callback);
    },
    

  // model.js
  delete: (id, callback) => {
    console.log('Deleting student with id:', id);
    adminDB.find({}, (err, docs) => {
     if (err) {
       callback(err);
     } else {
       console.log('All ids in the database:', docs.map(doc => doc._id));
       adminDB.remove({ _id: id }, {}, (err, numRemoved) => {
         console.log('Remove result:', numRemoved);
         if (err) {
           callback(err);
         } else {
           adminDB.persistence.compactDatafile();
           callback(null, numRemoved);
         }
       });
     }
    });
   },

   find: async (id) => {
    try {
     let adminData = await new Promise((resolve, reject) => {
        adminDB.find({ _id: id }, (err, doc) => {
         if (err) {
           reject(err);
         } else {
           resolve(doc[0]);
         }
       });
     });
     return adminData;
    } catch (err) {
     throw err;
    }
   },
   
   update: async (id, updatedData) => {
    try {
     let updatedAdminData = await new Promise((resolve, reject) => {
        adminDB.update({ _id: id }, updatedData, {}, (err, numReplaced) => {
         if (err) {
           reject(err);
         } else {
           resolve(numReplaced);
         }
       });
     });
     return updatedAdminData;
    } catch (err) {
     throw err;
    }
   },
   
   findMentor: async (id) => {
    try {
     let mentor = await new Promise((resolve, reject) => {
       mentors.find({ _id: id }, (err, doc) => {
         if (err) {
           reject(err);
         } else {
           resolve(doc[0]);
         }
       });
     });
     return mentor;
    } catch (err) {
     throw err;
    }
   },
   
   updateMentor: async (id, updatedData) => {
    try {
     let updatedMentor = await new Promise((resolve, reject) => {
       mentors.update({ _id: id }, updatedData, {}, (err, numReplaced) => {
         if (err) {
           reject(err);
         } else {
           resolve(numReplaced);
         }
       });
     });
     return updatedMentor;
    } catch (err) {
     throw err;
    }
   },
   
   

};

module.exports = adminModel;
