import { NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: "Bitte Name, E-Mail und Widerrufsnachricht ausfüllen." }, { status: 400 });
  }

  await sendNotificationEmail("Widerruf eingegangen", {
    name: body.name,
    email: body.email,
    orderNumber: body.orderNumber || "nicht angegeben",
    orderedAt: body.orderedAt || "nicht angegeben",
    message: body.message,
  });

  return NextResponse.json({ message: "Dein Widerruf wurde übermittelt. Bitte bewahre diese Information zusätzlich für deine Unterlagen auf." });
}
