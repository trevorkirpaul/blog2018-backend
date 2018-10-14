const UserController = require('../controllers/User');
const PostController = require('../controllers/Post');
const routeProtection = require('../utils/routeProtection');

const { isValidUser } = routeProtection;

module.exports = (app) => {
  // user routes

  app.post('/user', UserController.create);

  app.post('/sign-in', UserController.signIn);

  app.post('/auth', UserController.authenticateToken);

  // Post routes

  app.post('/post', isValidUser, PostController.create);

  app.get('/posts', PostController.getAllPosts);

  app.put('/post', PostController.updatePostById);
};
