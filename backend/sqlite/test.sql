INSERT INTO ingredients (ingredient_id, name) VALUES (1, "bread");
INSERT INTO ingredients (ingredient_id, name) VALUES (2, "ham");
INSERT INTO ingredients (ingredient_id, name) VALUES (3, "mayo");
INSERT INTO ingredients (ingredient_id, name) VALUES (4, "chesse");
INSERT INTO ingredients (ingredient_id, name) VALUES (5, "butter");
INSERT INTO ingredients (ingredient_id, name) VALUES (6, "egg");

INSERT INTO recipes (recipe_id, name) VALUES (1, "Ham Sandwitch");
INSERT INTO recipes (recipe_id, name) VALUES (2, "Grilled Chesse");
INSERT INTO recipes (recipe_id, name) VALUES (3, "Scrambled Eggs");

INSERT INTO quantities (ingredient_id, recipe_id) VALUES (1, 1);
INSERT INTO quantities (ingredient_id, recipe_id) VALUES (2, 1);
INSERT INTO quantities (ingredient_id, recipe_id) VALUES (3, 1);

INSERT INTO quantities (ingredient_id, recipe_id) VALUES (1, 2);
INSERT INTO quantities (ingredient_id, recipe_id) VALUES (4, 2);
INSERT INTO quantities (ingredient_id, recipe_id) VALUES (5, 2);

INSERT INTO quantities (ingredient_id, recipe_id) VALUES (6, 3);
INSERT INTO quantities (ingredient_id, recipe_id) VALUES (5, 3);
