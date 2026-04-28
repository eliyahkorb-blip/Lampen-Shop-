import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductById } from "@/lib/products";
import { shopConfig } from "@/lib/shop-config";

type CartItem = { productId: string; quantity: number };

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error("STRIPE_SECRET_KEY fehlt. Bitte .env.local ausfüllen.");
  return new Stripe(secretKey);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items = Array.isArray(body?.items) ? (body.items as CartItem[]) : [];
    if (items.length === 0) return NextResponse.json({ error: "Warenkorb ist leer." }, { status: 400 });

    const validItems = items.map((item) => {
      const product = getProductById(item.productId);
      const quantity = Number(item.quantity);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > product.stock) return null;
      return { product, quantity };
    });

    if (validItems.some((item) => item === null)) {
      return NextResponse.json({ error: "Ungültiger Warenkorb. Bitte Warenkorb neu laden." }, { status: 400 });
    }

    const normalizedItems = validItems as NonNullable<(typeof validItems)[number]>[];
    const subtotalCents = normalizedItems.reduce((sum, item) => sum + item.product.priceCents * item.quantity, 0);
    const shippingCents = subtotalCents >= shopConfig.shipping.freeFromCents ? 0 : shopConfig.shipping.standardCents;
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      allow_promotion_codes: true,
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["DE", "AT"] },
      phone_number_collection: { enabled: true },
      customer_creation: "always",
      consent_collection: { terms_of_service: "required" },
      automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === "true" },
      line_items: normalizedItems.map(({ product, quantity }) => ({
        quantity,
        price_data: {
          currency: "eur",
          unit_amount: product.priceCents,
          product_data: {
            name: product.name,
            description: product.subtitle,
            metadata: { productId: product.id, madeToOrder: String(product.madeToOrder) },
          },
        },
      })),
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: shippingCents, currency: "eur" },
            display_name: shippingCents === 0 ? "Kostenloser Versand" : "Standardversand Deutschland/Österreich",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 6 },
            },
          },
        },
      ],
      success_url: `${shopConfig.siteUrl}/danke?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${shopConfig.siteUrl}/warenkorb`,
      metadata: {
        source: "dito-lampen-shop",
        cart: JSON.stringify(normalizedItems.map(({ product, quantity }) => ({ id: product.id, quantity }))).slice(0, 490),
      },
    });

    if (!session.url) throw new Error("Stripe hat keine Checkout-URL zurückgegeben.");
    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout-Fehler.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
