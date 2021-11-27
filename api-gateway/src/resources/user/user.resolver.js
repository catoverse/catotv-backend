const fetch = require("node-fetch");
const { ApolloError } = require("apollo-server");

const resolvers = {
  Query: {
    user: async (parent, args, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `query{
                              user{
                                email
                                name
                                avatar
                                id
                              }
                            }`,
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      user = data.data.user;

      user.invites = user.invites ?? 0;

      return user;
    },
    generateNewToken: async (_, args, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `query{
                            generateNewToken{
                                token
                                user{
                                id
                                name
                                email
                                }
                              }
                           }`,
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.generateNewToken;
    },
  },

  Mutation: {
    googleLogin: async (_, { user }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `mutation($user: GoogleUserInput!){
                            googleLogin(user: $user){
                                token
                                user{
                                id
                                name
                                email
                                avatar
                                }
                            }
                            }`,
          variables: { user },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.googleLogin;
    },

    appleLogin: async (_, { user }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `mutation($user: AppleUserInput!){
                        appleLogin(user: $user){
                            token
                            user{
                            id
                            name
                            email
                            avatar
                            }
                          }
                        }`,
          variables: { user },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.appleLogin;
    },

    sessionLogin: async (_, { user }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `mutation($user: SessionInput!){
                        sessionLogin(user: $user){
                            token
                            user{
                            id
                            name
                            email
                            avatar
                            }
                          }
                        }`,
          variables: { user },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.sessionLogin;
    },

    generateInvite: async (_, { email }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `mutation($email: String!){
                                generateInvite(email: $email)
                            }`,
          variables: { email },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.generateInvite;
    },

    addToWaitlist: async (_, { email }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `mutation($email: String!){
                            addToWaitlist(email: $email){
                                data
                                message
                              }
                            }`,
          variables: { email },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.addToWaitlist;
    },

    setRole: async (_, { role }, { authToken }) => {
      const response = await fetch(process.env.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify({
          query: `mutation($role: Role!){
                setRole(role: $role){
                    id
                    name
                  }
                }`,
          variables: { role },
        }),
      });

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        for (const error of data.errors) {
          throw new ApolloError(error.message, 500);
        }
      } else if (!data.data) {
        throw new ApolloError(data.message, 500);
      }

      return data.data.setRole;
    },
  },
};

module.exports = resolvers;
