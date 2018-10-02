const Post = require('../models/post');

const create = (req, res) => Post.create(req.body.post)
  .then(newPost => res.json({ success: true, post: newPost }))
  .catch(err => res.json({ error: err, hasError: true }));

module.exports = {
  create,
};
