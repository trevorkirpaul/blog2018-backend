const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

const Post = require("./models/post");
const User = require("./models/user");
const Comment = require("./models/comment");
const config = require("./config");

const {
  mlab: { username, password, dbURI }
} = config;

// connect to db

mongoose.connect(
  dbURI,
  {
    auth: {
      user: username,
      password
    },
    useNewUrlParser: true,
    autoIndex: false
  },
  err => {
    if (err) return console.log(err);

    return console.log("connected to database");
  }
);

// define what the data will look like
// including the queries' response

const typeDefs = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Comment {
    id: ID
    body: String
    author: User
    parentPost: Post
  }

  type Post {
    id: ID
    title: String
    author: User
    body: String
    comments: [Comment]
  }

  type Query {
    posts: [Post]
    post(postId: ID): Post
    comments: [Comment]
  }
`;

// create the requests, queries need associated type defs

const resolvers = {
  Query: {
    posts() {
      return Post.find()
        .populate("author")
        .populate("comments")
        .then(res => res)
        .catch(err => console.log({ error: err }));
    },

    post(root, args, context, info) {
      return Post.findById(args.postId)
        .populate("author")
        .populate("comments")
        .then(res => res)
        .catch(err => console.log({ error: err }));
    },

    comments() {
      return Comment.find()
        .populate("author")
        .populate("parentPost")
        .then(res => res)
        .catch(err => console.log({ error: err }));
    }
  }
};

// create then run server

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
