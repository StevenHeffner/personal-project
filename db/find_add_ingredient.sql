insert into ingredients (name, measurement, img)
values ($1,$2,$3)
on conflict (name) DO update set name = EXCLUDED.name
returning id;