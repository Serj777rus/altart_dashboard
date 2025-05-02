const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

function checkJwt(token) {
  return jwt.verify(token, secret);
}

module.exports = checkJwt;
