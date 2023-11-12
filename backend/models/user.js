const Datastore = require('nedb-promises');
const bcrypt = require('bcryptjs');

const db = Datastore.create('database.db');

class User {
    constructor(username, email, password, role) {
        this.username = username.trim();
        this.email = email.trim().toLowerCase(); // Normalize email
        this.password = bcrypt.hashSync(password, 10);
        this.role = role.trim().toLowerCase(); // Normalize role
    }

    validatePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

module.exports = db.model('User', User);
