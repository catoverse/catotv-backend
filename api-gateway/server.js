require("dotenv").config();

const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const dirTypeDefs = require("require-all")({
    dirname: __dirname + "/src/resources",
    filter: /(.+schema)\.js$/,
    recursive: true,
});

const dirResolver = require("require-all")({
    dirname: __dirname + "/src/resources",
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

async function startApolloServer() {
    const app = express();

    const server = new ApolloServer({
        typeDefs: graphqlDefs,
        resolvers: graphqlResolver,
        context: ({ req }) => ({
            authToken: req.header("authToken") || "",
        }),
        playground: true,
    });

    await server.start();

    server.applyMiddleware({ app });

    app.use((req, res) => {
        res.status(200);
        res.send(
            "<h1>Greetings fellow avenger!</h1> <p>You've reached the api gateway endpoint.</p> <p>Kindly forward your GraphQL requests to <a href='/graphql'>`/graphql`</a> appended to this host url.</p> <p>May your coding jouney be utterly blissful <span>😀✌🏻</span></p>"
        );
        res.end();
    });

    await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready!`);

    return { server, app };
}

startApolloServer();
