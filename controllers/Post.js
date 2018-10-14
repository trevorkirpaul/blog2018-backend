const Post = require('../models/post');

const create = (req, res) => Post.create(req.body.post)
  .then(newPost => res.json({ success: true, post: newPost }))
  .catch(err => res.json({ error: err, hasError: true }));

const getAllPosts = (req, res) => Post.find()
  .then(posts => res.json({ success: true, posts }))
  .catch(err => res.json({ errpr: err, hasError: true }));

const updatePostById = (req, res) => Post.findByIdAndUpdate(req.body.id, req.body.post, {
  new: true,
})
  .then(updatedPost => res.status(200).send({
    success: true,
    post: updatedPost,
  }))
  .catch(err => res.status(400).send({
    error: err,
    hasError: true,
  }));

module.exports = {
  create,
  getAllPosts,
  updatePostById,
};
