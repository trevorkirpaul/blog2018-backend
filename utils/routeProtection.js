const tokenHelpers = require('./tokenHelpers');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

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

const isCommentOwner = (req, res, next) => {
  try {
    const userIdFromToken = decodeToken(req.body.token);

    Comment.findById(req.body.id).then((comment) => {
      if (comment.author.equals(userIdFromToken)) {
        return next();
      }
      return res.status(401).send({ error: 'invalid user', hasError: true, auth: false });
    });
  } catch (error) {
    return res.status(400).send({ error, hasError: true });
  }
};

module.exports = {
  isValidUser,
  isCommentOwner,
};
