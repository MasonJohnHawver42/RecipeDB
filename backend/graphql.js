const graphql = require("graphql");
const db = require("./database.js");

var schema = graphql.buildSchema(`
    type Ingredient {
        ingredient_id : ID
        name: String
    }

    type Recipe {
        id : ID
        name : String
        ingredients : [Ingredient]
    }

    type Query {
        all_ingredients: [Ingredient]
        all_recipes: [Recipe]

        ingredient(id: ID!) : Ingredient
        recipe(id: ID!) : Recipe

        message : String
    }
`);

var root = {
    message: () => 'Hello World!',

    all_ingredients: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM ingredients;", function (err, rows) {
                if (err) { reject([]); }
                console.log(rows);
                resolve(rows);
            }); 
        });
    },

    all_recipes: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM recipes;", function (err, rows) {
                if (err) { reject([]); }
                console.log(rows);
                resolve(rows);
            }); 
        });
    },

    // Recipe: {
    //     ingredients
    // }

};

module.exports = { schema, root }
