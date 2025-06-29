create schema if not exists "log";

create table "log"."photos" (
    "url" text not null,
    "thumbnail_url" text not null,
    "description" text,
    "rest_area_id" uuid not null,
    "updated_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "deleted" boolean not null default false
);


create table "log"."rest_areas" (
    "id" uuid not null default gen_random_uuid(),
    "updated_at" timestamp with time zone not null,
    "name" text not null,
    "latitude" real not null,
    "longitude" real not null,
    "description" text,
    "local_description" text,
    "status" v1.status not null,
    "trafikverket_id" bytea not null,
    "deleted" boolean not null,
    "processed" boolean not null default false
);


alter table "log"."rest_areas" enable row level security;

create table "log"."services" (
    "name" service not null,
    "rest_area_id" uuid not null
);


CREATE UNIQUE INDEX rest_areas_pkey ON log.rest_areas USING btree (id);

alter table "log"."rest_areas" add constraint "rest_areas_pkey" PRIMARY KEY using index "rest_areas_pkey";

alter table "log"."photos" add constraint "photos_rest_area_id_fkey" FOREIGN KEY (rest_area_id) REFERENCES log.rest_areas(id) not valid;

alter table "log"."photos" validate constraint "photos_rest_area_id_fkey";

alter table "log"."services" add constraint "services_rest_area_id_fkey" FOREIGN KEY (rest_area_id) REFERENCES log.rest_areas(id) not valid;

alter table "log"."services" validate constraint "services_rest_area_id_fkey";

create or replace view "log"."rest_area_services_photos" as  SELECT ra.id,
    ra.updated_at,
    ra.name,
    ra.latitude,
    ra.longitude,
    ra.description,
    ra.local_description,
    ra.status,
    ra.trafikverket_id,
    ra.deleted,
    ra.processed,
    array_agg(DISTINCT s.name) AS services,
    array_agg(DISTINCT p.description) AS photos
   FROM ((log.rest_areas ra
     LEFT JOIN log.services s ON ((s.rest_area_id = ra.id)))
     LEFT JOIN log.photos p ON ((p.rest_area_id = ra.id)))
  GROUP BY ra.id;


grant delete on table "log"."photos" to "anon";

grant insert on table "log"."photos" to "anon";

grant references on table "log"."photos" to "anon";

grant select on table "log"."photos" to "anon";

grant trigger on table "log"."photos" to "anon";

grant truncate on table "log"."photos" to "anon";

grant update on table "log"."photos" to "anon";

grant delete on table "log"."photos" to "authenticated";

grant insert on table "log"."photos" to "authenticated";

grant references on table "log"."photos" to "authenticated";

grant select on table "log"."photos" to "authenticated";

grant trigger on table "log"."photos" to "authenticated";

grant truncate on table "log"."photos" to "authenticated";

grant update on table "log"."photos" to "authenticated";

grant delete on table "log"."photos" to "service_role";

grant insert on table "log"."photos" to "service_role";

grant references on table "log"."photos" to "service_role";

grant select on table "log"."photos" to "service_role";

grant trigger on table "log"."photos" to "service_role";

grant truncate on table "log"."photos" to "service_role";

grant update on table "log"."photos" to "service_role";

grant delete on table "log"."rest_areas" to "anon";

grant insert on table "log"."rest_areas" to "anon";

grant references on table "log"."rest_areas" to "anon";

grant select on table "log"."rest_areas" to "anon";

grant trigger on table "log"."rest_areas" to "anon";

grant truncate on table "log"."rest_areas" to "anon";

grant update on table "log"."rest_areas" to "anon";

grant delete on table "log"."rest_areas" to "authenticated";

grant insert on table "log"."rest_areas" to "authenticated";

grant references on table "log"."rest_areas" to "authenticated";

grant select on table "log"."rest_areas" to "authenticated";

grant trigger on table "log"."rest_areas" to "authenticated";

grant truncate on table "log"."rest_areas" to "authenticated";

grant update on table "log"."rest_areas" to "authenticated";

grant delete on table "log"."rest_areas" to "service_role";

grant insert on table "log"."rest_areas" to "service_role";

grant references on table "log"."rest_areas" to "service_role";

grant select on table "log"."rest_areas" to "service_role";

grant trigger on table "log"."rest_areas" to "service_role";

grant truncate on table "log"."rest_areas" to "service_role";

grant update on table "log"."rest_areas" to "service_role";

grant delete on table "log"."services" to "anon";

grant insert on table "log"."services" to "anon";

grant references on table "log"."services" to "anon";

grant select on table "log"."services" to "anon";

grant trigger on table "log"."services" to "anon";

grant truncate on table "log"."services" to "anon";

grant update on table "log"."services" to "anon";

grant delete on table "log"."services" to "authenticated";

grant insert on table "log"."services" to "authenticated";

grant references on table "log"."services" to "authenticated";

grant select on table "log"."services" to "authenticated";

grant trigger on table "log"."services" to "authenticated";

grant truncate on table "log"."services" to "authenticated";

grant update on table "log"."services" to "authenticated";

grant delete on table "log"."services" to "service_role";

grant insert on table "log"."services" to "service_role";

grant references on table "log"."services" to "service_role";

grant select on table "log"."services" to "service_role";

grant trigger on table "log"."services" to "service_role";

grant truncate on table "log"."services" to "service_role";

grant update on table "log"."services" to "service_role";


