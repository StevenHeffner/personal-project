select  ingredients.name as item, ingredients_id, quantity, ingredients.measurement, ingredients.img
from make_recipe join ingredients on ingredients.id = ingredients_id
-- join recipes on recipes.id = recpies_id
where recpies_id = $1
