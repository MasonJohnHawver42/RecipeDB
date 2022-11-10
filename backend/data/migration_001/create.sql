CREATE TABLE IF NOT EXISTS ingredients (
	ingredient_id INTEGER PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS recipes (
	recipe_id INTEGER PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS quantities (
   ingredient_id INTEGER NOT NULL,
   recipe_id INTEGER NOT NULL,
   PRIMARY KEY (ingredient_id, recipe_id),
   FOREIGN KEY (ingredient_id)
      REFERENCES ingredients (ingredient_id)
         ON DELETE CASCADE
         ON UPDATE NO ACTION,
   FOREIGN KEY (recipe_id)
      REFERENCES recipes (recipe_id)
         ON DELETE CASCADE
         ON UPDATE NO ACTION
);
