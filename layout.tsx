import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import { shopConfig } from "@/lib/shop-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(shopConfig.siteUrl),
  title: {
    default: `${shopConfig.name} | 3D-gedruckte Designlampen auf Eiche`,
    template: `%s | ${shopConfig.name}`,
  },
  description: "Handgefertigte 3D-Designlampen mit warmem LED-Licht und echter Eichenbasis. Kleine Tischlampen, Nachtlampen und Ambient Lights aus Kleinserie.",
  openGraph: {
    title: shopConfig.name,
    description: shopConfig.tagline,
    url: shopConfig.siteUrl,
    siteName: shopConfig.name,
    locale: "de_DE",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
