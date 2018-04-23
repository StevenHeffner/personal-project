select ingredients.name as item, make_recipe.recpies_id as make_recipe_recipe_id, make_recipe.id as make_recipe_ID,ingredients_id, quantity, ingredients.measurement, ingredients.img
from make_recipe join ingredients on ingredients.id = ingredients_id
-- join recipes on recipes.id = recpies_id
where recpies_id = $1
