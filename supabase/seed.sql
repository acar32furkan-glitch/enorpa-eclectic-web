-- Yerel geliştirme seed'i (supabase start / supabase db reset sonrası çalışır)
-- Şema ve katalog verisi migration'lardan gelir; burada yalnızca panelin boş
-- görünmemesi için örnek talepler eklenir.

INSERT INTO public.leads (name, phone, email, interest, message, source, status)
VALUES
  ('Demo Müşteri', '+90 555 111 22 33', 'demo@example.com', 'Buhar Kazanı',
   'Yerel geliştirme için örnek talep kaydı.', 'seed', 'new'),
  ('Örnek Sera İşletmesi', '+90 555 444 55 66', 'sera@example.com', 'Sera Isıtma Sistemi',
   'HAS Turbo serisi için kapasite hesabı istendi.', 'seed', 'contacted');
