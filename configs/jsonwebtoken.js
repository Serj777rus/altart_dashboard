const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

function createJWTToken(data) {
  return jwt.sign({data}, secret)
}

module.exports = createJWTToken;
