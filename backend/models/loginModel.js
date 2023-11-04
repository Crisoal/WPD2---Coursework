// models/loginModel.js

const nedb = require('nedb');

class loginModel {
  constructor() {
    this.db = new nedb({ filename: 'C:/Users/User/OneDrive/Desktop/WPD2 - Coursework/backend/db/users.db', autoload: true });
  }

  // Method to find a user by email
  async findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      this.db.findOne({ email }, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  }

  // Method to update user information
  async updateUser(user) {
    return new Promise((resolve, reject) => {
      this.db.update({ _id: user._id }, user, {}, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  }
}

module.exports = new loginModel();
