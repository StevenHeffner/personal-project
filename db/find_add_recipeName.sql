insert into recipes (name, img)
values ($1, $2)
on conflict (name) DO update set name = EXCLUDED.name
returning id;