import { phoneHref, site } from "@/config/site";
import { repairsGroup, roofingGroup, type ServiceBlurb } from "@/config/content/serviceGroups";

function Group({ id, eyebrow, title, intro, items }: { id: string; eyebrow: string; title: React.ReactNode; intro: string; items: ServiceBlurb[] }) {
  return (
    <div className="ir-sg-group" role="group" aria-labelledby={id}>
      <header className="ir-sg-head">
        <p className="nx-eyebrow">{eyebrow}</p>
        <h3 className="ir-sg-title" id={id}>
          {title}
        </h3>
        <p className="ir-sg-intro">{intro}</p>
      </header>
      <ul className="ir-sg-grid">
        {items.map((s, i) => (
          <li className="ir-sg-card" key={s.title}>
            <span className="ir-sg-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4>{s.title}</h4>
            <p>{s.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** "New roofs" and "Repairs": the two groups from the client's previous menu, as short summaries. */
export function ServiceGroups() {
  return (
    <section className="nx-section ir-sg" aria-labelledby="sg-h">
      <div className="nx-wrap">
        <header className="nx-head">
          <div className="nx-head-main">
            <p className="nx-eyebrow">Everything we do</p>
            <h2 className="nx-title" id="sg-h">
              New roofs and <em className="accent-serif">repairs</em>
            </h2>
          </div>
          <p className="nx-sub">
            From a full new roof to a small repair, here is the full range. Call <a href={phoneHref}>{site.business.phone.display}</a> to talk it through.
          </p>
        </header>
        <Group
          id="sg-roofing"
          eyebrow="Roofing"
          title={<>New roofs and <em className="accent-serif">roofing systems</em></>}
          intro="New roofs, replacements and specialist roofing systems for homes, businesses and industrial buildings."
          items={roofingGroup}
        />
        <Group
          id="sg-repairs"
          eyebrow="Repairs"
          title={<>Roof <em className="accent-serif">repairs</em> and upkeep</>}
          intro="Repairs, emergencies, insurance work and the upkeep that keeps a roof watertight for longer."
          items={repairsGroup}
        />
      </div>
    </section>
  );
}
