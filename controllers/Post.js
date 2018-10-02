const Post = require('../models/post');

const create = (req, res) => {
  const post = req.body;

  return Post.create(post)
    .then(newPost => res.json({ success: true, post: newPost }))
    .catch(err => res.json({ error: err, hasError: true }));
};

module.exports = {
  create,
};
