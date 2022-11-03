const express = require('express');

const ExpressGraphQL = require("express-graphql").graphqlHTTP;

const app = express();
const schema = require("./graphql.js");

const HTTP_PORT = 4000

app.use("/graphql", ExpressGraphQL({ schema: schema.schema, graphiql: true}));

app.listen(HTTP_PORT, () => {
  console.log("Server running on http://localhost:%PORT%/".replace("%PORT%",HTTP_PORT));
});
