const Datastore = require('nedb');

// Initialize the database.
const db = new Datastore({ filename: '../db/mentors.db', autoload: true, lock: true });

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
    },

    // Function to add a coaching opportunity for a mentor.
    addOpportunity: (mentorId, opportunity, callback) => {
        db.update(
            { _id: mentorId },
            { $push: { opportunities: opportunity } },
            { multi: false },
            callback
        );
    },

    // Function to update a coaching opportunity for a mentor.
    updateOpportunity: (mentorId, opportunityId, updatedOpportunity, callback) => {
        db.update(
            { _id: mentorId, 'opportunities._id': opportunityId },
            { $set: { 'opportunities.$': updatedOpportunity } },
            { multi: false },
            callback
        );
    },

    // Function to delete a coaching opportunity for a mentor.
    deleteOpportunity: (mentorId, opportunityId, callback) => {
        db.update(
            { _id: mentorId },
            { $pull: { opportunities: { _id: opportunityId } } },
            { multi: false },
            callback
        );
    },
};

module.exports = mentorModel;
