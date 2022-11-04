const express = require('express');
const cors = require('cors')

const ExpressGraphQL = require("express-graphql").graphqlHTTP;

const app = express();
const api = require("./api.js");
const db = require("./database.js");

const HTTP_PORT = 4000

app.use(cors())
app.use("/graphql", ExpressGraphQL({
    schema: api.schema,
    context: { db },
    graphiql: true
  }
));

//app.get('/graphiql', ExpressGraphiQL({ endpointURL: '/graphql' }))

app.listen(HTTP_PORT, () => {
  console.log("Server running on http://localhost:%PORT%/".replace("%PORT%",HTTP_PORT));
});
