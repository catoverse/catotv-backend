const mongoLoader = require("./mongo");
const expressLoader = require("./express");
const graphQLLoader = require("./graphql");
const firebaseLoader = require("./firebase");

module.exports = async ({ expressApp }) => {
  await mongoLoader();
  console.log("[+] MongoDB connected");
  await expressLoader(expressApp);
  console.log("[+] Express Application created");
  await graphQLLoader(expressApp);
  console.log("[+] GraphQL server started");
  await firebaseLoader();
  console.log("[+] Firebase Configured");

  console.log("Server loaded with all modules");
};
