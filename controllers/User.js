const User = require('../models/user');

const create = (req, res) => {
  const user = req.body;

  return User.create(user)
    .then(newUser => res.json({ user: newUser }))
    .catch(error => res.json({ error }));
};

module.exports = {
  create,
};
