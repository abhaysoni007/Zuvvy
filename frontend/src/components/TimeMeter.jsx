import Mascot from './Mascot';

export default function TimeMeter({ minutes = 46, max = 60 }) {
  const pct = Math.min(100, Math.round((minutes / max) * 100));
  const angle = (pct / 100) * 360;

  return (
    <div className="time-fit-shell">
      <div>
        <span className="inline-flex rounded-full bg-zuvvy-teal/18 px-3 py-1 font-heading text-zuvvy-ink">Earned time meter</span>
        <h3 className="mt-2 font-heading text-[clamp(1.8rem,2.8vw,3.2rem)] leading-[0.95] text-zuvvy-ink">Earned time meter</h3>
        <p className="mt-2 text-[clamp(0.9rem,1.1vw,1.1rem)] text-zuvvy-ink/76">Kids unlock screen time by creating, learning, and completing missions.</p>
        <div className="mt-3 inline-flex rounded-full bg-zuvvy-teal/16 px-3 py-1.5 font-heading text-lg text-zuvvy-ink">
          {minutes} of {max} min unlocked today
        </div>
      </div>

      <div className="time-fit-meter-row">
        <div className="rounded-[18px] border border-zuvvy-yellow/45 bg-zuvvy-yellow/12 p-3 text-center">
          <Mascot mood="happy" className="mx-auto h-16 w-16" />
          <p className="accent-hand text-2xl text-zuvvy-teal">Great job!</p>
          <p className="mt-1 text-sm text-zuvvy-ink/78">You&apos;ve earned time by creating today.</p>
        </div>

        <div className="rounded-[18px] border border-zuvvy-teal/35 bg-zuvvy-teal/10 p-3 grid place-items-center">
          <div
            className="relative h-28 w-28 rounded-full md:h-32 md:w-32"
            style={{
              background: `conic-gradient(#00D1B2 0deg, #4DA8DA ${Math.max(angle - 30, 0)}deg, #6C5CE7 ${angle}deg, rgba(26,26,26,0.08) ${angle}deg 360deg)`
            }}
          >
            <div className="absolute inset-2 grid place-items-center rounded-full bg-zuvvy-white">
              <div className="text-center">
                <p className="font-heading text-4xl leading-none text-zuvvy-ink">{minutes}</p>
                <p className="text-sm text-zuvvy-ink/70">minutes</p>
                <p className="text-xs text-zuvvy-ink/62">out of {max}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="time-fit-actions">
        <p className="font-heading text-2xl text-zuvvy-teal">How to earn more?</p>
        <div className="mt-2 grid gap-2 text-base">
          <div className="flex items-center justify-between rounded-2xl bg-zuvvy-purple/10 px-3 py-2">
            <span>Take a quiz</span>
            <span className="rounded-full bg-zuvvy-purple/15 px-3 py-1 font-heading text-zuvvy-purple">+10 min</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-zuvvy-teal/10 px-3 py-2">
            <span>Post a creation</span>
            <span className="rounded-full bg-zuvvy-teal/20 px-3 py-1 font-heading text-zuvvy-teal">+15 min</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-zuvvy-yellow/18 px-3 py-2">
            <span>Win a challenge</span>
            <span className="rounded-full bg-zuvvy-yellow/35 px-3 py-1 font-heading text-zuvvy-ink">+25 min</span>
          </div>
        </div>
      </div>
    </div>
  );
}
