import Link from "next/link";
import { shopConfig } from "@/lib/shop-config";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <strong>{shopConfig.name}</strong>
          <p>{shopConfig.tagline}</p>
          <p>{shopConfig.email}<br />{shopConfig.phone}</p>
        </div>
        <div>
          <strong>Shop</strong>
          <Link href="/shop">Alle Lampen</Link>
          <Link href="/versand">Versand & Zahlung</Link>
          <Link href="/widerruf">Widerruf</Link>
        </div>
        <div>
          <strong>Rechtliches</strong>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/agb">AGB</Link>
        </div>
        <div>
          <strong>Service</strong>
          <Link href="/kontakt">Kontakt</Link>
          <a href={`mailto:${shopConfig.email}`}>E-Mail schreiben</a>
          <Link href="/#faq">FAQ</Link>
        </div>
      </div>
    </footer>
  );
}
