import Link from "next/link";

// The one line that sits next to every waitlist CTA. Terms for the offer
// live at /terms#founding-members; this line must stay consistent with them.
//
// `introduce`: the first mention of BiyeHobe Gold on a page reads
// "BiyeHobe Gold, our premium membership". Set it on that one instance.

export const GOLD_TERMS_HREF = "/terms#founding-members";

export default function GoldOfferLine({
  onDark = false,
  introduce = false,
  className = "",
  shadow = false,
}: {
  onDark?: boolean;
  introduce?: boolean;
  className?: string;
  /** For text over a photo (the hero). */
  shadow?: boolean;
}) {
  return (
    <p
      className={className}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "14px",
        lineHeight: 1.6,
        // On green: 7.48:1. On white/cream: 6.80 / 6.61.
        color: onDark ? "rgba(255,255,255,0.85)" : "rgba(13,31,26,0.72)",
        textShadow: shadow ? "0 2px 12px rgba(0,0,0,0.45)" : undefined,
      }}
    >
      <span
        aria-hidden="true"
        className="inline-block align-middle rounded-full mr-2"
        style={{ width: "6px", height: "6px", backgroundColor: "var(--gold)" }}
      />
      Join the waitlist and get 3 months of{" "}
      <strong style={{ fontWeight: 500, color: onDark ? "white" : "var(--dark)" }}>
        BiyeHobe Gold
      </strong>
      {introduce ? ", our premium membership," : ""}{" "}
      <Link
        href={GOLD_TERMS_HREF}
        className="underline underline-offset-4 transition-opacity hover:opacity-75"
        style={{ color: onDark ? "var(--gold-light)" : "var(--gold-ink)" }}
      >
        free
      </Link>{" "}
      when we launch.
    </p>
  );
}
