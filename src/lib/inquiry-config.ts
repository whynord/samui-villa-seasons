const DEFAULT_FROM = "Villa Ledu <do-not-reply@villaledu.com>";
const EMAIL_SHAPE = /^(.*<)?[^@\s<>]+@[^@\s<>]+\.[^@\s<>]+>?$/;

// RESEND_FROM is optional; ignore it unless it is a well-formed sender.
export function fromAddress(): string {
  const configured = process.env["RESEND_FROM"]?.trim();
  if (configured && EMAIL_SHAPE.test(configured)) return configured;
  return DEFAULT_FROM;
}

export const INQUIRY_TO = "villaledusamui@gmail.com";
