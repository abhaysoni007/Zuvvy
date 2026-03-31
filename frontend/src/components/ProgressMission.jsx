export default function ProgressMission({ currentStep, totalSteps }) {
  const percent = Math.round((currentStep / totalSteps) * 100);

  let message = "Let's begin your mission!";
  if (percent >= 40 && percent < 60) {
    message = "You're halfway there. Zuvvy is excited!";
  }
  if (percent >= 60 && percent < 100) {
    message = 'Awesome! One more idea and you unlock celebration mode.';
  }
  if (percent === 100) {
    message = 'You unlocked the final reward!';
  }

  return (
    <div className="rounded-3xl bg-zuvvy-white/80 p-4 shadow-soft backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between font-heading text-sm text-zuvvy-ink">
        <span>Level Progress</span>
        <span>{percent}%</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-zuvvy-blue/30">
        <div
          className="h-full rounded-full bg-gradient-to-r from-zuvvy-teal to-zuvvy-purple transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-zuvvy-ink">{message}</p>
    </div>
  );
}
