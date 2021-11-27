const { SchemaDirectiveVisitor } = require("apollo-server-express");
const { defaultFieldResolver } = require("graphql");
const { ApolloError } = require("apollo-server");

class isAuth extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args) {
      // extract user from context
      const { user } = args[2];

      if (!user) {
        throw new ApolloError("User not authorized", 403);
      }

      return resolve.apply(this, args);
    };
  }
}

module.exports = isAuth;
