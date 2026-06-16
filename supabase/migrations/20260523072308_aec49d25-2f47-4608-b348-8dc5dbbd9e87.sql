CREATE SCHEMA IF NOT EXISTS app_private;

CREATE OR REPLACE FUNCTION app_private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

GRANT USAGE ON SCHEMA app_private TO anon, authenticated;
GRANT EXECUTE ON FUNCTION app_private.has_role(uuid, public.app_role) TO anon, authenticated;

-- Replace policies on existing CMS tables.
DROP POLICY IF EXISTS "Admins manage insights" ON public.insights;
CREATE POLICY "Admins manage insights"
ON public.insights
FOR ALL
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Public reads published insights" ON public.insights;
CREATE POLICY "Public reads published insights"
ON public.insights
FOR SELECT
USING (published = true OR app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins manage jobs" ON public.jobs;
CREATE POLICY "Admins manage jobs"
ON public.jobs
FOR ALL
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Public reads open jobs" ON public.jobs;
CREATE POLICY "Public reads open jobs"
ON public.jobs
FOR SELECT
USING (status = 'open' OR app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins manage partners" ON public.partners;
CREATE POLICY "Admins manage partners"
ON public.partners
FOR ALL
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Public reads active partners" ON public.partners;
CREATE POLICY "Public reads active partners"
ON public.partners
FOR SELECT
USING (active = true OR app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins manage team" ON public.team_members;
CREATE POLICY "Admins manage team"
ON public.team_members
FOR ALL
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Public reads active team" ON public.team_members;
CREATE POLICY "Public reads active team"
ON public.team_members
FOR SELECT
USING (active = true OR app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins manage testimonials" ON public.testimonials;
CREATE POLICY "Admins manage testimonials"
ON public.testimonials
FOR ALL
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Public reads active testimonials" ON public.testimonials;
CREATE POLICY "Public reads active testimonials"
ON public.testimonials
FOR SELECT
USING (active = true OR app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
CREATE POLICY "Admins manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR app_private.has_role(auth.uid(), 'admin'::public.app_role));

-- Replace assistant/admin policies.
DROP POLICY IF EXISTS "Admins manage assistant knowledge" ON public.assistant_knowledge;
CREATE POLICY "Admins manage assistant knowledge"
ON public.assistant_knowledge
FOR ALL
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins read assistant knowledge" ON public.assistant_knowledge;
CREATE POLICY "Admins read assistant knowledge"
ON public.assistant_knowledge
FOR SELECT
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins manage assistant faqs" ON public.assistant_faqs;
CREATE POLICY "Admins manage assistant faqs"
ON public.assistant_faqs
FOR ALL
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins read assistant faqs" ON public.assistant_faqs;
CREATE POLICY "Admins read assistant faqs"
ON public.assistant_faqs
FOR SELECT
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins manage assistant settings" ON public.assistant_settings;
CREATE POLICY "Admins manage assistant settings"
ON public.assistant_settings
FOR ALL
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins manage leads" ON public.leads;
CREATE POLICY "Admins manage leads"
ON public.leads
FOR ALL
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (app_private.has_role(auth.uid(), 'admin'::public.app_role));

-- Replace storage admin policies.
DROP POLICY IF EXISTS "Admins upload cms-media" ON storage.objects;
CREATE POLICY "Admins upload cms-media"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'cms-media' AND app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins update cms-media" ON storage.objects;
CREATE POLICY "Admins update cms-media"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'cms-media' AND app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins delete cms-media" ON storage.objects;
CREATE POLICY "Admins delete cms-media"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'cms-media' AND app_private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins read cms-media" ON storage.objects;
CREATE POLICY "Admins read cms-media"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'cms-media' AND app_private.has_role(auth.uid(), 'admin'::public.app_role));

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, PUBLIC;