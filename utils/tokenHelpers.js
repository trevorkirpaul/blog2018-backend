const jwt = require('jwt-simple');
const config = require('../config');

const { secret } = config;

const generateToken = payload => jwt.encode(payload, secret);

const decodeToken = token => jwt.decode(token, secret);

module.exports = {
  generateToken,
  decodeToken,
};
