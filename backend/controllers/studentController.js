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

            // Fetch the opportunities for the student
            const opportunities = await opportunityModel.find({ type: 'opportunity' });

            // Create a map of mentor names to mentor availability data
            const mentorAvailabilityMap = new Map();
            opportunities.forEach(opportunity => {
                opportunity.mentorAvailability.forEach(mentorAvailability => {
                    mentorAvailabilityMap.set(mentorAvailability.mentorName, mentorAvailability);
                });
            });


            // Perform logic to organize the student dashboard data with opportunities
            const categories = await opportunityModel.find({ type: 'category' });

            // Fetch the categories and their associated opportunities in parallel
            const categoriesWithOpportunities = await Promise.all(categories.map(async (category) => {
                const categoryOpportunities = opportunities.filter(opportunity => opportunity.category_id === category.category_id);
                return { ...category, opportunities: categoryOpportunities };
            }));

            res.render('studentDashboard', { student, categories: categoriesWithOpportunities, mentorAvailabilityMap, user_id: student.query.user_id });

            console.log(user_id);
            // You can also return some data if needed
            return { student, categories: categoriesWithOpportunities };

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
                    category_id: opportunity.category_id,
                    categoryName: opportunity.categoryName,
                    title: opportunity.title,
                    description: opportunity.description,
                    mentorAvailability: opportunity.mentorAvailability,
                    sessionDuration: opportunity.sessionDuration,
                    image: opportunity.image,
                    obj: opportunity.obj,
                    duration: opportunity.duration,
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
    
            // Render the student's data, including user_id and opportunities,
            // onto the studentMyOpportunity.mustache template
            render(res, 'studentMyOpportunity', { 
                user_id: user_id, // Include user_id in the data passed to the template
                student: studentData 
            });
        } catch (err) {
            console.error('Error in viewOpportunities:', err);
            res.status(500).json({ error: 'Internal server error.' });
        }
    },
    
    opportunityDetails: async (req, res) => {
        try {
            // Extract route parameters
            const { user_id, id: opportunityId } = req.params;
    
            // Find the student in the studentsDB by user_id
            let studentData = await studentModel.findByUserId(user_id);
    
            if (!studentData) {
                return res.status(404).json({ error: 'Student not found.' });
            }
    
            // Find the opportunity by its id
            const opportunity = studentData.opportunities.find(opportunity => opportunity._id === opportunityId);
    
            if (!opportunity) {
                return res.status(404).json({ error: 'Opportunity not found.' });
            }
    
            const opportunityDetails = {
                _id: opportunity._id,
                category_id: opportunity.category_id,
                categoryName: opportunity.categoryName,
                title: opportunity.title,
                description: opportunity.description,
                mentorAvailability: opportunity.mentorAvailability,
                sessionDuration: opportunity.sessionDuration,
                image: opportunity.image,
                obj: opportunity.obj,
                duration: opportunity.duration,
            };
    
            console.log(opportunityDetails);
    
            // Pass both student data and opportunity details to the template
            render(res, 'studentModifyOpportunity', { student: studentData, opportunity: opportunityDetails });
        } catch (err) {
            res.status(500).send(err);
        }
    },
    
    updateOpportunity: async (req, res) => {
        try {
            // Extract route parameters
            const { user_id, id: opportunityId } = req.params;
    
            // Find the student in the studentsDB by user_id
            let studentData = await studentModel.findByUserId(user_id);
    
            console.log("Student Data:", studentData);
    
            if (!opportunityId) {
                return res.status(400).json({ error: 'OpportunityId is required.' });
            }
    
            // Check if the student exists
            if (!studentData) {
                return res.status(404).json({ error: 'Student not found.' });
            }
    
            // Check if the opportunity exists in the student's opportunities
            const existingOpportunityIndex = studentData.opportunities.findIndex(
                (opp) => opp._id.toString() === opportunityId
            );
    
            if (existingOpportunityIndex === -1) {
                return res.status(404).json({ error: 'Opportunity not found for the student.' });
            }
    
            // Update the opportunity details
            const updatedOpportunity = {
                ...studentData.opportunities[existingOpportunityIndex],
                ...req.body,
            };
    
            // Replace the existing opportunity with the updated opportunity
            studentData.opportunities[existingOpportunityIndex] = updatedOpportunity;
    
            // Update the student data in the database
            try {
                await studentModel.updateStudent(studentData._id, { opportunities: studentData.opportunities });
    
                // Fetch the updated opportunity data from the database
                const updatedStudentData = await studentModel.findByUserId(user_id);
                const updatedOpportunity = updatedStudentData.opportunities.find(opp => opp._id.toString() === opportunityId);
    
                res.status(200).json({ message: 'Opportunity updated successfully.', opportunity: updatedOpportunity });
            } catch (error) {
                console.error('Error updating student:', error);
                res.status(500).json({ error: 'Internal server error.' });
            }
        } catch (error) {
            console.error('Error in updateOpportunity:', error);
            res.status(500).json({ error: 'Internal server error.' });
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
