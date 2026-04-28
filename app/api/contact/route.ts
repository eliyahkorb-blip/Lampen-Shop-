import { NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: "Bitte Name, E-Mail und Nachricht ausfüllen." }, { status: 400 });
  }

  await sendNotificationEmail("Neue Kontaktanfrage", {
    name: body.name,
    email: body.email,
    message: body.message,
  });

  return NextResponse.json({ message: "Danke, deine Nachricht wurde gesendet." });
}
