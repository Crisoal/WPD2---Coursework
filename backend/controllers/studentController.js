const studentModel = require('../models/studentModel');
const { studentsDB, validateAndInsert } = require('../schemas/student-schema');
const opportunityModel = require('../models/opportunityModel');

// Assuming you have a render function, adjust this based on your templating engine
const render = (res, view, data) => {
    res.render(view, data);
};

const studentController = {
    // createDashboard: async (user_id) => {
    //     try {
    //       // Find the student in the studentsDB by user_id
    //       const student = await studentsDB.findOne({ user_id });

    //       if (!student) {
    //         console.error('Student not found with user_id:', user_id);
    //         // Handle the error as needed
    //         return null;
    //       }

    //       // Perform logic to organize the student dashboard data with opportunities
    //       const categories = await opportunityModel.find({ type: 'category' });
    //       const opportunities = await opportunityModel.find({ type: 'opportunity' });

    //       categories.forEach(category => {
    //         category.opportunities = opportunities.filter(opportunity => opportunity.category_id === category.category_id);
    //       });

    //       // Return the organized data instead of rendering
    //       return { student, categories };
    //     } catch (err) {
    //       console.error('Error creating dashboard data:', err);
    //       // Handle the error as needed
    //       return null;
    //     }
    //   },

    getDashboard: async (user_id, res) => {
        try {
            // Find the student in the studentsDB by user_id
            const student = await studentsDB.findOne({ user_id });

            if (!student) {
                console.error('Student not found with user_id:', user_id);
                // Handle the error as needed
                return null;
            }

            // Perform logic to organize the student dashboard data with opportunities
            const categories = await opportunityModel.find({ type: 'category' });
            const opportunities = await opportunityModel.find({ type: 'opportunity' });

            categories.forEach(category => {
                category.opportunities = opportunities.filter(opportunity => opportunity.category_id === category.category_id);
            });

            // Render the studentDashboard.mustache template
            res.render('studentDashboard', { student, categories, user_id: student.query.user_id });

            console.log(user_id);

            // You can also return some data if needed
            return { student, categories };
        } catch (err) {
            console.error('Error creating dashboard data:', err);
            // Handle the error as needed
            return null;
        }
    },

    addOpportunity: async (req, res) => {
        try {
            // Extract route parameters
            const { user_id, id: opportunityId } = req.params;
    
            // Find the student in the studentsDB by user_id
            let studentData = await studentModel.findByUserId(user_id);
    
            console.log("Student Data:", studentData);
    
            if (!opportunityId) {
                return res.status(400).json({ error: 'OpportunityId is required.' });
            }
    
            // Find the opportunity in the opportunity model by _id.
            const opportunity = await opportunityModel.findOne({ _id: opportunityId });
    
            console.log(opportunity);
    
            if (!opportunity) {
                return res.status(404).json({ error: 'Opportunity not found.' });
            }
    
            // Ensure that studentData.opportunities is initialized as an array
            if (!studentData) {
                // If the student doesn't exist, handle it appropriately (e.g., return an error)
                return res.status(404).json({ error: 'Student not found.' });
            }
    
            if (!studentData.opportunities) {
                studentData.opportunities = [];
            }
    
            // Check if the opportunity is already added for the student
            const existingOpportunity = studentData.opportunities.find(
                (opp) => opp._id.toString() === opportunity._id.toString()
            );
    
            if (!existingOpportunity) {
                // Add the opportunity to the student's opportunities list
                studentData.opportunities.push({
                    _id: opportunity._id,
                    title: opportunity.title,
                    description: opportunity.description,
                    date: opportunity.date,
                    time: opportunity.time,
                });
    
                // Update the student data in the database
                try {
                    await studentModel.updateStudent(studentData._id, { opportunities: studentData.opportunities });
                    res.status(200).json({ message: 'Opportunity added successfully.' });
                } catch (error) {
                    console.error('Error updating student:', error);
                    res.status(500).json({ error: 'Internal server error.' });
                }
            } else {
                res.status(400).json({ error: 'Opportunity already added for the student.' });
            }
        } catch (error) {
            console.error('Error in addOpportunity:', error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    },

    viewOpportunities: async (req, res) => {
        try {
          // Extract the user_id from route parameters
          const { user_id } = req.params;
    
          // Find the student in the studentsDB by user_id
          const studentData = await studentModel.findByUserId(user_id);
    
          // Check if the student with the specified user_id exists
          if (!studentData) {
            return res.status(404).json({ error: 'Student not found.' });
          }
    
          // Check if the student has any opportunities
          if (!studentData.opportunities || studentData.opportunities.length === 0) {
            return res.status(404).json({ error: 'No opportunities found for the student.' });
          }
    
          // Assuming you have a render function and a studentMyOpportunity.mustache template
          render(res, 'studentMyOpportunity', { opportunities: studentData.opportunities });
        } catch (err) {
          console.error('Error in viewOpportunities:', err);
          res.status(500).json({ error: 'Internal server error.' });
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
    }
};

module.exports = studentController;
