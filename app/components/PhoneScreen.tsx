import Image from "next/image";

// A real app screenshot in a plain CSS phone frame (no device brand, no frame
// image). Screens live in public/images/app and are all 946×1848.
//
// Width: ~200px on phones, ~260px from md up, never wider than its parent.
// Pass `className` to override (e.g. a smaller third screen). The corner
// radius and bezel scale with the width (container units, see .phone-* in
// globals.css).
//
// Every block that shows these must also show <ScreensCaption />: the
// profiles in them are fictional.

export const SCREEN_WIDTH = 946;
export const SCREEN_HEIGHT = 1848;

export default function PhoneScreen({
  src,
  alt,
  priority = false,
  tilt = 0,
  className = "w-[200px] md:w-[260px]",
  sizes = "(min-width: 768px) 260px, 200px",
}: {
  /** Path under /public, e.g. "/images/app/05-match.webp". */
  src: string;
  /** What the screen shows, in words. */
  alt: string;
  /** Above the fold only: loads eagerly at high priority. */
  priority?: boolean;
  /** Degrees, -3 to 3. Dropped under prefers-reduced-motion. */
  tilt?: number;
  className?: string;
  sizes?: string;
}) {
  const deg = Math.max(-3, Math.min(3, tilt));
  return (
    <div
      className={`phone-wrap max-w-full ${deg ? "phone-tilt" : ""} ${className}`}
      style={deg ? ({ "--tilt": `${deg}deg` } as React.CSSProperties) : undefined}
    >
      <div className="phone-frame">
        <Image
          src={src}
          alt={alt}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          sizes={sizes}
          {...(priority
            ? { loading: "eager" as const, fetchPriority: "high" as const }
            : { loading: "lazy" as const })}
          className="phone-screen"
        />
      </div>
    </div>
  );
}

export function ScreensCaption({
  onDark = false,
  className = "",
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={className}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "13px",
        color: onDark ? "rgba(255,255,255,0.8)" : "rgba(13,31,26,0.65)",
      }}
    >
      App screens shown with fictional, illustrative profiles.
    </p>
  );
}
