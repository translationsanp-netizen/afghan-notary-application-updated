-- Assistant knowledge base
CREATE TABLE IF NOT EXISTS public.assistant_knowledge (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  content TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.assistant_faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.assistant_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  required_service TEXT,
  country TEXT,
  notes TEXT,
  source_language TEXT,
  conversation JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.assistant_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assistant_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assistant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public reads active assistant knowledge" ON public.assistant_knowledge;
CREATE POLICY "Public reads active assistant knowledge"
ON public.assistant_knowledge
FOR SELECT
USING (active = true OR has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins manage assistant knowledge" ON public.assistant_knowledge;
CREATE POLICY "Admins manage assistant knowledge"
ON public.assistant_knowledge
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Public reads active assistant faqs" ON public.assistant_faqs;
CREATE POLICY "Public reads active assistant faqs"
ON public.assistant_faqs
FOR SELECT
USING (active = true OR has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins manage assistant faqs" ON public.assistant_faqs;
CREATE POLICY "Admins manage assistant faqs"
ON public.assistant_faqs
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Public reads assistant settings" ON public.assistant_settings;
CREATE POLICY "Public reads assistant settings"
ON public.assistant_settings
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Admins manage assistant settings" ON public.assistant_settings;
CREATE POLICY "Admins manage assistant settings"
ON public.assistant_settings
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins manage leads" ON public.leads;
CREATE POLICY "Admins manage leads"
ON public.leads
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Updated-at triggers for all CMS content that drives cache busting and admin freshness.
DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'insights', 'jobs', 'partners', 'team_members', 'testimonials',
    'assistant_knowledge', 'assistant_faqs', 'assistant_settings', 'leads'
  ]
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS update_%I_updated_at ON public.%I', t, t);
    EXECUTE format('CREATE TRIGGER update_%I_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column()', t, t);
  END LOOP;
END $$;

INSERT INTO public.assistant_settings (key, value)
VALUES
  ('welcome', jsonb_build_object(
    'message', 'Hello and welcome to BA Afghan Notary Public. I can help you with certified translation, notarization, legalization, apostille services, legal drafting, career opportunities, document requirements, and general inquiries. How may I assist you today?',
    'subtitle', 'Powered by AI + Expert Knowledge'
  )),
  ('suggestions', jsonb_build_object(
    'items', ARRAY[
      'Certified Translation',
      'Notarization',
      'Legalization',
      'Study Abroad Documents',
      'Careers',
      'Contact Us'
    ]
  )),
  ('prompt_instructions', jsonb_build_object(
    'text', 'Act as a precise, professional digital representative of BA Afghan Notary Public. Use only approved company knowledge and live database content. If information is missing, say so and ask a clarifying question. Recommend relevant services and offer to collect lead information when appropriate.'
  ))
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.assistant_knowledge (title, category, content, display_order)
VALUES
  ('Company Overview', 'Company', 'BA Afghan Notary Public provides professional support for certified translation, notarization, legalization, apostille-related guidance, legal drafting, consultancy, and international documentation processes. The company focuses on accuracy, compliance, confidentiality, and client guidance before document submission.', 1),
  ('Service Guidance', 'Services', 'Clients may need certified translation, notarization, legalization, apostille guidance, legal drafting, consultancy, interpretation, or localization depending on the destination country and institution. Requirements vary by country and document type, so the assistant should ask for destination country, document type, and purpose before giving detailed guidance.', 2),
  ('Document Preparation', 'Documents', 'Common documents for international procedures may include passports, identity documents, birth certificates, marriage certificates, academic documents, transcripts, diplomas, employment letters, business documents, contracts, powers of attorney, and supporting legal records. Requirements vary by destination and purpose.', 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.assistant_faqs (question, answer, category, display_order)
VALUES
  ('What services do you provide?', 'We provide support for certified translation, notarization, legalization, apostille-related guidance, legal drafting, consultancy, interpretation, localization, and international documentation processes.', 'Services', 1),
  ('What documents are usually needed for immigration?', 'Common documents may include passport, identity documents, birth certificate, educational documents, marriage certificate if applicable, employment records, and supporting forms. Requirements vary by country, so please specify your destination country for more accurate guidance.', 'Documents', 2),
  ('Do you have current vacancies?', 'Career opportunities are updated on the Careers page. I can check current open positions and provide details about any listed role.', 'Careers', 3)
ON CONFLICT DO NOTHING;