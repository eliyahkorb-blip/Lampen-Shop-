import Link from "next/link";
import { shopConfig } from "@/lib/shop-config";
import { CartCounter } from "./cart-counter";

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo" aria-label={`${shopConfig.name} Startseite`}>
          <span className="logo-mark" aria-hidden="true" />
          <span>
            {shopConfig.name}
            <small>Handmade Lighting</small>
          </span>
        </Link>
        <nav className="nav" aria-label="Hauptnavigation">
          <Link href="/shop">Shop</Link>
          <Link href="/#prozess">Fertigung</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/kontakt">Kontakt</Link>
          <Link href="/warenkorb" className="cart-link">
            Warenkorb <CartCounter />
          </Link>
        </nav>
        <Link href="/warenkorb" className="cart-link mobile-cart" aria-label="Warenkorb öffnen">
          🛒 <CartCounter />
        </Link>
      </div>
    </header>
  );
}
