// index.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const crypto = require('crypto');
const cors = require('cors'); 
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
const generateRandomKey = () => {
    return crypto.randomBytes(32).toString('hex'); // 32 bytes is a good size for a secret key
  };

const secretKey = generateRandomKey();
console.log('Generated Secret Key:', secretKey);


// Dummy storage for OTP codes (replace with a database in a real project)
const otpStorage = {};

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  console.log(email, name, password);
  // Generate OTP (as a signed token)
  const otp = randomstring.generate({
    length: 6,
    charset: 'numeric'
  });

  // Save OTP for verification
  otpStorage[email] = otp;

  // Send OTP to the user's email
  sendOtpEmail(email, otp);

  res.json({ success: true, message: 'OTP sent to your email for verification.' });
});

app.post('/verify', (req, res) => {
  const { email, otp } = req.body;

  // Verify OTP
  if (otpStorage[email] && otpStorage[email] === otp) {
    // OTP is valid, perform signup logic here

    // Remove OTP from storage after successful verification
    delete otpStorage[email];

    res.json({ success: true, message: 'Signup successful.' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP.' });
  }
});

function sendOtpEmail(email, otp) {
  // Configure nodemailer with your email provider
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your email',
      pass: 'app-password'
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for signup is: ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
