const Datastore = require('nedb');

// Initialize the database.
const db = new Datastore({ filename: 'db/mentors.db', autoload: true, lock: true});

// Define the mentor model.
const mentorModel = {
    // Function to get all mentors.
    getAll: (callback) => {
        db.find({}, callback);
    },

    // Function to get a mentor by ID.
    getById: (id, callback) => {
        db.findOne({ _id: id }, callback);
    },

    // Function to add a new mentor.
    add: (mentor, callback) => {
        db.insert(mentor, callback);
    },

    // Function to update a mentor.
    update: (id, mentor, callback) => {
        db.update({ _id: id }, mentor, { multi: false }, callback);
    },

    // Function to delete a mentor.
    delete: (id, callback) => {
        db.remove({ _id: id }, {}, callback);
    }
};

module.exports = mentorModel;
