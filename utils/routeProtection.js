const tokenHelpers = require('./tokenHelpers');
const User = require('../models/user');

const { decodeToken } = tokenHelpers;

const isValidUser = (req, res, next) => {
  try {
    const userIdFromToken = decodeToken(req.body.token);

    User.findById(userIdFromToken).then((user) => {
      if (user) return next();
      return res.send({ error: 'no auth', hasError: true });
    });
  } catch (error) {
    return res.send({ error: '404', hasError: true });
  }
};

module.exports = {
  isValidUser,
};
