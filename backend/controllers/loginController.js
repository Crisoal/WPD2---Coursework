// controllers/loginController.js
const loginModel = require('../models/loginModel');

class loginController {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await loginModel.findUserByEmail(email);

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      if (!user.emailConfirmed) {
        return res.status(401).json({ message: 'Email not confirmed' });
      }

      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Determine the user's role and redirect them accordingly
      if (user.role === 'student') {
        return res.redirect('/studentDashboard'); // You need to define the route
      } else if (user.role === 'admin') {
        return res.redirect('/adminDashboard'); // You need to define the route
      } else if (user.role === 'mentor') {
        return res.redirect('/mentorDashboard'); // You need to define the route
      } else {
        return res.status(401).json({ message: 'Unknown user role' });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
}

module.exports = new loginController();
