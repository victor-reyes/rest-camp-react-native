alter table "public"."profiles" alter column "updated_at" set default timezone('UTC'::text, now());

alter table "public"."profiles" alter column "updated_at" set not null;


