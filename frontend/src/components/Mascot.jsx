function Eye({ wink }) {
  if (wink) {
    return <path d="M12 15c2 0 3-1 4-2" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />;
  }

  return <circle cx="13" cy="14" r="2" fill="#1A1A1A" />;
}

export default function Mascot({ mood = 'happy', className = '' }) {
  const isCurious = mood === 'curious';
  const isSad = mood === 'sad';
  const isWink = mood === 'wink';
  const isCelebrate = mood === 'celebrate' || mood === 'clap' || mood === 'jump';

  return (
    <svg
      viewBox="0 0 180 180"
      className={`${className} mascot ${isCelebrate ? 'mascot-celebrate' : ''} ${isSad ? 'mascot-sad' : ''}`}
      role="img"
      aria-label="Zuvvy mascot"
    >
      <defs>
        <linearGradient id="zuvvyBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#00D1B2" />
        </linearGradient>
      </defs>

      <circle cx="90" cy="90" r="70" fill="url(#zuvvyBody)" />
      <circle cx="68" cy="58" r="12" fill="#FFD166" opacity="0.85" />
      <circle cx="118" cy="48" r="8" fill="#4DA8DA" opacity="0.9" />

      <g transform={isCurious ? 'translate(0 -2)' : 'translate(0 0)'}>
        <Eye wink={false} />
        <g transform="translate(44 0)">
          <Eye wink={isWink} />
        </g>
      </g>

      {isSad ? (
        <path d="M68 126c7-8 14-12 22-12s15 4 22 12" stroke="#1A1A1A" strokeWidth="4" fill="none" strokeLinecap="round" />
      ) : isCurious ? (
        <path d="M70 112c6 9 14 12 20 12s14-3 20-12" stroke="#1A1A1A" strokeWidth="4" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M64 112c8 12 17 17 26 17s18-5 26-17" stroke="#1A1A1A" strokeWidth="4" fill="none" strokeLinecap="round" />
      )}

      <path d="M34 82c-9 6-15 15-17 24" stroke="#4DA8DA" strokeWidth="8" strokeLinecap="round" className={mood === 'wave' ? 'arm-wave' : ''} />
      <path d="M145 104c10-2 17-10 19-22" stroke="#FFD166" strokeWidth="8" strokeLinecap="round" className={mood === 'clap' ? 'arm-clap' : ''} />

      {isCelebrate && (
        <g className="sparkle-burst">
          <circle cx="22" cy="38" r="4" fill="#FFD166" />
          <circle cx="152" cy="24" r="4" fill="#4DA8DA" />
          <circle cx="160" cy="138" r="4" fill="#00D1B2" />
          <circle cx="34" cy="148" r="4" fill="#FFD166" />
        </g>
      )}
    </svg>
  );
}
