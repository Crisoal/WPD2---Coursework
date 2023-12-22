const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const handleContactFormSubmission = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    const mailOptions = {
      from: email,
      to: 'your-email@gmail.com',
      subject: `Contact form submission from ${name}`,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.send('Message received');
  } catch (error) {
    console.error('Error occurred while sending email:', error);
    res.status(500).send('An error occurred while sending the email.');
  }
};

module.exports = {
  handleContactFormSubmission,
};
