const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const routes = require('./routes');

const app = express();

const port = 3001;

const {
  mlab: { username, password },
} = config;

// connect to db

mongoose.connect(
  'mongodb://@ds121203.mlab.com:21203/blog2018',
  {
    auth: {
      user: username,
      password,
    },
    useNewUrlParser: true,
    autoIndex: false,
  },
  (err) => {
    if (err) return console.log(err);

    return console.log('connected to databse');
  },
);

// middleware

app.use(
  express.json({
    type: 'application/json',
  }),
);

// routes

routes(app);

app.listen(port, () => console.log(`Running on port: ${port}`));
