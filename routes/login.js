const User = require('../models/users')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const createJWTToken = require('../configs/jsonwebtoken')
const saltRounds = 10;

router.post('/', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Invalid email' })
  } else {
    const response = await User.findOne({
      where: { email: email },
    })
    if (response) {
      const checkPassword = await bcrypt.compare(password, response.dataValues.password)
      if (checkPassword) {
        const data = {
          id: response.dataValues.id,
          email: response.dataValues.email,
        }
        const token = await createJWTToken(data)
        if (token) {
          res.status(200).json({ token: token, message: 'Login is successfully' })
        }
      } else {
        return res.status(400).json({ message: 'Invalid Password' })
      }
    } else {
      return res.status(400).json({ message: 'Invalid email' })
    }
  }
})

module.exports = router
