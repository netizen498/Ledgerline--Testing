interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export default function Logo({ className = '', variant = 'dark' }: LogoProps) {
  const ink = variant === 'light' ? '#FFFFFF' : '#0B1B3A';
  const sub = variant === 'light' ? '#8FA3C7' : '#5A6785';
  return (
    <svg
      viewBox="0 0 140 36"
      className={className}
      role="img"
      aria-label="Ledgerline"
      fill="none"
    >
      <rect x="1" y="4" width="28" height="28" rx="6" fill="#4F7CFF" />
      <path
        d="M8 12h12M8 18h12M8 24h7"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <text
        x="38"
        y="24"
        fontFamily="Manrope, sans-serif"
        fontWeight="700"
        fontSize="18"
        letterSpacing="-0.5"
        fill={ink}
      >
        Ledgerline
      </text>
      <text
        x="38"
        y="33"
        fontFamily="Inter, sans-serif"
        fontWeight="500"
        fontSize="7"
        letterSpacing="1.6"
        fill={sub}
      >
        BUSINESS BANKING
      </text>
    </svg>
  );
}
