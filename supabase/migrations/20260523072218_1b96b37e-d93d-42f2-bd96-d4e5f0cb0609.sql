-- Avoid calling admin role checks from public visitor policies.
DROP POLICY IF EXISTS "Public reads active assistant knowledge" ON public.assistant_knowledge;
CREATE POLICY "Public reads active assistant knowledge"
ON public.assistant_knowledge
FOR SELECT
USING (active = true);

DROP POLICY IF EXISTS "Admins read assistant knowledge" ON public.assistant_knowledge;
CREATE POLICY "Admins read assistant knowledge"
ON public.assistant_knowledge
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Public reads active assistant faqs" ON public.assistant_faqs;
CREATE POLICY "Public reads active assistant faqs"
ON public.assistant_faqs
FOR SELECT
USING (active = true);

DROP POLICY IF EXISTS "Admins read assistant faqs" ON public.assistant_faqs;
CREATE POLICY "Admins read assistant faqs"
ON public.assistant_faqs
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Authenticated can list cms-media" ON storage.objects;
DROP POLICY IF EXISTS "Admins read cms-media" ON storage.objects;
CREATE POLICY "Admins read cms-media"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'cms-media' AND has_role(auth.uid(), 'admin'::app_role));