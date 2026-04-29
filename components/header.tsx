import Link from "next/link";
import { CartCounter } from "./cart-counter";
import { shopConfig } from "@/lib/shop-config";

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="LumenOak Startseite">
        <img src="/brand/lumenoak-logo.svg" alt="LumenOak" className="brand-logo" />
        <span className="brand-text">
          <strong>{shopConfig.name}</strong>
          <small>{shopConfig.claim}</small>
        </span>
      </Link>
      <nav className="main-nav" aria-label="Hauptnavigation">
        <Link href="/shop">Shop</Link>
        <Link href="/kollektion">Kollektion</Link>
        <Link href="/materialien">Materialien</Link>
        <Link href="/fertigung">Fertigung</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/kontakt">Kontakt</Link>
      </nav>
      <Link href="/warenkorb" className="cart-link">
        Warenkorb <CartCounter />
      </Link>
    </header>
  );
}
