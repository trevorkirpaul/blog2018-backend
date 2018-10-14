const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const routes = require('./routes');

const app = express();

const port = 3001;

const {
  mlab: { username, password, dbURI },
} = config;

// connect to db

mongoose.connect(
  dbURI,
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
