delete from recipes
where id = $1
returning *;

delete from make_recipe
where recpies_id = $1;

