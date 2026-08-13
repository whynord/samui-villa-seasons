import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  stay: z.string().trim().max(120).default(""),
  message: z.string().trim().max(2000).default(""),
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const sendInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return { ok: false as const, error: "Email service unavailable" };
    }

    const html = `
      <div style="font-family:Georgia,serif;color:#2b2b2b;line-height:1.6">
        <h2 style="font-weight:400">New inquiry — Villa Ledu</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Stay:</strong> ${escapeHtml(data.stay || "—")}</p>
        <p><strong>Message:</strong><br>${escapeHtml(data.message || "—").replace(/\n/g, "<br>")}</p>
      </div>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: process.env["RESEND_FROM"] ?? "Villa Ledu <onboarding@resend.dev>",
        to: ["villaledusamui@gmail.com"],
        reply_to: data.email,
        subject: `New inquiry — ${data.name}`,
        html,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`Resend request failed [${response.status}]: ${body}`);
      return { ok: false as const, error: "Could not send message" };
    }

    return { ok: true as const };
  });
