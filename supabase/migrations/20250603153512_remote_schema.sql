alter table "public"."photos" add column "updated_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text);

alter table "public"."rest_areas" add column "trafikverket_id" bytea not null;

alter table "public"."rest_areas" alter column "updated_at" set not null;

alter table "public"."reviews" add column "updated_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text);

CREATE UNIQUE INDEX rest_areas_trafikverket_id_key ON public.rest_areas USING btree (trafikverket_id);

alter table "public"."rest_areas" add constraint "rest_areas_trafikverket_id_key" UNIQUE using index "rest_areas_trafikverket_id_key";


