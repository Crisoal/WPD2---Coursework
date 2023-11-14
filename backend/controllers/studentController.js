const User = require('../models/user');
const studentModel = require('../models/studentModel');
const opportunityModel = require('../models/opportunityModel');

// Assuming you have a render function, adjust this based on your templating engine
const render = (res, view, data) => {
    res.render(view, data);
};

const studentController = {
    addOpportunity: async (req, res) => {
        try {
            // Get the opportunity ID from the route parameter.
            const opportunityId = req.params.id;

            // Find the opportunity in the opportunity model by _id.
            const opportunity = await opportunityModel.findOne({ _id: opportunityId });

            if (!opportunity) {
                return res.status(404).json({ error: 'Opportunity not found.' });
            }

            // Check if the opportunity is already in the student's opportunities list
            const studentId = req.user._id; // Assuming user object has _id field
            const student = await studentModel.findOne({ _id: studentId });

            console.log(student);

            if (!student) {
                return res.status(404).json({ error: 'Student not found.' });
            }

            const alreadyAdded = student.opportunities.some(opp => opp._id === opportunity._id);

            if (alreadyAdded) {
                return res.status(400).json({ error: 'Opportunity already added.' });
            }

            // Add the opportunity to the student's opportunities list
            student.opportunities.push({
                _id: opportunity._id,
                title: opportunity.title,
                description: opportunity.description,
                date: opportunity.date,
                time: opportunity.time,
            });

            // Save the updated student document
            await student.save();

            // Assuming you have a render function and a studentMyOpportunity.mustache template
            render(res, 'studentMyOpportunity', { opportunities: student.opportunities });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    viewOpportunities: async (req, res) => {
        try {
            // Use the findAll method from the studentModel to retrieve all opportunities in the database.
            const allOpportunities = await studentModel.findAll();

            // Check if there are any opportunities in the database.
            if (allOpportunities.length === 0) {
                return res.status(404).json({ error: 'No opportunities found in the database.' });
            }

            // Assuming you have a render function and a studentMyOpportunity.mustache template
            render(res, 'studentMyOpportunity', { opportunities: allOpportunities });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    opportunityDetails: async (req, res) => {
        try {
            // Get the opportunity ID from the route parameter.
            const opportunityId = req.params.id;

            // Find the opportunity in the opportunity model by _id.
            const opportunity = await opportunityModel.findById(opportunityId);

            if (!opportunity) {
                return res.status(404).json({ error: 'Opportunity not found.' });
            }

            // Modify the opportunity data as needed before insertion.
            const opportunityDetails = {
                // Map the opportunity fields to the corresponding student fields
                // Adjust this mapping according to your data structure
                _id: opportunity.id,
                title: opportunity.title,
                description: opportunity.description,
                date: opportunity.date,
                time: opportunity.time,
            };

            // Assuming you have a render function and a studentModifyOpportunity.mustache template
            render(res, 'studentModifyOpportunity', { opportunities: opportunityDetails });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    updateOpportunity: async (req, res) => {
        try {
            // Get the opportunity ID from the route parameters.
            const opportunityId = req.params.id;

            // Parse the URL fragment identifier (everything after the # character).
            const fragment = req.params[0];

            // Check if the fragment matches the expected pattern, such as "updateOpportunity/{_id}".
            const fragmentPattern = /^updateOpportunity\/(\w+)$/;
            const match = fragmentPattern.exec(fragment);

            if (match) {
                // Extract the _id from the fragment.
                const updatedOpportunityId = match[1];

                if (opportunityId !== updatedOpportunityId) {
                    return res.status(400).json({ error: 'Opportunity ID in the URL does not match the fragment.' });
                }

                // Update the opportunity based on the request body.
                const updatedOpportunityData = {
                    date: req.body.date,
                    time: req.body.time,
                    // Add other fields here if needed
                };

                // Update the opportunity in the database using the student model's updateById method.
                const numUpdated = await studentModel.updateById(opportunityId, updatedOpportunityData);

                if (numUpdated === 0) {
                    return res.status(404).json({ error: 'Opportunity not found.' });
                }

                // Optionally, you can retrieve the updated opportunity from the database
                const updatedOpportunity = await studentModel.findById(opportunityId);

                // Assuming you have a render function and a studentMyOpportunity.mustache template
                render(res, 'studentMyOpportunity', { opportunities: updatedOpportunity });
            } else {
                return res.status(400).json({ error: 'Invalid fragment format.' });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    },

    removeOpportunity: async (req, res) => {
        try {
            // Get the opportunity ID from the route parameter.
            const opportunityId = req.params.id;

            // Call the remove method from the studentModel.
            const result = await studentModel.remove({ _id: opportunityId }); // Pass the ID as an object

            if (result instanceof Error) {
                // Handle errors returned by the model's remove method.
                return res.status(500).json({ error: result.message });
            } else if (typeof result === 'string') {
                // Successful removal with a message.
                return res.status(200).json({ message: result });
            } else {
                // If the result is not a string or an error, you can assume something went wrong.
                return res.status(500).json({ error: 'An unexpected error occurred.' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    createDashboard: async (studentEmail) => {
        try {
            const student = await studentModel.findByEmail(studentEmail);

            if (!student) {
                console.error('Student not found.');
                // Handle the error or redirect as needed
                return;
            }

            // Assuming you have a render function and a studentDashboard.mustache template
            render(res, 'studentDashboard', { student });
        } catch (err) {
            console.error('Error creating dashboard:', err);
            // Handle the error or redirect as needed
        }
    },

    getDashboard: async (req, res) => {
        try {
          // Perform logic to render the student dashboard with opportunities data
          const student = req.user; // Assuming user object is available after authentication
          const categories = await opportunityModel.find({ type: 'category' });
          const opportunities = await opportunityModel.find({ type: 'opportunity' });
    
          categories.forEach(category => {
            category.opportunities = opportunities.filter(opportunity => opportunity.category_id === category.category_id);
          });
    
          // Assuming you have a render function and a studentDashboard.mustache template
          render(res, 'studentDashboard', { student, categories });
        } catch (err) {
          console.error('Error rendering dashboard:', err);
          // Handle the error or redirect as needed
        }
      },
};

module.exports = studentController;
