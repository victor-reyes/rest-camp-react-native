alter table "public"."photos" alter column "owner_id" set default auth.uid();

alter table "public"."reviews" alter column "owner_id" set default auth.uid();


