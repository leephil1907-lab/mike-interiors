import Link from "next/link";

/** The Mike Interiors monogram, identical to the public site's brand mark. */
export function Monogram({ size = 34 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 76 76"
      width={size}
      height={size}
      role="img"
      aria-label="Mike Interiors monogram"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d="M12 64V12H22L38 35L54 12H64V64"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M22 64V34L38 55L54 34V64"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path d="M38 8V68" stroke="#C6A161" strokeWidth=".85" />
    </svg>
  );
}

/** Full brand lockup used in the dashboard header. */
export function BrandLockup() {
  return (
    <Link href="/" className="dash-brand" aria-label="Mike Interiors studio home">
      <Monogram />
      <span className="dash-brand-text">
        <span className="dash-brand-name">MIKE INTERIORS</span>
        <span className="dash-brand-tag">INTERIOR ARCHITECTURE &amp; DESIGN</span>
      </span>
    </Link>
  );
}
