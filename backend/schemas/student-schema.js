const Datastore = require('nedb');

// Create a new instance of the datastore
const studentsDB = new Datastore({ filename: 'C:/xampp/htdocs/WDT Coursework/WPD2---Coursework/backend/db/students.db', autoload: true });

// Define the schema for the students collection
const studentSchema = {
  _id: String,
  username: String,
  email: String,
  password: String,
  role: String,
  opportunities: [
    {
      title: String,
      description: String,
      date: Date,
      time: String,
      _id: String,
    }
  ]
};

// Attach the schema to the students datastore
studentsDB.ensureIndex({ fieldName: '_id', unique: true });
studentsDB.ensureIndex({ fieldName: 'email', unique: true });
studentsDB.ensureIndex({ fieldName: 'username', unique: true });

// Use the schema to validate documents when inserting/updating
studentsDB.on('beforeInsert', (doc) => {
  // Validate the document against the schema before insertion
  const validationResult = studentsDB.validator.validate(doc, studentSchema);
  if (validationResult.errors.length > 0) {
    const errorMessages = validationResult.errors.map((error) => error.message);
    throw new Error(`Document validation failed: ${errorMessages.join(', ')}`);
  }
});

module.exports = studentsDB;
