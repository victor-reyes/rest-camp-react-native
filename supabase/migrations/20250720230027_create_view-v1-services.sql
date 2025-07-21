create or replace view "v1"."services" as  SELECT id,
    name,
    rest_area_id,
    deleted,
    updated_at
   FROM services;



