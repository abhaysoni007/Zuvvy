import { useRef } from 'react';

export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null);

  function handleMove(event) {
    const card = ref.current;
    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = -((y / rect.height) * 8 - 4);
    const rotateY = (x / rect.width) * 8 - 4;

    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  function reset() {
    const card = ref.current;
    if (card) {
      card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)';
    }
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`transition-transform duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
