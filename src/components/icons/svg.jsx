/**
 * Shell SVG bersama untuk semua icon kustom.
 *
 * Semua icon memakai stroke="currentColor" supaya:
 * - otomatis mengikuti tema light/dark lewat `text-*` utility
 * - tidak butuh <defs>/<linearGradient> -> tidak ada masalah id duplikat
 *   saat icon yang sama dirender lebih dari sekali di DOM
 *
 * Override fill/stroke per icon lewat props (mis. <Svg fill="currentColor" stroke="none" />).
 */
export function Svg({
  viewBox = "0 0 24 24",
  className = "size-6",
  strokeWidth = 1.5,
  children,
  ...rest
}) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}
