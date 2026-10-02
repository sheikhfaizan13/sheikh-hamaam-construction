export function waUrl(message: string): string {
  const n = (process.env.WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}
