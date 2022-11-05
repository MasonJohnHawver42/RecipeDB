const { makeExecutableSchema } = require('graphql-tools');
const { readFileSync } = require('fs')

const SCHEMASOURCE = "schema.graphql"

var typeDefs = readFileSync(SCHEMASOURCE).toString('utf-8')

var resolvers = {
  Query: {
    message: () => 'Hello World!',

    all_ingredients: (root, args, ctx, info) => {
        return new Promise((resolve, reject) => {
            ctx.db.all("SELECT ingredient_id as id, name FROM ingredients;", function (err, rows) {
                if (err) { reject([]); }
                resolve(rows);
            });
        });
    },

    ingredient: (root, {id}, ctx, info) => {
      return new Promise((resolve, reject) => {
          ctx.db.all("SELECT ingredient_id as id, name FROM ingredients where ingredients.ingredient_id = (?);", [id], function (err, rows) {
              if (err) { reject([]); }
              resolve(rows[0]);
          });
      });
    },

    all_recipes: (root, args, ctx, info) => {
      return new Promise((resolve, reject) => {
          ctx.db.all("SELECT recipe_id as id, name FROM recipes;", function (err, rows) {
              if (err) { reject([]); }
              resolve(rows);
          });
      });
    },

    recipe: (root, {id}, ctx, info) => {
      return new Promise((resolve, reject) => {
          ctx.db.all("SELECT recipe_id as id, name FROM recipes where recipes.recipe_id = (?);", [id], function (err, rows) {
              if (err) { reject([]); }
              resolve(rows[0]);
          });
      });
    },

  }, //end of querry

  Recipe: {
      ingredients : ({ id }, args, ctx, info) => {
        return new Promise((resolve, reject) => {
            ctx.db.all(`SELECT ing.ingredient_id as id, ing.name from quantities
                        left join ingredients as ing on quantities.ingredient_id = ing.ingredient_id
                        where quantities.recipe_id = (?);`, [id], function (err, rows) {
                if (err) { reject([]); }
                resolve(rows);
            });
        });
      }
  }

};

module.exports = { schema : makeExecutableSchema({ typeDefs, resolvers }) }
