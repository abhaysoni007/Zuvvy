const sparkles = [
  { left: '10%', top: '16%' },
  { left: '22%', top: '70%' },
  { left: '74%', top: '25%' },
  { left: '86%', top: '64%' }
];

export default function FloatingPlayground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="floating-shape shape-purple" />
      <div className="floating-shape shape-teal" />
      <div className="floating-shape shape-yellow" />
      <div className="floating-shape shape-blue" />

      {sparkles.map((sparkle) => (
        <div key={`${sparkle.left}-${sparkle.top}`} className="sparkle" style={sparkle}>
          *
        </div>
      ))}
    </div>
  );
}
