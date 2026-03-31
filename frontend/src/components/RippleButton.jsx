import { useState } from 'react';

export default function RippleButton({ children, className = '', onClick, type = 'button', ...props }) {
  const [ripples, setRipples] = useState([]);

  function handleClick(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const ripple = { id: Date.now(), size, x, y };

    setRipples((prev) => [...prev, ripple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((item) => item.id !== ripple.id));
    }, 650);

    if (onClick) {
      onClick(event);
    }
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`ripple-button relative overflow-hidden rounded-full px-6 py-3 font-heading text-lg text-zuvvy-ink transition ${className}`}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{ width: ripple.size, height: ripple.size, left: ripple.x, top: ripple.y }}
        />
      ))}
    </button>
  );
}
