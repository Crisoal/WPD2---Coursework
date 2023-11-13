// ../models/user.js
const Datastore = require('nedb');
const path = require('path');

const dbPath = path.resolve(__dirname, '../db/users.db');

const db = new Datastore({ filename: dbPath, autoload: true });

const User = {
  findOne: function (query) {
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
  findByEmail: function (email) {
    return new Promise((resolve, reject) => {
      db.findOne({ email: email }, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  },
  insert: function (user) {
    return new Promise((resolve, reject) => {
      db.insert(user, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  },
  // Add other methods as needed
};

module.exports = User;
