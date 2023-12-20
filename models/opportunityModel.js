const Datastore = require('nedb');
const db = new Datastore({ filename: 'C:/xampp/htdocs/WDT Coursework/WPD2---Coursework/backend/db/opportunities.db', autoload: true });


const opportunityModel = {
    find: (query) => {
        return new Promise((resolve, reject) => {
            db.find(query, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    },

    findOne: (query) => {
        return new Promise((resolve, reject) => {
            db.findOne(query, (err, doc) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        });
    },

    create: (data) => {
        return new Promise((resolve, reject) => {
            db.create(data, (err, newOpportunity) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(newOpportunity);
                }
            });
        });
    },

    findByIdAndUpdate: (id, updateData) => {
        return new Promise((resolve, reject) => {
            db.update(
                { _id: id }, 
                { $set: updateData },
                { new: true }, // Add this line
                (err, updatedDoc) => {
                    if (err) {
                      reject(err);
                    } else {
                      db.loadDatabase();
                      resolve(updatedDoc);
                    }
                }
            );
        });
     },
     
     

    findByIdAndRemove: async function(id) {
        try {
            await db.remove({ _id: id }, {});
        } catch (err) {
            console.log(err);
        }
    }
};

module.exports = opportunityModel;
