const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Post = require("./models/post");
const User = require("./models/user");
const Comment = require("./models/comment");
const config = require("./config");
const tokenHelpers = require("./utils/tokenHelpers");

const { decodeToken, generateToken } = tokenHelpers;

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

  type Response {
    success: String
    error: String
    hasError: Boolean
  }

  type TokenResponse {
    message: String
    hasError: Boolean
    token: ID
  }

  type Query {
    posts: [Post]
    post(postId: ID): Post
    comments: [Comment]
  }

  type Mutation {
    createPost(title: String, body: String, token: ID): Response
    deletePost(postId: ID): Response
    signIn(email: String, password: String): TokenResponse
    createUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
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
  },

  Mutation: {
    createPost: async (root, args, context, info) => {
      const { title, body, token } = args;

      try {
        // get userID from token then validate user

        const authorID = decodeToken(args.token);

        const user = User.findById(authorID);

        if (!user) {
          return {
            success: null,
            error: "invalid user token",
            hasError: true
          };
        }

        // create post

        const newPost = await Post.create({ title, body, author: authorID });

        return {
          success: "Created post",
          error: null,
          hasError: false
        };
      } catch (error) {
        return {
          success: null,
          error: "Failed to create post",
          hasError: true
        };
      }
    },

    deletePost(root, args, context, info) {
      return Post.findByIdAndDelete(args.postId)
        .then(() => ({
          success: "Deleted Post",
          error: null,
          hasError: false
        }))
        .catch(() => ({
          success: null,
          error: "Failed to delete Post",
          hasError: true
        }));
    },

    signIn: async (root, args, context, info) => {
      /*
        Search db for user then compare password

        I'm not using the user method, comparing within this fxn
        since the user method doesn't work in this resolver.

        Could be an async issue, but at least this way works. ^_^
      */

      try {
        const user = await User.findOne({ email: args.email });

        if (!user) {
          return {
            message: "user not found",
            token: null,
            hasError: true
          };
        }

        const validPassword = await bcrypt.compare(
          args.password,
          user.password
        );

        // console.log({ user, validPassword });

        if (validPassword) {
          return {
            message: "Successfully signed in",
            token: generateToken(user._id),
            hasError: false
          };
        }

        return {
          message: "failed to sign in",
          token: null,
          hasError: true
        };
      } catch (error) {
        console.log({
          message: "server error",
          error,
          hasError: true
        });

        return {
          message: "server error, see server console",
          token: null,
          hasError: true
        };
      }
    },

    createUser(root, args, context, info) {
      const { firstName, lastName, email, password } = args;
      return User.create({ firstName, lastName, email, password })
        .then(user => user)
        .catch(() => "failed to create user");
    }
  }
};

// create then run server

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
