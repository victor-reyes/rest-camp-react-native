drop policy "Authenticated users can update their own reviews" on "public"."reviews";

create policy "Authenticated users can update their own reviews"
on "public"."reviews"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = owner_id));



