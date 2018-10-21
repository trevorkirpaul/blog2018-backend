const axios = require('axios');
const graphql = require('graphql');

const Post = require('../models/post');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = graphql;

const CommentType = new GraphQLObjectType({
  name: 'comment',
  fields: {
    id: { type: GraphQLID },
    body: { type: GraphQLString },
    author: { type: GraphQLString },
    parentPost: { type: GraphQLString },
    v: { type: GraphQLInt },
  },
});

const AuthorType = new GraphQLObjectType({
  name: 'author',
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

const PostType = new GraphQLObjectType({
  name: 'post',
  fields: {
    comments: { type: new GraphQLList(CommentType) },
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: { type: AuthorType },
    v: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    post: {
      type: PostType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3001/post/${args.id}`)
          .then(response => response.data.post)
          .catch(err => err);
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve() {
        return axios
          .get('http://localhost:3001/posts')
          .then(response => response.data.posts)
          .catch(err => err);
      },
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',

  fields: {
    createPost: {
      type: PostType,
      args: {
        // token: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { title, body, author }) {
        return Post.create({ title, body, author })
          .then((res) => {
            console.log(res);
            return res;
          })
          .catch(err => err);
      },
    },

    deletePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id }) {
        return Post.findByIdAndDelete(id)
          .then((res) => {
            console.log(res);
            return res;
          })
          .catch(err => err);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
