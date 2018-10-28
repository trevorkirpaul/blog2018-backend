const { ApolloServer, gql } = require("apollo-server");

// test/mock data

const books = [
  {
    title: "Hary Potter and the Chamber of Secrets",
    author: "J.K Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

// Type definitions define the shape of your data
// and which ways the data can be fetched from the
// graphql server

const typeDefs = gql`
  # Comment example using (#)

  # This "Book" type an be used in other type
  # declarations

  type Book {
    title: String
    author: String
  }

  # The "Query" type is the root of all GraphQL
  # queries

  type Query {
    books: [Book]
  }
`;

// resolvers define the technique for fetching
// the types in the schema

const resolvers = {
  Query: {
    books: () => books
  }
};

// in the mods basic csense, the  ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types

const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
