const Post = require('../models/post');

const create = (req, res) => Post.create(req.body.post)
  .then(newPost => res.json({ success: true, post: newPost }))
  .catch(err => res.json({ error: err, hasError: true }));

const getAllPosts = (req, res) => Post.find()
  .populate('author', ['email', 'firstName', 'lastName'])
  .populate('comments')
  .then(posts => res.json({ success: true, posts }))
  .catch(err => res.json({ errpr: err, hasError: true }));

const findPostById = (req, res) => Post.findById(req.params.id)
  .populate('author', ['email', 'firstName', 'lastName'])
  .populate('comments')
  .then(post => res.status(200).send({ success: true, post }))
  .catch(err => res.status(400).send({ error: err, hasError: true }));

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

const deletePostById = (req, res) => Post.findByIdAndDelete(req.body.id)
  .then(post => res.status(200).send({ success: true, post }))
  .catch(err => res.status(400).send({ error: err, hasError: true }));

module.exports = {
  create,
  getAllPosts,
  findPostById,
  updatePostById,
  deletePostById,
};
