create policy "Enable read access for all users"
on "storage"."buckets"
as permissive
for select
to public
using (true);



