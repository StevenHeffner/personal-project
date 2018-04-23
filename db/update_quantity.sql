UPDATE make_recipe
set quantity = $1
where recpies_id = $2
and id = $3