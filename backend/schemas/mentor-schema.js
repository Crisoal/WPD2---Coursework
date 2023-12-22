const Datastore = require('nedb');
const Joi = require('joi');

// Create a new instance of the datastore
const mentorsDB = new Datastore({ filename: 'C:/xampp/htdocs/WDT Coursework/WPD2---Coursework/backend/db/mentors.db', autoload: true });


// Define the opportunity schema using Joi
const mentorAvailabilitySchema = Joi.object({
    mentorName: Joi.string().required(),
    recurringDays: Joi.array().items(Joi.string()).required(),
    times: Joi.array().items(Joi.string()).required(),
});

const opportunitySchema = Joi.object({
    _id: Joi.string(),
    type: Joi.string().valid('opportunity').required(),
    category_id: Joi.string().required(),
    categoryName: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    mentorAvailability: Joi.array().items(mentorAvailabilitySchema).required(),
    sessionDuration: Joi.string().required(),
    image: Joi.string().required(),
    obj: Joi.array().items(Joi.string()).required(),
    duration: Joi.string().required(),
});

const mentorSchema = Joi.object({
    _id: Joi.string(),
    user_id: Joi.string(),
    role: Joi.string().valid('mentor').required(),
    username: Joi.string().required(),
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    // Additional fields specific to mentors
    basicInfo: Joi.object({
        address: Joi.string(),
        phone: Joi.string().allow(''),
        occupation: Joi.string().required(),
        company: Joi.string().allow(''),
        expertise: Joi.string().required(),
        linkedin: Joi.string().uri(),
    }),
    experience: Joi.object({
        years: Joi.number().integer().min(0),
        skills: Joi.array().items(Joi.string()).required(),
        certifications: Joi.array().items(Joi.string()),
    }),
    availability: Joi.array().items(
        Joi.object({
            day: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday').required(),
            times: Joi.array().items(Joi.string()).required(),
        })
    ),
    bio: Joi.string().required(),
    image: Joi.string().required(),
    opportunities: Joi.array().items(opportunitySchema)
});

// Attach the schema to the mentors datastore
mentorsDB.ensureIndex({ fieldName: '_id', unique: true });
// mentorsDB.ensureIndex({ fieldName: 'email', unique: true });
// mentorsDB.ensureIndex({ fieldName: 'username', unique: true });

const validateAndInsert = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Validate the input data against the schema
            const validationResult = mentorSchema.validate(data);

            if (validationResult.error) {
                reject(validationResult.error.details.map(d => d.message).join(', '));
                return;
            }

            // Insert the validated data into the database
            mentorsDB.insert(validationResult.value, (err, newDoc) => {
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
module.exports = { mentorsDB, validateAndInsert };
