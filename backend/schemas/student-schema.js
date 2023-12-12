const Datastore = require('nedb');
const Joi = require('joi');

// Create a new instance of the datastore
const studentsDB = new Datastore({ filename: 'C:/xampp/htdocs/WDT Coursework/WPD2---Coursework/backend/db/students.db', autoload: true });

// Define the opportunity schema using Joi
const opportunitySchema = Joi.object({
  _id: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  date: Joi.date(),
  time: Joi.string(),
});

// Define the schema for the students collection using Joi
const studentSchema = Joi.object({
  _id: Joi.string(),
  user_id: Joi.string(),
  role: Joi.string(),
  username: Joi.string().required(),
  fullName: Joi.string().required(),
  studentId: Joi.string().required(),
  university: Joi.string().required(),
  department: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  opportunities: Joi.array().items(opportunitySchema),
});

// Attach the schema to the students datastore
studentsDB.ensureIndex({ fieldName: '_id', unique: true });
studentsDB.ensureIndex({ fieldName: 'email', unique: true });
studentsDB.ensureIndex({ fieldName: 'username', unique: true });

const validateAndInsert = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Validate the input data against the schema
      const validationResult = studentSchema.validate(data);

      if (validationResult.error) {
        reject(validationResult.error.details.map(d => d.message).join(', '));
        return;
      }

      // Insert the validated data into the database
      studentsDB.insert(validationResult.value, (err, newDoc) => {
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
};

// Export both the NeDB instance and the validation function
module.exports = { studentsDB, validateAndInsert };
