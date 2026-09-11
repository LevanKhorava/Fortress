/**
 * Film grain overlay. Absolutely positioned, non-interactive, and blended over
 * whatever sits beneath it — the single cheapest thing that stops large flat
 * blacks from banding on cheap panels.
 */
function Grain({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`pointer-events-none absolute inset-0 grain-layer ${className}`} />
}

export default Grain
