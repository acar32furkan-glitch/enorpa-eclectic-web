
-- Fix mutable search_path on touch_updated_at
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Lock down SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_bootstrap() FROM PUBLIC, anon, authenticated;

-- Tighten INSERT policies (require minimal content)
DROP POLICY "Anyone can submit a lead" ON public.leads;
CREATE POLICY "Anyone can submit a lead" ON public.leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (length(name) BETWEEN 2 AND 200);

DROP POLICY "Anyone records events" ON public.analytics_events;
CREATE POLICY "Anyone records events" ON public.analytics_events
  FOR INSERT TO anon, authenticated
  WITH CHECK (length(event_type) BETWEEN 1 AND 60);
