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
                    res.render('studentDashboard', { student: studentData, categories: studentData.opportunities, mentorAvailabilityMap: {}, user_id: studentData.query.user_id });

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

    // editOpportunity: async (req, res) => {
    //     try {
    //         const { user_id, opportunity_id } = req.params;
    //         const studentData = await studentModel.findByUserId(user_id);
    
    //         if (!opportunity_id) {
    //             return res.status(400).json({ error: 'Opportunity ID is required.' });
    //         }
    
    //         const opportunityIndex = studentData.opportunities.findIndex(
    //             (opp) => opp._id.toString() === opportunity_id
    //         );
    
    //         if (opportunityIndex === -1) {
    //             return res.status(404).json({ error: 'Opportunity not found.' });
    //         }
    
    //         const opportunityToUpdate = studentData.opportunities[opportunityIndex];
    //         const updatedOpportunityData = {
    //             category_id: req.body.category_id || opportunityToUpdate.category_id,
    //             categoryName: req.body.categoryName || opportunityToUpdate.categoryName,
    //             title: req.body.title || opportunityToUpdate.title,
    //             description: req.body.description || opportunityToUpdate.description,
    //             mentorAvailability: req.body.mentorAvailability || opportunityToUpdate.mentorAvailability,
    //             sessionDuration: req.body.sessionDuration || opportunityToUpdate.sessionDuration,
    //             image: req.body.image || opportunityToUpdate.image,
    //             obj: req.body.obj || opportunityToUpdate.obj,
    //             duration: req.body.duration || opportunityToUpdate.duration,
    //         };
    
    //         studentData.opportunities[opportunityIndex] = updatedOpportunityData;
    
    //         try {
    //             await studentModel.updateStudent(studentData._id, { opportunities: studentData.opportunities });
    //             req.flash('success', 'Opportunity updated successfully.');
    //             res.redirect(`/user/${user_id}/viewOpportunity`);
    //         } catch (error) {
    //             console.error('Error updating student:', error);
    //             req.flash('error', 'Internal server error.');
    //             res.redirect('/some_page');
    //         }
    //     } catch (error) {
    //         console.error('Error in editOpportunity:', error);
    //         req.flash('error', 'Internal server error.');
    //         res.redirect('/some_page');
    //     }
    // },
    

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
                datepicker: opportunity.datepicker,
                timepicker: opportunity.timepicker,
                mentorSelect: opportunity.mentorSelect,
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
    
                // Redirect to the desired URL after successful update
                res.redirect(`/students/user/${user_id}/opportunityDetails/${opportunityId}`);
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
            // Extract route parameters
            const { user_id, id: opportunityId } = req.params;

            // Find the student in the studentsDB by user_id
            let studentData = await studentModel.findByUserId(user_id);

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

            // Remove the opportunity from the student's opportunities
            studentData.opportunities.splice(existingOpportunityIndex, 1);

            // Update the student data in the database
            try {
                await studentModel.updateStudent(studentData._id, { opportunities: studentData.opportunities });

                // Send a response back to the client-side
                res.status(200).json({ message: 'Opportunity removed successfully.' });
            } catch (error) {
                console.error('Error updating student:', error);
                res.status(500).json({ error: 'Internal server error.' });
            }
        } catch (error) {
            console.error('Error in removeOpportunity:', error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    },

    viewProfile: async (req, res) => {
        try {
            const { user_id } = req.params;
            const studentData = await studentModel.findByUserId(user_id);

            if (!studentData) {
                return res.status(404).json({ error: 'Student not found.' });
            }

            render(res, 'studentProfile', {
                user_id: user_id,
                student: studentData
            });
        } catch (err) {
            console.error('Error in viewProfile:', err);
            res.status(500).json({ error: 'Internal server error.' });
        }
    }





};

module.exports = studentController;
