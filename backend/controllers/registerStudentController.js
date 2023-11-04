const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const registerStudentModel = require('../models/registerStudentModel');

class registerStudentController {
  async registerStudent(req, res) {
    const { name, email, password, confirmPassword } = req.body;
 
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
 
    try {
      const token = crypto.randomBytes(20).toString('hex');
      const studentData = {
        name,
        email,
        password,
        role: 'student',
        emailConfirmed: false,
        emailConfirmationToken: token,
      };
 
      // Check if a user with the same email already exists
      const existingStudent = await registerStudentModel.findStudentByEmail(email);
 
      if (existingStudent) {
        // If the user exists, update their information
        const updatedStudent = await registerStudentModel.updateStudent(existingStudent._id, studentData);
        studentData.emailConfirmationToken = updatedStudent.emailConfirmationToken;
      }
 
      const confirmationLink = `http://localhost:3000/confirm-email?token=${studentData.emailConfirmationToken}`;
 
      res.json({
        message: 'Please check your email for confirmation.',
        confirmationLink,
      });
 
      // Send the confirmation email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'crisoalcrafts@gmail.com',
          pass: 'pmsm eosz jntj feib',
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
 
      const mailOptions = {
        from: 'crisoalcrafts@gmail.com',
        to: email,
        subject: 'Email Confirmation',
        text: `Please confirm your email by clicking on the following link: ${confirmationLink}`,
      };
 
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
 
  async confirmEmail(req, res) {
    const token = req.query.token;
   
    try {
      if (!token) {
        return res.status(400).json({ message: 'Token is missing' });
      }
   
      // Find the student by the token
      const student = await registerStudentModel.findStudentByToken(token);
   
      // Log the token and the student
      console.log(`Token: ${token}`);
      console.log(`Student: ${JSON.stringify(student)}`);
   
      if (!student) {
        return res.status(404).json({ message: 'Invalid confirmation token' });
      }
   
      if (student.emailConfirmed) {
        return res.status(400).json({ message: 'Email already confirmed' });
      }
   
      // Update the email confirmation status in the database
      await registerStudentModel.updateEmailConfirmationStatus(student._id);
   
      // Create the user in the database
      await registerStudentModel.createStudent(student);
   
      // Redirect the user to a success page or send a success message
      res.render('successfulReg', { continueToDashboard: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
   }
   
 }
 

module.exports = new registerStudentController();