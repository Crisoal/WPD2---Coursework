const Datastore = require('nedb');

// Initialize the database.
const db = new Datastore({ filename: 'db/admins.db', autoload: true, lock: true });

// Define the admin model.
const adminModel = {
    // Function to get all admins.
    getAll: (callback) => {
        db.find({}, callback);
    },

    // Function to get an admin by ID.
    getById: (id, callback) => {
        db.findOne({ _id: id }, callback);
    },

    // Function to add a new admin.
    add: (admin, callback) => {
        db.insert(admin, callback);
    },

    // Function to update an admin.
    update: (id, admin, callback) => {
        db.update({ _id: id }, admin, { multi: false }, callback);
    },

    // Function to delete an admin.
    delete: (id, callback) => {
        db.remove({ _id: id }, {}, callback);
    }
};

module.exports = adminModel;
