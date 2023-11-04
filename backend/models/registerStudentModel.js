const Datastore = require('nedb');

class registerStudentModel {
 constructor() {
   this.db = new Datastore({ filename: 'C:/Users/User/OneDrive/Desktop/WPD2 - Coursework/backend/db/users.db', autoload: true });
 }

 findStudentByEmail(email) {
   return new Promise((resolve, reject) => {
     this.db.findOne({ email: email }, (err, doc) => {
       if (err) {
         reject(err);
       } else {
         resolve(doc);
       }
     });
   });
 }

 findStudentByToken(token) {
   return new Promise((resolve, reject) => {
     this.db.findOne({ emailConfirmationToken: token }, (err, doc) => {
       if (err) {
         reject(err);
       } else {
         resolve(doc);
       }
     });
   });
 }

 updateStudent(id, studentData) {
  return new Promise((resolve, reject) => {
    this.db.update({ _id: id }, { $set: studentData }, {}, (err, numReplaced, updatedStudent) => {
      if (err) {
        reject(err);
      } else {
        resolve(updatedStudent);
      }
    });
  });
 }
 

 updateEmailConfirmationStatus(id) {
   return new Promise((resolve, reject) => {
     this.db.update({ _id: id }, { $set: { emailConfirmed: true } }, {}, (err, numReplaced) => {
       if (err) {
         reject(err);
       } else {
         resolve();
       }
     });
   });
 }

 createStudent(studentData) {
   return new Promise((resolve, reject) => {
     this.db.insert(studentData, (err, newDoc) => {
       if (err) {
         reject(err);
       } else {
         resolve(newDoc);
       }
     });
   });
 }
}

module.exports = new registerStudentModel();
