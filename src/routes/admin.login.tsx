import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  head: () => ({ meta: [{ title: "Yönetici Girişi | Enorpa" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/dashboard" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin/dashboard` },
        });
        if (error) throw error;
      }
      navigate({ to: "/admin/dashboard" });
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl">
        <div className="bg-navy-dark text-white px-5 py-6 sm:px-8 border-b-4 border-orange">
          <Link to="/" className="flex items-center gap-2 mb-3 text-white/70 hover:text-orange text-xs uppercase tracking-[0.3em] font-display">
            ← Anasayfa
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-orange flex items-center justify-center">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-orange font-display font-bold">
                Enorpa Yönetim
              </div>
              <h1 className="font-display text-2xl font-bold uppercase">Admin Paneli</h1>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="p-5 space-y-5 sm:p-8">
          <div>
            <label className="block text-xs uppercase tracking-wider font-display font-semibold text-navy mb-2">
              E-posta
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border px-4 py-3 focus:border-orange focus:outline-none"
              placeholder="admin@enorpa.com"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-display font-semibold text-navy mb-2">
              Şifre
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border px-4 py-3 focus:border-orange focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {err && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-bold uppercase tracking-wider px-5 py-3.5 disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Giriş Yap" : "Hesap Oluştur"}
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="w-full text-xs text-muted-foreground hover:text-navy uppercase tracking-wider font-display"
          >
            {mode === "signin"
              ? "İlk kurulum: Hesap oluştur (ilk kullanıcı admin olur)"
              : "Hesabınız var mı? Giriş yapın"}
          </button>
        </form>
      </div>
    </div>
  );
}
