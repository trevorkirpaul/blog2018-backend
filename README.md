# blog 2018 backend

I'm creating a simple blog as a personal project. This backend will start off as a simple express server with REST endpoints. Eventually I'll create a graphQL endpoint.

## Project Status

- [x] create models, controllers and routes for blog functionality
- [x] implement graphQL
- [x] implement all queries and mutations for blog functionality (graphQL)
- [ ] implement Apollo Server & all queries + mutations
- [ ] implement webpack and modern tooling
- [ ] refactor codebase to use class syntax
- [ ] convert to typescript

## Instructions

If you want to run this app locally, you'll need to create a `config.js` file at the project root. You will also need to create an mLab database, or another mongo instance of your choice. This app is set up to connect to mlab, other instances might require more setup.

```javascript
module.exports = {
  secret: "", // secret used for JWT encoding
  mlab: {
    username: "", // enter the user you created on mLab
    password: "", // enter the pw from the user you created
    dbURI: "" // mLab URI or your mongo instance URI/location
  }
};
```

This project also contains linting rules and it is required that all code follows the linting rules.

## GraphQL

### Example graphiql query for a post by ID

```
query($id:String!) {
  post(id: $id) {
    title
    body
    author {
      _id
      firstName
      lastName
      email
    }
    comments {
      _id
      body
      author
      parentPost
    }
  }
}
```
