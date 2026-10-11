export function Reveal({children, delay = 0}: {children: React.ReactNode; delay?: number}) {
  return <div className="reveal-block" data-reveal-delay={delay ? Math.min(160, Math.max(0, delay * 1000)) : undefined}>{children}</div>;
}
