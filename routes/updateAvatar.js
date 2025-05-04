const express = require("express");
const router = express.Router();
const upload = require('../configs/multer');
const User = require('../models/users');

router.post("/", upload.single("avatar"), async (req, res) => {
  const path = req.file.path;
  const email = req.body.email;
  try {
    const response = await User.update({
      avatar: path,
    },
      {
        where: {
          email: email,
        }
      })
    if (response) {
      return res.status(200).json({message: 'Avatar updated successfully.', path: path})
    }
  } catch (error) {
    res.status(400).json({message: 'Avatar not save'});
  }
})

module.exports = router;
