alter table "public"."photos" add column "deleted" boolean not null default false;

alter table "public"."rest_areas" add column "deleted" boolean not null default false;

alter table "public"."rest_areas" alter column "name" set not null;

alter table "public"."reviews" add column "deleted" boolean not null default false;


