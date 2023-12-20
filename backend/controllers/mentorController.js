const mentorModel = require('../models/mentorModel');
const User = require('../models/user');

const mentorController = {
    getDashboard: async (req, res) => {
        try {
            const user = req.user; // Assuming user is logged in
            const mentorUser = await User.findByEmail(user.email);

            if (!mentorUser) {
                return res.status(404).json({ error: 'Mentor not found.' });
            }

            // Retrieve mentor-specific data based on the logged-in user
            const mentorData = await mentorModel.findById(mentorUser._id);

            if (!mentorData) {
                return res.status(404).json({ error: 'Mentor data not found.' });
            }

            // Render the mentor dashboard with mentor-specific data
            res.render('mentorDashboard', { mentorData });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    getOpportunities: async (req, res) => {
        try {
            const user = req.user; // Assuming user is logged in
            const mentorUser = await User.findByEmail(user.email);

            if (!mentorUser) {
                return res.status(404).json({ error: 'Mentor not found.' });
            }

            // Retrieve mentor-specific data, including coaching opportunities
            const mentorData = await mentorModel.findById(mentorUser._id);

            if (!mentorData) {
                return res.status(404).json({ error: 'Mentor data not found.' });
            }

            // Render the view with mentor-specific data
            res.render('viewCoachingOpportunities', { mentorData });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    addOpportunity: async (req, res) => {
        try {
            const user = req.user; // Assuming user is logged in
            const mentorUser = await User.findByEmail(user.email);

            if (!mentorUser) {
                return res.status(404).json({ error: 'Mentor not found.' });
            }

            const newOpportunity = req.body;
            const mentorData = await mentorModel.addOpportunity(mentorUser._id, newOpportunity);

            res.redirect('/mentors/dashboard');
        } catch (err) {
            res.status(500).send(err);
        }
    },

    modifyOpportunity: async (req, res) => {
        try {
            const id = req.params.id;
            const updatedOpportunity = req.body;
            const mentorData = await mentorModel.updateOpportunity(id, updatedOpportunity);

            res.redirect('/mentors/dashboard');
        } catch (err) {
            res.status(500).send(err);
        }
    },

    deleteOpportunity: async (req, res) => {
        try {
            const id = req.params.id;
            const mentorData = await mentorModel.deleteOpportunity(id);

            res.redirect('/mentors/dashboard');
        } catch (err) {
            res.status(500).send(err);
        }
    },
};

module.exports = mentorController;
