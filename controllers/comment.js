const Comment = require('../models/comment');

const create = (req, res) => Comment.create(req.body.comment)
  .then(newComment => res.send({ success: true, comment: newComment }))
  .catch(err => res.status(400).send({ error: err, hasError: true }));

const deleteComment = (req, res) => Comment.findByIdAndDelete(req.body.id)
  .then(comment => res.status(200).send({ success: true, comment }))
  .catch(error => res.status(400).send({ error, hasError: true }));

const updateComment = (req, res) => Comment.findByIdAndUpdate(req.params.id, req.body.comment, { new: true })
  .then(updatedComment => res.status(200).send({ success: true, comment: updatedComment }))
  .catch(error => res.status(400).send({ error, hasError: true }));

const getCommentById = (req, res) => Comment.findById(req.body.id)
  .then(comment => res.status(200).send({ success: true, comment }))
  .catch(err => res.status(400).send({ hasError: true, error: err }));

const getCommentsForPost = (req, res) => Comment.find({
  parentPost: req.body.parentPost,
})
  .then(comments => res.status(200).send({ success: true, comments }))
  .catch(err => res.status(400).send({ error: err, hasError: true }));

module.exports = {
  create,
  deleteComment,
  updateComment,
  getCommentById,
  getCommentsForPost,
};
