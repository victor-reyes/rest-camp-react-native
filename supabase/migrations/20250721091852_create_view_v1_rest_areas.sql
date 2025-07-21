create or replace view "v1"."rest_areas" as  SELECT id,
    name,
    latitude,
    longitude,
    description,
    local_description,
    status,
    updated_at,
    deleted
   FROM rest_areas;



