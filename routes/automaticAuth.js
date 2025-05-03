const express = require("express");
const router = express.Router();
const jwt = require('../configs/checkjwt')
const User = require('../models/users');

router.post("/", async (req, res) => {
  const token = req.body.token;
  const checkToken = await jwt(token);
  console.log(checkToken);
  if (!checkToken) {
    return res.status(400).json({ message: 'Invalid token' });
  } else {
    try {
      const response = await User.findOne({
        where: {
          email: checkToken.data.email
        }
      })
      if (!response) {
        res.status(400).json({message: 'User not found'})
      } else {
        res.status(200).json({ message: 'User logged in successfully', data: response.dataValues });
      }
    } catch (error) {
      return res.status(400).json({ message: 'Invalid token' })
    }
  }
})

module.exports = router
