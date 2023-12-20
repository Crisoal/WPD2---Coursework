const opportunityModel = require('../models/opportunityModel');

// Define the student controller.
const opportunityController = {
    // Function to get the student's coaching opportunities.
    getOpportunities: async (req, res) => {
        try {
            const categories = await opportunityModel.find({ type: 'category' });
            const opportunities = await opportunityModel.find({ type: 'opportunity' });

            categories.forEach(category => {
                category.opportunities = opportunities.filter(opportunity => opportunity.category_id === category.category_id);
            });

            res.render('manageOpportunities', { categories });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    addOpportunity: async (req, res) => {
        try {
            // Extract form data from the request body
            const { title, description, category_id, mentorAvailability, sessionDuration, image, obj, duration } = req.body;
    
            // Check if the opportunity title already exists
            const existingOpportunity = await opportunityModel.findOne({ title });
            if (existingOpportunity) {
                throw new Error('Opportunity with this title already exists');
            }
    
            // Create the new opportunity in the database using the validated data
            const createdOpportunity = await opportunityModel.create({ 
                type: 'opportunity',
                category_id,
                title,
                description,
                mentorAvailability: mentorAvailability.map(mentor => ({ 
                    mentorName: mentor.mentorName,
                    recurringDays: mentor.recurringDays,
                    times: mentor.times,
                })),
                sessionDuration,
                image,
                obj,
                duration,
            });

            console.log(createdOpportunity);
    
            // Fetch categories after adding the opportunity
            const categories = await opportunityModel.find({ type: 'category' });
            const opportunities = await opportunityModel.find({ type: 'opportunity' });
    
            categories.forEach((category) => {
                category.opportunities = opportunities.filter((opportunity) => opportunity.category_id === category.category_id);
            });
    
            // Render the manageOpportunity Mustache page after successful addition
            const message = 'Opportunity added successfully!';
            res.render('manageOpportunities', { categories, message }); // Pass both categories and the message as data to the template
        } catch (err) {
            res.status(500).send(err.message || 'Internal Server Error');
        }
    },
    
     

    viewOpportunities: async (req, res) => {
        try {
            // Fetch all categories
            const categories = await opportunityModel.find({ type: 'category' });
    
            // Fetch all opportunities
            const opportunities = await opportunityModel.find({ type: 'opportunity' });
    
            // Group opportunities by category
            const categorizedOpportunities = {};
    
            categories.forEach(category => {
                const categoryOpportunities = opportunities.filter(opportunity => opportunity.category_id.toString() === category._id.toString());
                categorizedOpportunities[category.name] = categoryOpportunities;
            });
    
            // Render a page to display opportunities under each category
            res.render('addOpportunity', { categories, opportunities, categorizedOpportunities });
    
        } catch (err) {
            res.status(500).send(err);
        }
    },
     
    // Function to update an existing opportunity.
    updateOpportunity: async (req, res) => {
        try {
            const opportunityId = req.params.id; // Assuming the opportunity ID is in the request parameters
            const updatedOpportunityData = req.body; // Updated opportunity data
     
            // Update the opportunity in the database based on opportunityId
            await opportunityModel.findByIdAndUpdate(opportunityId, updatedOpportunityData);
     
            // Fetch categories after updating the opportunity
            const categories = await opportunityModel.find({ type: 'category' });
            const opportunities = await opportunityModel.find({ type: 'opportunity' });
     
            categories.forEach(category => {
                category.opportunities = opportunities.filter(opportunity => opportunity.category_id === category.category_id);
            });
     
            // Render the manageOpportunity Mustache page after successful update
            const message = 'Opportunity updated successfully!';
            res.render('manageOpportunities', { categories, message }); // Pass both categories and the message as data to the template
     
        } catch (err) {
            res.status(500).send(err);
        }
     },

    removeOpportunity: async (req, res) => {
        try {
            const opportunityId = req.params.id; // Assuming the opportunity ID is in the request parameters
    
            console.log(opportunityId);
            // Remove the opportunity from the database based on opportunityId
            await opportunityModel.findByIdAndRemove(opportunityId);
    
            // Fetch categories after removing the opportunity
            const categories = await opportunityModel.find({ type: 'category' });
            const opportunities = await opportunityModel.find({ type: 'opportunity' });
    
            categories.forEach(category => {
                category.opportunities = opportunities.filter(opportunity => opportunity.category_id === category.category_id);
            });
    
            // Render the manageOpportunity Mustache page after successful removal
            const message = 'Opportunity removed successfully!';
            res.render('manageOpportunities', { categories, message }); // Pass both categories and the message as data to the template
    
        } catch (err) {
            res.status(500).send(err);
        }
    }
    


};

module.exports = opportunityController;
