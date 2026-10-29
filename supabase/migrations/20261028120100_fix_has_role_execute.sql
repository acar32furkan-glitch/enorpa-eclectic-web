-- ============================================================================
-- has_role() EXECUTE yetkisi
--
-- 20260612171208 numaralı migration fonksiyonu "lock down" gerekçesiyle
-- REVOKE etmişti; ancak RLS politikaları bu fonksiyonu çağırıyor. Yetki
-- olmadığında PostgREST istekleri (ör. products SELECT) 401 döner.
-- Supabase'in resmî önerisi: fonksiyon SECURITY DEFINER kalsın, EXECUTE
-- yalnızca anon/authenticated/service_role rollerine verilsin.
-- ============================================================================

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role)
  TO anon, authenticated, service_role;

-- Ürün okuma politikası: anon rolü de aktif ürünleri okuyabilsin
DROP POLICY IF EXISTS "Anyone views active products" ON public.products;
CREATE POLICY "Anyone views active products" ON public.products
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

-- Adminler pasif ürünleri de görebilsin
DROP POLICY IF EXISTS "Admins view all products" ON public.products;
CREATE POLICY "Admins view all products" ON public.products
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
