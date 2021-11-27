const { ApolloServer } = require("apollo-server-express");
const path = require("path")

module.exports = async (app) => {
  const directives = require("require-all")(path.dirname(__dirname) + "/directives");

  const dirTypeDefs = require("require-all")({
    dirname: path.dirname(__dirname) + "/resources",
    filter: /(.+schema)\.js$/,
    recursive: true,
  });
  const dirResolver = require("require-all")({
    dirname: path.dirname(__dirname) + "/resources",
    filter: /(.+resolver)\.js$/,
    recursive: true,
  });

  let graphqlDefs = [],
    graphqlResolver = [];

  Object.keys(dirTypeDefs).map((k) => {
    graphqlDefs.push(dirTypeDefs[k][`${k}.schema`]);
  });

  Object.keys(dirResolver).map((k) => {
    graphqlResolver.push(dirResolver[k][`${k}.resolver`]);
  });

  const server = new ApolloServer({
    typeDefs: graphqlDefs,
    resolvers: graphqlResolver,
    schemaDirectives: {
      isAuth: directives.isAuth,
    },
    context: ({ req }) => ({
      user: req.user,
    }),
    playground: true,
  });
  server.applyMiddleware({ app });

  return app;
}