import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    return NextResponse.json({ error: "Stripe Webhook ist nicht konfiguriert." }, { status: 500 });
  }

  const stripe = new Stripe(secretKey);
  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  if (!signature) return NextResponse.json({ error: "Signatur fehlt." }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook Signatur ungültig.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Bestellung bezahlt:", session.id, session.customer_details?.email, session.metadata);
      // TODO: Hier Produktion/Versand starten: Datenbankeintrag, E-Mail, Lagerbestand, Rechnung.
      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Checkout abgelaufen:", session.id);
      break;
    }
    default:
      console.log(`Unbehandeltes Stripe Event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
