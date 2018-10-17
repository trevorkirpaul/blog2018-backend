const UserController = require('../controllers/User');
const PostController = require('../controllers/Post');
const CommentController = require('../controllers/comment');
const routeProtection = require('../utils/routeProtection');

const { isValidUser, isCommentOwner } = routeProtection;

module.exports = (app) => {
  // user routes

  app.post('/user', UserController.create);

  app.post('/sign-in', UserController.signIn);

  app.post('/auth', UserController.authenticateToken);

  // Post routes

  app.post('/post', isValidUser, PostController.create);

  app.get('/posts', PostController.getAllPosts);

  app.get('/post/:id', PostController.findPostById);

  app.put('/post', isValidUser, PostController.updatePostById);

  app.delete('/post', isValidUser, PostController.deletePostById);

  //  Comment routes

  app.post('/comment', isValidUser, CommentController.create);

  app.get('/comment/:id', CommentController.getCommentById);

  app.get('/comments', CommentController.getAllComments);

  app.delete('/comment', isCommentOwner, CommentController.deleteComment);

  app.put('/comment', CommentController.updateComment);
};
