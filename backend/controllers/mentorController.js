const mentorModel = require('../models/mentorModel');

// Define the mentor controller.
const mentorController = {
    // Function to get the mentor dashboard.
    getDashboard: (req, res) => {
        mentorModel.getAll((err, mentors) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.render('mentorDashboard', { mentors: mentors });
            }
        });
    },

    // Function to get the mentor's coaching opportunities.
    getOpportunities: (req, res) => {
        mentorModel.getAll((err, mentors) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.render('viewCoachingOpportunities', { mentors: mentors });
            }
        });
    },

    // Function to add a new coaching opportunity.
    addOpportunity: (req, res) => {
        const newOpportunity = req.body;
        mentorModel.add(newOpportunity, (err, mentor) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.redirect('/mentors/dashboard');
            }
        });
    },

    // Function to modify a coaching opportunity.
    modifyOpportunity: (req, res) => {
        const id = req.params.id;
        const updatedOpportunity = req.body;
        mentorModel.update(id, updatedOpportunity, (err, mentor) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.redirect('/mentors/dashboard');
            }
        });
    },

    // Function to remove a coaching opportunity.
    deleteOpportunity: (req, res) => {
        const id = req.params.id;
        mentorModel.delete(id, (err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.redirect('/mentors/dashboard');
            }
        });
    }
};

module.exports = mentorController;
