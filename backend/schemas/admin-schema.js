const Datastore = require('nedb');
const Joi = require('joi');
const bcrypt = require('bcrypt');


// Create a new instance of the datastore for admin
const adminDB = new Datastore({ filename: 'C:/xampp/htdocs/WDT Coursework/WPD2---Coursework/backend/db/admins.db', autoload: true });

// Define the opportunity schema using Joi
const mentorAvailabilitySchema = Joi.object({
    mentorName: Joi.string().required(),
    recurringDays: Joi.array().items(Joi.string()).required(),
    times: Joi.array().items(Joi.string()).required(),
   });

// Define the schema for opportunities using Joi
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
    opportunities: Joi.array().items(opportunitySchema), // Include opportunities array
});



// Define the schema for students using Joi
const studentSchema = Joi.object({
    _id: Joi.string(),
    user_id: Joi.string(),
    role: Joi.string().valid('student').required(),
    username: Joi.string().required(),
    fullName: Joi.string().required(),
    studentId: Joi.string().required(),
    university: Joi.string().required(),
    department: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    opportunities: Joi.array().items(opportunitySchema),
    // Additional fields specific to students if needed
});

// // Insert the admin login details upon creating the NeDB instance
// const adminLoginDetails = {
//     role: 'admin',
//     username: 'admin', // Change this to your desired admin username
//     fullName: 'Christiana Ola', // Change this to your desired admin full name
//     email: 'admin@gmail.com', // Change this to your desired admin email
//     password: 'adminPassword@80', // Change this to your desired admin password
// };

// const saltRounds = 10; // Number of salt rounds for bcrypt

// // Hash the admin password before insertion
// bcrypt.hash(adminLoginDetails.password, saltRounds, async (err, hashedPassword) => {
//     if (err) {
//         console.error('Failed to hash password:', err);
//     } else {
//         try {
//             const adminWithHashedPassword = { ...adminLoginDetails, password: hashedPassword };
//             // Insert the admin details with the hashed password into the admin database
//             adminDB.insert(adminWithHashedPassword, (insertErr, newAdmin) => {
//                 if (insertErr) {
//                     console.error('Failed to insert admin details:', insertErr);
//                 } else {
//                     console.log('Admin details inserted:', newAdmin);
//                 }
//             });
//         } catch (hashError) {
//             console.error('Error while hashing password:', hashError);
//         }
//     }
// });

// Attach the schemas to the admin database
adminDB.ensureIndex({ fieldName: '_id', unique: true });
// adminDB.ensureIndex({ fieldName: 'email', unique: true });
// adminDB.ensureIndex({ fieldName: 'username', unique: true });

const validateAndInsert = (collection, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let schema;
            if (collection === 'students') {
                schema = studentSchema;
                adminDB.findOne({ email: data.email }, (err, existingStudent) => {
                    if (err) {
                        reject(err);
                    } else if (existingStudent) {
                        reject('Email address already exists');
                    } else {
                        adminDB.insert(data, (insertErr, newDoc) => {
                            if (insertErr) {
                                reject(insertErr);
                            } else {
                                resolve(newDoc);
                            }
                        });
                    }
                });
            } else if (collection === 'mentors') {
                schema = mentorSchema;
                adminDB.findOne({ email: data.email }, (err, existingMentor) => {
                    if (err) {
                        reject(err);
                    } else if (existingMentor) {
                        reject('Email address already exists');
                    } else {
                        adminDB.insert(data, (insertErr, newDoc) => {
                            if (insertErr) {
                                reject(insertErr);
                            } else {
                                resolve(newDoc);
                            }
                        });
                    }
                });
            } else if (collection === 'opportunities') {
                schema = opportunitySchema;
                adminDB.insert(data, (err, newDoc) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(newDoc);
                    }
                });
            } else {
                reject('Invalid collection');
            }

            const validationResult = schema.validate(data);

            if (validationResult.error) {
                reject(validationResult.error.details.map(d => d.message).join(', '));
                return;
            }
        } catch (error) {
            reject(error);
        }
    });
};


// Export the NeDB instance and the validation function
module.exports = { adminDB, validateAndInsert };
