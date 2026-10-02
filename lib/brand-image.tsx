import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// Brand images rendered once at build time from the existing assets: the knot
// from app/components/Logo.tsx, the brand colours, and Cormorant Bold (the
// display face; assets/fonts, SIL Open Font License).

const GREEN = "#1B4D3E";
const GOLD = "#C9952A";
const GOLD_LIGHT = "#E3BC68";
const CREAM = "#FAF8F5";

const KNOT_PATHS = [
  "M14 22C10 22 7 18.5 7 15C7 11.5 10 8 14 8C18.5 8 22 12.5 22 12.5",
  "M30 22C34 22 37 18.5 37 15C37 11.5 34 8 30 8C25.5 8 22 12.5 22 12.5",
  "M14 22C10 22 7 25.5 7 29C7 32.5 10 36 14 36C18.5 36 22 31.5 22 31.5",
  "M30 22C34 22 37 25.5 37 29C37 32.5 34 36 30 36C25.5 36 22 31.5 22 31.5",
  "M18 20C16 18 16 14 18 12",
  "M26 20C28 18 28 14 26 12",
  "M18 24C16 26 16 30 18 32",
  "M26 24C28 26 28 30 26 32",
];

function Knot({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {KNOT_PATHS.map((d) => (
        <path key={d} d={d} stroke={GOLD} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

/** 1200×630 share image used wherever a page has no cover of its own. */
export async function defaultOgImage() {
  const cormorant = await readFile(path.join(process.cwd(), "assets/fonts/Cormorant-Bold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: GREEN,
          fontFamily: "Cormorant",
        }}
      >
        <Knot size={150} />
        <div style={{ marginTop: 28, fontSize: 124, color: CREAM, letterSpacing: 4 }}>BiyeHobe</div>
        <div style={{ marginTop: 14, fontSize: 40, color: GOLD_LIGHT }}>
          Where tradition meets intention — wherever home is.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Cormorant", data: cormorant, weight: 700, style: "normal" }],
    }
  );
}

/** 512×512 logo for structured data (Organization / publisher). */
export function logoImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: GREEN,
        }}
      >
        <Knot size={380} />
      </div>
    ),
    { width: 512, height: 512 }
  );
}
