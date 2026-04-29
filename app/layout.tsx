import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import { shopConfig } from "@/lib/shop-config";

export const metadata: Metadata = {
  title: "LumenOak – 3D-gedruckte Designlampen mit Holzsockel",
  description:
    "Handgefertigte 3D-gedruckte Tischlampen und Nachtlichter mit echtem Holzsockel. Warmweißes LED-Licht, USB-C Anschluss und individuelle Holzvarianten.",
  keywords: [
    "3D gedruckte Lampe",
    "Designlampe Holzsockel",
    "Tischlampe warmweiß",
    "Nachttischlampe Holz",
    "USB-C Lampe",
    "moderne Tischlampe",
    "handgemachte Lampe",
    "Ambient Light",
    "Designleuchte Holz",
  ],
  metadataBase: new URL(shopConfig.domain),
  openGraph: {
    title: "LumenOak – Licht in Form gebracht",
    description:
      "3D-gedruckte Designlampen auf echtem Holzsockel – warmweiß, handmontiert und made-to-order.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
