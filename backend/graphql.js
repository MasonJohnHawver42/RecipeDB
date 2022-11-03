const graphql = require("graphql");
const db = require("./database.js");

const IngredientType = new graphql.GraphQLObjectType({
    name: "Ingredient",
    fields: {
        ingredient_id: { type: graphql.GraphQLID },
        name: { type: graphql.GraphQLString }
    }
});

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        ingredients: {
            type: new graphql.GraphQLList(IngredientType),
            resolve: (root, args, context, info) => {
                return new Promise((resolve, reject) => {
                    db.all("SELECT * FROM ingredients;", function (err, rows) {
                        if (err) { reject([]); }
                        resolve(rows);
                    });
                });

            }
        },
        ingredient: {
            type: IngredientType,
            args: { id: { type: new graphql.GraphQLNonNull(graphql.GraphQLID) } },
            resolve: (root, { id }, context, info) => {
                return new Promise((resolve, reject) => {
                  console.log(id);
                    db.all("SELECT * FROM ingredients WHERE ingredient_id = (?);", [id], function (err, rows) {
                        if (err) { reject(null); }
                        resolve(rows[0]);
                    });
                });
            }
        }
    }
});

var mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createIngredient: {
        type: IngredientType,
        args: {
          name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) }
        },
        resolve: (root, {name}) => {
          return new Promise((resolve, reject) => {
              db.run('INSERT INTO ingredients (name) VALUES (?);', [name], (err) => {
                  if(err) { reject(null); }
                  db.get("SELECT last_insert_rowid() as id", (err, row) => {
                      resolve({ id: row["id"], name: name });
                  });
              });
          })
        }
      }
    }
});


const schema = new graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

module.exports = { schema }
