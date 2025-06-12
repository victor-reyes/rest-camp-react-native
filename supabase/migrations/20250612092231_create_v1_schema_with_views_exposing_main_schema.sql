create schema if not exists "v1";

create type "v1"."service" as enum ('refuseBin', 'toilet', 'picnicFacilities', 'playground', 'dumpingStation', 'touristInformation', 'restaurant', 'petrolStation');

create or replace view "v1"."photos" as  SELECT url,
    thumbnail_url,
    description,
    rest_area_id,
    review_id,
    owner_id,
    updated_at,
    deleted
   FROM photos;


create or replace view "v1"."profiles" as  SELECT id,
    updated_at,
    username,
    full_name,
    avatar_url,
    location
   FROM profiles;


create or replace view "v1"."rest_areas_with_services" as  SELECT ra.id,
    ra.updated_at,
    ra.name,
    ra.latitude,
    ra.longitude,
    ra.description,
    ra.local_description,
    ra.status,
    ra.trafikverket_id,
    ra.deleted,
    json_agg(s.*) AS services
   FROM (rest_areas ra
     LEFT JOIN services s ON ((ra.id = s.rest_area_id)))
  GROUP BY ra.id;


create or replace view "v1"."reviews" as  SELECT id,
    owner_id,
    recension,
    score,
    rest_area_id,
    updated_at,
    deleted
   FROM reviews;



