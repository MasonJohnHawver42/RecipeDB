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

    complete_recipes:  (root, {ing_ids}, ctx, info) => {
      let ids_str = "(" + ing_ids.join(", ") + ")"
      console.log(ids_str, ing_ids.length.toString())
      return new Promise((resolve, reject) => {
          ctx.db.all(`
            select rec.recipe_id as id, rec.name as name from
            (select recipe_id, count(*) as cnt from quantities group by recipe_id) t1
            inner join
            (select recipe_id, count(*) as cnt from quantities where ingredient_id in ` + ids_str  + ` group by recipe_id) t2
            on t1.recipe_id = t2.recipe_id
            left join recipes as rec
            on rec.recipe_id = t1.recipe_id
            where t2.cnt = ` + ing_ids.length.toString() + ` or t1.cnt = t2.cnt;
          `, function (err, rows) {
              if (err) { reject([]); }
              resolve(rows);
          });
      });
    },

    sorted_recipes:  (root, {ing_ids}, ctx, info) => {
      let ids_str = "(" + ing_ids.join(", ") + ")"
      console.log(ids_str, ing_ids.length.toString())
      return new Promise((resolve, reject) => {
          ctx.db.all(`
            select rec.recipe_id as id, rec.name as name from
            (select recipe_id, count(*) as cnt from quantities group by recipe_id) t1
            inner join
            (select recipe_id, count(*) as cnt from quantities where ingredient_id in ` + ids_str  + ` group by recipe_id) t2
            on t1.recipe_id = t2.recipe_id
            left join recipes as rec
            on rec.recipe_id = t1.recipe_id
            order by min(` + ing_ids.length.toString() + `, t1.cnt) - t2.cnt;
          `, function (err, rows) {
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

// find all recipes that have atleast one then sort them
// Select rec.recipe_id, rec.name from quantities left join recipes as rec on quantities.recipe_id = rec.recipe_id where quantities.ingredient_id in (1, 2, 3) group by rec.recipe_id order by count(*) DESC;


// find all recipes that have atleast one then sort them corectly
// sqlite> select rec.recipe_id, rec.name from
//    ...> (select recipe_id, count(*) as cnt from quantities group by recipe_id) t1
//    ...> inner join
//    ...> (select recipe_id, count(*) as cnt from quantities where ingredient_id in (1, 2, 3)!!! group by recipe_id) t2
//    ...> on t1.recipe_id = t2.recipe_id
//    ...> left join recipes as rec
//    ...> on rec.recipe_id = t1.recipe_id
//    ...> order by min(3!!!, t1.cnt) - t2.cnt;

// sqlite> select * from
//    ...> (select recipe_id, count(*) as cnt from quantities group by recipe_id) t1
//    ...> inner join
//    ...> (select recipe_id, count(*) as cnt from quantities where ingredient_id in (1, 2, 3) group by recipe_id) t2
//    ...> on t1.recipe_id = t2.recipe_id
//    ...> where t1.cnt = t2.cnt;
