// import express from "express";
import { connect } from "mongoose";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import "reflect-metadata";
import { buildSchema } from "type-graphql";

import { dbConnection } from "./databases/mongo";

import { UserProfileResolver } from "./resolvers/UserProfile";

class App {
  public port: string | number;
  public env: string;

  constructor() {
    this.port = process.env.PORT || 4000;
    this.env = process.env.NODE_ENV || "development";
    this.connectToDatabase();
  }

  public async listen() {
    const schema = await buildSchema({
      resolvers: [UserProfileResolver],
      emitSchemaFile: true,
    });

    const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    server.listen(this.port, () => {
      console.log(
        `=================================
        🚀 App listening on the port ${this.port}
        ======= ENV: ${this.env} =======
        ==================================`
      );
    });
  }

  private connectToDatabase() {
    connect(dbConnection.url, dbConnection.options);
  }
}

export default App;
