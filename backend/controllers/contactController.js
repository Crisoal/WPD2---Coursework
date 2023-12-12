const nodemailer = require('nodemailer');

// Configure the email transport
const transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
   user: 'your-email@gmail.com',
   pass: 'your-password'
 }
});

// Handle the form submission
const handleContactFormSubmission = (req, res) => {
 const name = req.body.name;
 const email = req.body.email;
 const message = req.body.message;

 // Construct the email message
 const mailOptions = {
   from: email,
   to: 'your-email@gmail.com',
   subject: `Contact form submission from ${name}`,
   text: message
 };

 // Send the email
 transporter.sendMail(mailOptions, (error, info) => {
   if (error) {
     console.log(error);
     res.status(500).send('An error occurred while sending the email.');
   } else {
     console.log('Email sent: ' + info.response);
     res.send('Message received');
   }
 });
};

module.exports = {
 handleContactFormSubmission
};
