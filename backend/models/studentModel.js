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

    remove: (data) => {
        return new Promise(async (resolve, reject) => {
          try {
            // Extract the opportunity ID from the data object.
            const opportunityId = data._id;
      
            // Check if a record with the given ID exists in the database.
            const existingRecord = await db.findOne({ _id: opportunityId }); // Corrected this line
      
            if (existingRecord) {
              // Use `db.remove` to remove the existing record.
              db.remove({ _id: opportunityId }, {}, (err, numRemoved) => { // Corrected this line
                if (err) {
                  reject(err);
                } else {
                  resolve(`Removed ${numRemoved} record(s) with ID ${opportunityId}`);
                }
              });
            } else {
              reject('Record with the specified ID does not exist.');
            }
          } catch (error) {
            reject(error);
          }
        });
      }
      
    
    
};

module.exports = studentModel;
