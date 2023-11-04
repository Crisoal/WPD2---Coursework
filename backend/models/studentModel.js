const Datastore = require('nedb');
const db = new Datastore({ filename: 'C:/WPD2 - Coursework/backend/db/students.db', autoload: true });

const studentModel = {
    insert: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Check if an opportunity with the same title already exists in the database.
                const existingOpportunity = await studentModel.findByTitle(data.title);

                if (existingOpportunity) {
                    reject('Opportunity with the same title already exists.');
                } else {
                    db.insert(data, (err, newDoc) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(newDoc);
                        }
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    },

    // Add a method to find an opportunity by its title
    findByTitle: (title) => {
        return new Promise((resolve, reject) => {
            db.findOne({ title: title }, (err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    },

    findAll: () => {
        return new Promise((resolve, reject) => {
            db.find({}, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.findOne({ _id: id }, (err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    },

    updateById: (id, updatedData) => {
        return new Promise((resolve, reject) => {
            db.update({ _id: id }, { $set: updatedData }, {}, (err, numReplaced) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(numReplaced);
                }
            });
        });
    },

    deleteOpportunity: (id) => {
        return new Promise((resolve, reject) => {
            studentModel.deleteById(id, (err, numRemoved) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(numRemoved);
                }
            });
        });
    }

};

module.exports = studentModel;
