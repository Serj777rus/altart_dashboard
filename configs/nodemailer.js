const nodemailer = require('nodemailer')
const res = require('express/lib/response')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  }
})

async function sendEmail (email, subject, message) {
  try {
    const response = await transporter.sendMail({
      to: email,
      subject: subject,
      text: message,
    })
    if (response) {
      return res.status(200).json({message: 'Email sent successfully'})
    }
  } catch (error) {
    return res.status(400).json({message: 'Email not delivered'})
  }
}

module.exports = sendEmail
