interface CrestProps {
  className?: string
  /** Draw the outline only — used for oversized watermarks. */
  outline?: boolean
  title?: string
}

/**
 * The Black Fortress mark: a crenellated keep with an arrow slit, flanked by
 * two bastion walls that fall away to a gate notch. Redrawn as vector from the
 * club's photographic brand plate so it stays crisp at every size.
 */
function Crest({ className = '', outline = false, title }: CrestProps) {
  const body =
    'M38 18 V10 H45.5 V18 H50.2 V6 H57.7 V18 H62.4 V6 H69.9 V18 H74.5 V10 H82 V18 ' +
    'L82 58 L114 74 L114 118 L102 128 L76 128 L60 100 L44 128 L18 128 L6 118 L6 74 L38 58 Z'
  const slit = 'M55 32 L65 32 L65 66 L60 74 L55 66 Z'
  const crackL = 'M47 61 L52.5 78 L49.2 79 L43.7 62 Z'
  const crackR = 'M73 61 L67.5 78 L70.8 79 L76.3 62 Z'

  return (
    <svg
      viewBox="0 0 120 132"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path
        d={`${body} ${slit} ${crackL} ${crackR}`}
        fillRule="evenodd"
        fill={outline ? 'none' : 'currentColor'}
        stroke={outline ? 'currentColor' : 'none'}
        strokeWidth={outline ? 2.5 : undefined}
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Crest
