import { shopConfig } from "./shop-config";

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendNotificationEmail(subject: string, fields: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SHOP_NOTIFICATION_EMAIL || shopConfig.email;
  const rows = Object.entries(fields)
    .map(([key, value]) => `<tr><td style="padding:8px;border:1px solid #ddd"><strong>${escapeHtml(key)}</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(value)}</td></tr>`)
    .join("");

  if (!apiKey) {
    console.log(`[DEV EMAIL] ${subject}`, fields);
    return { devMode: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${shopConfig.name} <onboarding@resend.dev>`,
      to,
      subject,
      html: `<h1>${escapeHtml(subject)}</h1><table style="border-collapse:collapse">${rows}</table>`,
      reply_to: typeof fields.email === "string" ? fields.email : undefined,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`E-Mail-Versand fehlgeschlagen: ${text}`);
  }

  return response.json();
}
