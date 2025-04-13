require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: `"VeteranBNB Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send('Email failed');
    res.send('Message sent!');
  });
});

app.post('/api/booking', (req, res) => {
  const { name, email, checkin, checkout, guests, dogs, notes } = req.body;

  const mailOptions = {
    from: `"VeteranBNB Booking" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: 'New Booking Request',
    text: `
      Name: ${name}
      Email: ${email}
      Check-In: ${checkin}
      Check-Out: ${checkout}
      Guests: ${guests}
      Dogs: ${dogs}
      Notes: ${notes}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send('Booking failed');
    res.send('Booking received!');
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`VeteranBNB backend running on port ${PORT}`);
});
