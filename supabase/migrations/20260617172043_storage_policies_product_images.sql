create policy "Allow authenticated uploads"
on storage.objects for insert
to authenticated
with check (bucket_id = 'product-images');

create policy "Allow authenticated updates"
on storage.objects for update
to authenticated
using (bucket_id = 'product-images')
with check (bucket_id = 'product-images');

create policy "Allow authenticated selects"
on storage.objects for select
to authenticated
using (bucket_id = 'product-images');
