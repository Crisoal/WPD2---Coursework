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
    
     // Function to get all mentors.
     getAllMentors: (callback) => {
        adminDB.find({ role: 'mentor' }, callback);
    },

    // Function to add a new mentor.
    addMentor: (mentorData, callback) => {
        validateAndInsert('mentors', mentorData)
            .then(newMentor => {
                callback(null, newMentor);
            })
            .catch(err => {
                callback(err);
            });
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

    // Function to delete an admin.
    delete: (id, callback) => {
        adminDB.remove({ _id: id }, {}, callback);
    }
};

module.exports = adminModel;
