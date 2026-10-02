import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
const serif = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#4A3427" };
export const metadata: Metadata = {
  title: "Sheikh Hamaam Construction | Traditional Kashmiri Hammam Construction",
  description: "Sheikh Hamaam Construction provides traditional Kashmiri hammam construction, custom hammam design, renovation and finishing services in Sader Koot Bala, Bandipora, Jammu & Kashmir.",
  openGraph: { title: "Sheikh Hamaam Construction", description: "Traditional Kashmiri hammam construction, design, renovation and finishing in Bandipora, Jammu & Kashmir.", type: "website", locale: "en_IN" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = { "@context": "https://schema.org", "@type": "LocalBusiness", name: "Sheikh Hamaam Construction",
    description: "Traditional Kashmiri hammam construction, design and renovation.",
    address: { "@type": "PostalAddress", streetAddress: "Sader Koot Bala", addressLocality: "Bandipora", addressRegion: "Jammu & Kashmir", addressCountry: "IN" } };
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        {children}
      </body>
    </html>
  );
}
