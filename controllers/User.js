const User = require("../models/user");
const tokenHelpers = require("../utils/tokenHelpers");

const { generateToken, decodeToken } = tokenHelpers;

const create = (req, res) => {
  const user = req.body;

  return User.create(user)
    .then(newUser => res.json({ user: newUser }))
    .catch(error => res.json({ error }));
};

const signIn = (req, res) => {
  const credentials = req.body;

  User.findOne({ email: credentials.email })
    .then(user => {
      user.comparePassword(credentials.password, (err, auth) => {
        if (auth) {
          const token = generateToken(user._id);
          return res.send({ token, auth: true });
        }
        return res.send({ auth: false, token: null });
      });
    })
    .catch(err => res.send({ error: err, hasError: true }));
};

const authenticateToken = (req, res) => {
  const { candidateToken } = req.body;

  try {
    const userIdFromToken = decodeToken(candidateToken);
    User.findById(userIdFromToken).then(() => res.send({ auth: true }));
  } catch (error) {
    res.send({ auth: false, error, hasError: true });
  }
};

module.exports = {
  create,
  signIn,
  authenticateToken
};
