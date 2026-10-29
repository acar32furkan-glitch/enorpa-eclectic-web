/**
 * Supabase erişilebilirlik katmanı.
 *
 * Site tanıtım/demo modunda Supabase projesi kapalı olsa bile çalışmalı:
 *  - Okuma çağrıları sessizce yerel içeriğe düşer,
 *  - Form gönderimleri hata mesajı göstermek yerine yerel kuyruğa alınır.
 */
import { supabase } from "@/integrations/supabase/client";

export type LeadPayload = {
  name: string;
  phone?: string;
  email?: string;
  message?: string;
  interest?: string;
  source: string;
  status?: string;
};

const PENDING_KEY = "enorpa_pending_leads";
const OFFLINE_KEY = "enorpa_backend_offline";

let offline = typeof window !== "undefined" && localStorage.getItem(OFFLINE_KEY) === "1";

export function isBackendOffline(): boolean {
  return offline;
}

function markOffline() {
  offline = true;
  try {
    if (typeof window !== "undefined") localStorage.setItem(OFFLINE_KEY, "1");
  } catch {
    /* yoksay */
  }
}

/** Ağ/DNS kaynaklı (kalıcı) erişim hatası mı? */
export function isUnreachable(error: unknown): boolean {
  const raw = (error as any)?.message ?? (error as any)?.details ?? error;
  const msg = String(raw ?? "").toLowerCase();
  return (
    msg.includes("failed to fetch") ||
    msg.includes("fetch failed") ||
    msg.includes("networkerror") ||
    msg.includes("network request failed") ||
    msg.includes("load failed") ||
    msg.includes("err_name_not_resolved") ||
    msg.includes("enetunreach") ||
    msg.includes("timeout")
  );
}

function queueLead(payload: LeadPayload) {
  try {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(PENDING_KEY);
    const list = raw ? (JSON.parse(raw) as unknown[]) : [];
    list.push({ ...payload, queuedAt: new Date().toISOString() });
    localStorage.setItem(PENDING_KEY, JSON.stringify(list.slice(-50)));
  } catch {
    /* yoksay */
  }
}

export function pendingLeadCount(): number {
  try {
    if (typeof window === "undefined") return 0;
    const raw = localStorage.getItem(PENDING_KEY);
    return raw ? (JSON.parse(raw) as unknown[]).length : 0;
  } catch {
    return 0;
  }
}

/**
 * Talep formunu gönderir. Backend erişilemezse talebi yerelde saklar ve
 * kullanıcıya yine de başarılı sonuç döner (ziyaretçi akışı bozulmasın).
 */
export async function submitLead(
  payload: LeadPayload,
): Promise<{ ok: boolean; queued?: boolean; message?: string }> {
  const body = { status: "new", ...payload } as any;

  if (offline) {
    queueLead(payload);
    return { ok: true, queued: true };
  }

  try {
    const { error } = await supabase.from("leads").insert(body);
    if (!error) return { ok: true };
    if (isUnreachable(error)) {
      markOffline();
      queueLead(payload);
      return { ok: true, queued: true };
    }
    return { ok: false, message: error.message };
  } catch (err) {
    if (isUnreachable(err)) {
      markOffline();
      queueLead(payload);
      return { ok: true, queued: true };
    }
    return { ok: false };
  }
}

/**
 * Supabase okuma çağrısını sarar: erişim yoksa yerel veriye döner.
 */
export async function readOrFallback<T>(
  run: () => PromiseLike<{ data: T | null; error: unknown }>,
  fallback: T,
): Promise<T> {
  if (offline) return fallback;
  try {
    const { data, error } = await run();
    if (error) {
      if (isUnreachable(error)) markOffline();
      return fallback;
    }
    if (data === null || data === undefined) return fallback;
    if (Array.isArray(data) && data.length === 0) return fallback;
    return data;
  } catch (err) {
    if (isUnreachable(err)) markOffline();
    return fallback;
  }
}
