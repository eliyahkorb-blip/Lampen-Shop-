const faq = [
  ["Wie werden die Lampen betrieben?", "Alle LumenOak Lampen werden über ein fest integriertes warmweißes LED-Modul mit USB-C betrieben."],
  ["Kann ich eine normale Glühbirne einsetzen?", "Nein. Die Lampen sind nicht für klassische Glühbirnen, Halogenlampen oder heiße Leuchtmittel geeignet."],
  ["Welche Holzarten gibt es?", "Eiche, Ahorn, schwarz geölte Eiche und Nussbaum."],
  ["Wird jede Lampe auf Bestellung gefertigt?", "Ja. Jede Lampe wird made-to-order gefertigt und handmontiert."],
  ["Wie lange dauert die Lieferung?", "In der Regel 5–10 Werktage, abhängig vom Modell und der aktuellen Auftragslage."],
];

export const metadata = { title: "FAQ – LumenOak" };

export default function FaqPage() {
  return (
    <section className="section narrow">
      <p className="eyebrow">FAQ</p>
      <h1>Häufige Fragen.</h1>
      <div className="faq-list">
        {faq.map(([question, answer]) => (
          <details key={question} className="faq-item">
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
