const { studentsDB, validateAndInsert } = require('../schemas/student-schema');

const studentModel = {
  insert: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Use the validation function to validate and insert data
        const result = await validateAndInsert(data);
        resolve(result);
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

  findByUserId: (user_id) => {
    return new Promise((resolve, reject) => {
      studentsDB.findOne({ user_id: user_id }, (err, doc) => {
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

  // updateStudent: async (id, updatedData) => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const numReplaced = await studentsDB.update({ _id: id }, { $set: updatedData }, {});
  //       // After the update, reload the database to ensure the changes are visible
  //       studentsDB.loadDatabase();
  //       resolve(numReplaced);
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // },
  updateStudent: async (studentId, updatedFields) => {
    try {
      const updatedStudent = await new Promise((resolve, reject) => {
        studentsDB.update({ _id: studentId }, { $set: updatedFields }, {}, (err, numAffected) => {
          if (err) {
            reject(err);
          } else {
            if (numAffected > 0) {
              studentsDB.findOne({ _id: studentId }, (err, student) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(student);
                }
              });
            } else {
              reject(new Error('No student found with the given ID.'));
            }
          }
        });
      });

      return updatedStudent; // Return the updated student data
    } catch (error) {
      throw new Error(`Error updating student: ${error.message}`);
    }
  },
  updateById: (id, updatedData) => {
    return new Promise((resolve, reject) => {
      studentsDB.update({ _id: id }, { $set: updatedData }, {}, (err, numReplaced) => {
        if (err) {
          reject(err);
        } else {
           // After the update, reload the database to ensure the changes are visible
           studentsDB.loadDatabase();
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
