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
 
            res.render('opportunities', { categories });
        } catch (err) { 
            res.status(500).send(err);
        }
    }
};

module.exports = opportunityController;
