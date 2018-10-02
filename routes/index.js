const UserController = require('../controllers/User');
const PostController = require('../controllers/Post');

module.exports = (app) => {
  // user routes

  app.post('/user', UserController.create);

  // Post routes

  app.post('/post', PostController.create);
};
