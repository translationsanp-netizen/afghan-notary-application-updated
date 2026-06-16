
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;

DROP POLICY IF EXISTS "Public reads cms-media" ON storage.objects;
CREATE POLICY "Authenticated can list cms-media"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'cms-media');
-- Public file URLs continue to work via the public bucket's signed CDN path;
-- anonymous clients cannot enumerate the bucket via the API.
