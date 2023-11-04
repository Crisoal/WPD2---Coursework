const studentModel = require('../models/studentModel');
const opportunityModel = require('../models/opportunityModel'); // Import the opportunity model

const studentController = {
    addOpportunity: async (req, res) => {
        try {
            // Get the opportunity ID from the route parameter.
            const opportunityId = req.params.id;

            // if (!opportunityId) {
            //     return res.status(400).json({ error: 'OpportunityId is required.' });
            // }

            // Find the opportunity in the opportunity model by _id.
            const opportunity = await opportunityModel.findOne({ _id: opportunityId });

            console.log(opportunity);

            if (!opportunity) {
                return res.status(404).json({ error: 'Opportunity not found.' });
            }

            // Modify the opportunity data as needed before insertion.
            const modifiedOpportunity = {
                // Map the opportunity fields to the corresponding student fields
                // Adjust this mapping according to your data structure
                title: opportunity.title,
                description: opportunity.description,
                date: opportunity.date,
                time: opportunity.time

                // Other fields
            };

            // Insert the opportunity into the students database.
            const newOpportunity = await studentModel.insert(modifiedOpportunity);

            const message = `The Opportunity: ${opportunity.name} has been added to 'My Opportunities'`;
            res.json({ message, newOpportunity });
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

            // Render the "studentMyOpportunity.mustache" page and pass the opportunities data to it.
            res.render('studentMyOpportunity', { opportunities: allOpportunities });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    opportunityDetails: async (req, res) => {
        try {
            // Get the opportunity ID from the route parameter.
            const opportunityId = req.params.id;
    
            // Find the opportunity in the opportunity model by _id.
            const opportunity = await studentModel.findById(opportunityId);
    
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
                time: opportunity.time
            };
    
            // Render the "studentModifyOpportunity.mustache" page and pass the opportunity data to it.
            res.render('studentModifyOpportunity', { opportunities: opportunityDetails });
        } catch (err) {
            res.status(500).send(err);
        }
    },
    
    updateOpportunity: async (req, res) => {
        try {
            // Get the opportunity ID from the route parameters.
            const opportunityId = req.params.id; // Get the ID from the request body
     
            // Find the opportunity in the student model by _id.
            const existingOpportunity = await studentModel.findById({_id: opportunityId});
     
            if (!existingOpportunity) {
                return res.status(404).json({ error: 'Opportunity not found.' });
            }
     
            // Modify the opportunity data based on the request body.
            const updatedOpportunityData = {
                date: req.body.date,
                time: req.body.time
                // Add other fields here if needed
            };
     
            // Update the opportunity in the database using the student model's updateById method.
            const numUpdated = await studentModel.updateById(opportunityId, updatedOpportunityData);
     
            if (numUpdated === 0) {
                return res.status(404).json({ error: 'Opportunity not found.' });
            }
     
            // Optionally, you can retrieve the updated opportunity from the database
            const updatedOpportunity = await studentModel.findById(opportunityId);
     
            res.json({ message: 'Opportunity updated successfully', updatedOpportunity });
        } catch (err) {
            res.status(500).send(err);
        }
     },
     

    removeOpportunity: async (req, res) => {
        try {
            // Get the opportunity ID from the route parameter.
            const opportunityId = req.params.id;

            // if (!opportunityId) {
            //    return res.status(400).json({ error: 'OpportunityId is required.' });
            // }

            // Delete the opportunity from the students database.
            const numRemoved = await studentModel.deleteById({_id: opportunityId});

            if (numRemoved === 0) {
                return res.status(404).json({ error: 'Opportunity not found.' });
            }

            const message = `The Opportunity with ID: ${opportunityId} has been removed from 'My Opportunities'`;
            res.json({ message });
        } catch (err) {
            res.status(500).send(err);
        }
    }

};

module.exports = studentController;
