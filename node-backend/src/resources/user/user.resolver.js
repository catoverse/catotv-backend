const UserService = require("./user.service");

const resolvers = {
  Query: {
    user: async (_, args, { user }) => {
      return await UserService.user(user.id);
    },

    generateNewToken: async (_, args, { user }) => {
      return await UserService.generateNewToken(user);
    },
  },

  Mutation: {
    googleLogin: async (_, args) => {
      return await UserService.googleLogin(args.user);
    },

    setRole: async (_, { role }, { user }) => {
      return await UserService.setRole(role, user.id);
    },
  },
};

module.exports = resolvers;
