const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const config = require('./config');
const routes = require('./routes');
const GraphQLSchema = require('./graphql/Schema');

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

    return console.log('connected to database');
  },
);

// middleware

app.use(cors());

app.use(
  express.json({
    type: 'application/json',
  }),
);

// graphQL

app.use(
  '/graphql',
  graphqlHTTP({
    schema: GraphQLSchema,
    graphiql: true,
  }),
);

// routes

routes(app);

app.listen(port, () => console.log(`Running on port: ${port}`));
