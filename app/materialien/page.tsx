import { woodOptions } from "@/lib/products";

export const metadata = { title: "Materialien – LumenOak" };

export default function MaterialienPage() {
  return (
    <section className="section">
      <p className="eyebrow">Materialien</p>
      <h1>Echtes Holz. Warmes Licht. Klare Formen.</h1>
      <p className="lead">Jede LumenOak Lampe kombiniert einen 3D-gedruckten Schirm mit einem echten Holzsockel.</p>
      <div className="wood-grid">
        {woodOptions.map((wood) => (
          <article key={wood.id} className="wood-card">
            <span className="wood-swatch" style={{ background: wood.colorHint }} />
            <h3>{wood.name}</h3>
            <p>{wood.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
