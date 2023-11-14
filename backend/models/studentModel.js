const studentsDB = require('../schemas/student-schema');

const studentModel = {
  insert: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        studentsDB.insert(data, (err, newDoc) => {
          if (err) {
            reject(err);
          } else {
            resolve(newDoc);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  findByTitle: (title) => {
    return new Promise((resolve, reject) => {
      studentsDB.findOne({ 'opportunities.title': title }, (err, doc) => {
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
      studentsDB.find({}, (err, docs) => {
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
      studentsDB.findOne({ _id: id }, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      studentsDB.findOne({ email: email }, (err, doc) => {
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
      studentsDB.update({ _id: id }, { $set: updatedData }, {}, (err, numReplaced) => {
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
        const opportunityId = data._id;

        studentsDB.remove({ 'opportunities._id': opportunityId }, {}, (err, numRemoved) => {
          if (err) {
            reject(err);
          } else {
            resolve(`Removed ${numRemoved} record(s) with ID ${opportunityId}`);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = studentModel;
