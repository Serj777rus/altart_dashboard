const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post('/', async (req, res) => {
  const { name, lastname, email } = req.body;
  try {
    const response = await User.update({
      name: name,
      lastname: lastname,
    },{
      where: {
        email: email,
      }
    })
    if (response) {
      res.status(200).json({message: 'User updated successfully'})
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
})

module.exports = router;
