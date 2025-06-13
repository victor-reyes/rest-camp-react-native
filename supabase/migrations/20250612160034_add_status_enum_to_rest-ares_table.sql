

drop view if exists "v1"."rest_areas_with_services";

create type "v1"."status" as enum ('inOperation', 'limitedOperation', 'outOfService');

alter table "public"."rest_areas" alter column "status" set data type v1.status using "status"::v1.status;





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



