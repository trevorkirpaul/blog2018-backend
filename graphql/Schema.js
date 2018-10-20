const axios = require('axios');
const graphql = require('graphql');

const {
  GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList,
} = graphql;

const CommentType = new GraphQLObjectType({
  name: 'comment',
  fields: {
    _id: { type: GraphQLString },
    body: { type: GraphQLString },
    author: { type: GraphQLString },
    parentPost: { type: GraphQLString },
    v: { type: GraphQLInt },
  },
});

const AuthorType = new GraphQLObjectType({
  name: 'author',
  fields: {
    _id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

const PostType = new GraphQLObjectType({
  name: 'post',
  fields: {
    comments: { type: new GraphQLList(CommentType) },
    _id: { type: GraphQLString },
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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
