const UserController = require('../controllers/User');
const PostController = require('../controllers/Post');

module.exports = (app) => {
  // user routes

  app.post('/user', UserController.create);

  app.post('/sign-in', UserController.signIn);

  app.post('/auth', UserController.authenticateToken);

  // Post routes

  app.post('/post', PostController.create);
};
