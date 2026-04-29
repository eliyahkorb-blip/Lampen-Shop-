import Link from "next/link";
import { shopConfig } from "@/lib/shop-config";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <img src="/brand/lumenoak-logo.svg" alt="LumenOak" className="footer-logo" />
        <p className="footer-claim">{shopConfig.claim}</p>
        <p>
          3D-gedruckte Designlampen auf echtem Holzsockel – warmweiß,
          handmontiert und made-to-order.
        </p>
      </div>
      <div>
        <h3>Shop</h3>
        <Link href="/shop">Kollektion</Link>
        <Link href="/#materialien">Materialien</Link>
        <Link href="/#fertigung">Fertigung</Link>
        <Link href="/#faq">FAQ</Link>
      </div>
      <div>
        <h3>Service</h3>
        <Link href="/kontakt">Kontakt</Link>
        <Link href="/versand">Versand & Zahlung</Link>
        <Link href="/widerruf">Widerruf</Link>
        <Link href="/agb">AGB</Link>
      </div>
      <div>
        <h3>Rechtliches</h3>
        <Link href="/impressum">Impressum</Link>
        <Link href="/datenschutz">Datenschutz</Link>
        <p className="footer-contact">{shopConfig.email}<br />{shopConfig.location}</p>
      </div>
    </footer>
  );
}
