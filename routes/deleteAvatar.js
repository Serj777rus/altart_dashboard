const fs = require('fs');
const { unlink } = require('node:fs');
const User = require('../models/users');
const router = require('express').Router();

router.post('/', async (req, res) => {
  const { email, avatar } = req.body;
  try {
    if (avatar !== null) {
      fs.unlink(`${avatar}`, (err) => {
        if (err) {
          console.error(err);
        }
      })
      const response = await User.update({
        avatar: null,
      }, {
        where: {
          email: email,
        }
      })
      if (response) {
        res.status(200).json({message: 'Avatar deleted successfully.'});
      }
    } else {
      res.status(200).json({message: 'Avatar not found'})
    }
  } catch (error) {
    res.status(400).json({message: 'Error deleting avatar'});
  }
})

module.exports = router;
