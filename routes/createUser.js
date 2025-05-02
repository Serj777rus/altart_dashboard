const User = require('../models/users');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const createJWTToken = require('../configs/jsonwebtoken')
const saltRounds = 10;

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter email address' });
  } else if (!password) {
    return res.status(400).json({ message: 'Please enter password' });
  }
  else {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try {
      const searchUser = await User.findOne({
        where: {
          email: email,
        }
      })
      if (!searchUser) {
        const response = await User.create({
          email: email,
          password: hashedPassword,
        })
        const data = {
          id: response.dataValues.id,
          email: response.dataValues.email,
        }
        const token = await createJWTToken(data)
        if (token) {
          res.status(200).json({ token: token, message: 'User created successfully' })
        }
      } else {
        res.status(400).json({ message: 'User already exists' });
      }
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
})

module.exports = router;
