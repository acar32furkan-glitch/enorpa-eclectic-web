import { supabase } from "@/integrations/supabase/client";

export type AnalyticsEvent =
  | "pdf_download"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "calculator_used"
  | "quick_callback_submitted"
  | "document_gate_submitted"
  | "quote_request";

export async function trackEvent(eventType: AnalyticsEvent, target?: string): Promise<void> {
  try {
    await supabase.from("analytics_events").insert({
      event_type: eventType,
      target: target || null,
    });
  } catch (error) {
    console.error("[Analytics] Failed to track event:", error);
  }
}

export async function trackWhatsAppClick(): Promise<void> {
  trackEvent("whatsapp_click");
}

export async function trackPhoneClick(): Promise<void> {
  trackEvent("phone_click");
}

export async function trackEmailClick(): Promise<void> {
  trackEvent("email_click");
}

export async function trackPdfDownload(docTitle: string): Promise<void> {
  trackEvent("pdf_download", docTitle);
}

export async function trackCalculatorUse(result: string): Promise<void> {
  trackEvent("calculator_used", result);
}
