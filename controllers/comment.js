const Comment = require('../models/comment');
const Post = require('../models/post');

const create = (req, res) => {
  Comment.create(req.body.comment)
    .then(comment => Post.findByIdAndUpdate(req.body.comment.parentPost, { $addToSet: { comments: comment._id } }))
    .then(postWithNewComment => res.status(200).send({ success: true, postWithNewComment }))
    .catch(err => res.status(400).send({ error: err, hasError: true }));
};

const deleteComment = (req, res) => {
  Comment.findByIdAndDelete(req.body.id)
    .then(deletedComment => Post.findByIdAndUpdate(
      deletedComment.parentPost,
      {
        $pull: { comments: req.body.id },
      },
      { new: true },
    ))
    .then(updatedPost => res.status(200).send({ success: true, updatedPost }))
    .catch(err => res.status(200).status({ error: err, hasError: true }));
};

const updateComment = (req, res) => Comment.findByIdAndUpdate(req.params.id, req.body.comment, { new: true })
  .then(updatedComment => res.status(200).send({ success: true, comment: updatedComment }))
  .catch(error => res.status(400).send({ error, hasError: true }));

const getCommentById = (req, res) => Comment.findById(req.body.id)
  .then(comment => res.status(200).send({ success: true, comment }))
  .catch(err => res.status(400).send({ hasError: true, error: err }));

const getAllComments = (req, res) => Comment.find()
  .populate('author', 'email')
  .populate('parentPost')
  .then(comments => res.status(200).send({ success: true, comments }));

module.exports = {
  create,
  deleteComment,
  updateComment,
  getCommentById,
  getAllComments,
};
