create table users
(id serial primary key, display_name text, auth_id text, img text)

create table ingredients
(id serial primary key, name text, measurement text)

create table make_recipe
(id serial primary key, recpies_id integer, ingredients_id integer, quantity integer)

create table recipes
(id serial primary key, name text)

insert into recipes (name)
values('Chicken Parmesan')

insert into ingredients (name, measurement)
values('Chicken Breast', 'units'),('Eggs', 'units'),('Panko Bread Crumbs', 'cups'),('Parmesan Cheese', 'cups'), ('Olive Oil', 'cups'), ('Tomato Sauce', 'cups')

-- insert into make_recipe (recpies_id, ingredients_id, quantity)
-- values (2,3,5)

-- select * from recipes

-- select * from ingredients 
select ingredients_id, quantity, ingredients.name, ingredients.measurement
from make_recipe 
join ingredients on ingredients.id = ingredients_id
where recpies_id = 1


------Dummy Data------



insert into recipes (name)
values('Spaghetti Aglio')

insert into ingredients(name, measurement)
values('Uncooked Spaghetti', 'lbs'), ('Garlic Cloves', 'units'), ('Red Pepper Flakes', 'tsp'), ('Chopped Parsley','cups'), ('Parmigiano-Reggiano Cheese','cups')


insert into make_recipe (recpies_id, ingredients_id, quantity)
values (2,7,1), (2,8,6), (2,9,.25), (2,10,.25), (2,11,1), (2,5,.5)

----good selct----
select ingredients.name, quantity, ingredients.measurement
from make_recipe 
join ingredients on ingredients.id = ingredients_id
where recpies_id = 1

app.get("/recipes", (req, res) => {
  const db = app.get("db");
  db.get_all_ingredients().then(ingredients => {
    db.get_recipes_names().then(names => {
      res.status(200).send([{ recipeNames: names, ingredients: ingredients }]);
    });
  });
});

app.post("/recipes", async (req, res) => {
  const db = app.get("db");
  const { recipeName, ingredients, img } = req.body;
  // let ingredientId = []
  const recipeId = await db.find_add_recipeName([recipeName]);
  let mapPromise = new Promise(function(resolve, reject) {
    ingredients.map(async function(ingredient, i) {
      let resIngredientId = await db.find_add_ingredient([
        ingredient.item,
        ingredient.measurement
      ]);
      // ingredientId.push(resIngredientId[0].id)
      await db.add_make_recipe([
        recipeId[0].id,
        resIngredientId[0].id,
        ingredient.quantity
      ]);
      resolve(i === ingredients.length - 1)
      reject(i != ingredients.length - 1)

      // if (i === ingredients.length - 1) {resolve()};
    });
  });
  
  mapPromise.then(res.status(200).send("Blam"));
});

