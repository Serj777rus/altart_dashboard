const express = require('express');
const router = express.Router();
const transporter = require('../configs/nodemailer');

router.post('/', async (req, res) => {
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  await transporter(email, subject, message);
})

module.exports = router;
