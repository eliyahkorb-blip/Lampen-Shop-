"use client";

import { FormEvent, useState } from "react";

export function ContactForm({ type = "contact" }: { type?: "contact" | "withdrawal" }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(type === "withdrawal" ? "/api/widerruf" : "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Senden fehlgeschlagen.");
      setStatus("success");
      setMessage(data?.message || "Nachricht wurde gesendet.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unbekannter Fehler.");
    }
  }

  return (
    <form className="form-grid" onSubmit={submit}>
      <div className="form-row">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="form-row">
        <label htmlFor="email">E-Mail</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      {type === "withdrawal" && (
        <>
          <div className="form-row">
            <label htmlFor="orderNumber">Bestellnummer</label>
            <input id="orderNumber" name="orderNumber" placeholder="z. B. Stripe- oder Shop-Bestellnummer" />
          </div>
          <div className="form-row">
            <label htmlFor="orderedAt">Bestellt am / erhalten am</label>
            <input id="orderedAt" name="orderedAt" placeholder="Datum eintragen" />
          </div>
        </>
      )}
      <div className="form-row">
        <label htmlFor="message">Nachricht</label>
        <textarea id="message" name="message" required placeholder={type === "withdrawal" ? "Hiermit widerrufe ich den Kaufvertrag..." : "Worum geht es?"} />
      </div>
      <button className="btn btn-primary" disabled={status === "loading"}>
        {status === "loading" ? "Wird gesendet..." : type === "withdrawal" ? "Vertrag widerrufen" : "Nachricht senden"}
      </button>
      {message && <p className="notice">{message}</p>}
    </form>
  );
}
