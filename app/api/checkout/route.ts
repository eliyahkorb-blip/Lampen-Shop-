import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message:
        "Stripe Checkout ist vorbereitet. Für echte Zahlungen müssen STRIPE_SECRET_KEY, NEXT_PUBLIC_SITE_URL und Produkt-/Preislogik final verbunden werden.",
    },
    { status: 501 }
  );
}
