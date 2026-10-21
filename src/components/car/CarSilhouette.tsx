export function CarSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 90" fill="none" className={className} aria-hidden="true">
      <path
        d="M10 70 L10 62 Q10 54 20 50 L55 38 Q70 28 95 26 L150 24 Q175 24 190 34 L215 50 Q225 54 225 62 L225 70"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <circle cx="55" cy="70" r="14" fill="currentColor" />
      <circle cx="190" cy="70" r="14" fill="currentColor" />
      <rect x="10" y="66" width="215" height="6" fill="currentColor" />
    </svg>
  );
}
