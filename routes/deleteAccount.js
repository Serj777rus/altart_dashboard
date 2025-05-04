const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post('/', async (req, res) => {
  const email = req.body.email;
  try {
    const response = await User.destroy({
      where: {
        email: email,
      }
    })
    if (response) {
      res.status(200).json({message: 'Successfully deleted'})
    }
  } catch (error) {
    return res.status(400).json({ message: 'We don\'t can delete your account. Please try again' });
  }
})

module.exports = router
