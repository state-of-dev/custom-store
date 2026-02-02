export function LogoSvg({ className }: { className?: string }) {
  return (
    <span
      className={className}
      style={{
        fontWeight: 900,
        fontSize: '4rem',
        letterSpacing: '-0.02em',
        textTransform: 'uppercase',
        lineHeight: 1,
      }}
    >
      CUSTOM
    </span>
  );
}
