import Link from "next/link";

// Shared building blocks for the legal pages (/privacy, /terms,
// /delete-account). Styling is the one the 27 Aug 2026 pages used inline;
// it lives here now so three pages cannot drift apart.

const BODY = "rgba(13,31,26,0.72)";
const RULE = "1px solid rgba(13,31,26,0.1)";

export function LegalHeader({ title, updated }: { title: string; updated: string }) {
  return (
    <section className="pt-28 pb-16 px-5 text-center" style={{ backgroundColor: "var(--cream)" }}>
      <p
        className="text-xs uppercase tracking-widest mb-4"
        style={{ color: "var(--gold)", fontFamily: "var(--font-sans)" }}
      >
        Legal
      </p>
      <h1
        className="text-5xl sm:text-7xl leading-none"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--dark)" }}
      >
        {title}
      </h1>
      <p className="mt-6 text-sm" style={{ color: "rgba(13,31,26,0.5)", fontFamily: "var(--font-sans)" }}>
        Last updated: {updated}
      </p>
    </section>
  );
}

export function LegalBody({ children }: { children: React.ReactNode }) {
  return (
    <section style={{ backgroundColor: "white" }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20">
        <div style={{ fontFamily: "var(--font-sans)", color: "var(--dark)" }}>{children}</div>
      </div>
    </section>
  );
}

export function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-3xl sm:text-4xl mb-6 mt-12 scroll-mt-24"
      style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
    >
      {children}
    </h2>
  );
}

export function H3({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3
      id={id}
      className="text-2xl mb-4 mt-8 scroll-mt-24"
      style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
    >
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base leading-relaxed mb-6" style={{ color: BODY }}>
      {children}
    </p>
  );
}

export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="flex flex-col gap-3 mb-6">{children}</ul>;
}

export function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-base leading-relaxed" style={{ color: BODY }}>
      <span
        className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: "var(--gold)" }}
      />
      <span>{children}</span>
    </li>
  );
}

export function Rule() {
  return <hr className="my-10" style={{ border: "none", borderTop: RULE }} />;
}

/** A cream panel for the one thing on a page a reader must not miss. */
export function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-lg px-6 py-5 mb-8"
      style={{ backgroundColor: "var(--cream)", borderLeft: "3px solid var(--gold)" }}
    >
      <p
        className="text-xl mb-2"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--dark)" }}
      >
        {title}
      </p>
      <div className="text-base leading-relaxed" style={{ color: BODY }}>
        {children}
      </div>
    </div>
  );
}

export function DataTable({
  head,
  rows,
}: {
  head: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr style={{ borderBottom: "2px solid var(--dark)" }}>
            {head.map((h) => (
              <th
                key={h}
                className="py-3 pr-4 align-bottom"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "16px" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, i) => (
            <tr key={i} style={{ borderBottom: RULE }}>
              {cells.map((c, j) => (
                <td
                  key={j}
                  className="py-3 pr-4 align-top"
                  style={{ color: j === 0 ? "var(--dark)" : BODY }}
                >
                  {j === 0 ? <strong>{c}</strong> : c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = "underline underline-offset-4 transition-opacity hover:opacity-75";
  const style = { color: "var(--gold)" };
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} style={style}>
      {children}
    </Link>
  );
}

export const CONTACT_EMAIL = "hello@biyehobe.com";
