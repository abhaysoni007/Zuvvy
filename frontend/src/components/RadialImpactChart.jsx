import { BarChart3, Eye, Lightbulb, Rocket } from 'lucide-react';
import Mascot from './Mascot';

const rows = [
  { label: 'Creativity', note: 'More growth through creating', value: '+84%', bar: 84, color: 'bg-zuvvy-purple' },
  { label: 'Confidence', note: 'More growth through creating', value: '+78%', bar: 78, color: 'bg-zuvvy-teal' },
  { label: 'Skill growth', note: 'More growth through creating', value: '+73%', bar: 73, color: 'bg-zuvvy-blue' },
  { label: 'Mindless scroll', note: 'Less passive watching', value: '-68%', bar: 68, color: 'bg-zuvvy-yellow' }
];

const icons = [Lightbulb, Rocket, BarChart3, Eye];

export default function RadialImpactChart() {
  return (
    <div className="impact-card-shell">
      <div className="impact-title-row">
        <div>
          <span className="inline-flex rounded-full bg-zuvvy-purple/16 px-3 py-1 font-heading text-zuvvy-purple">What changes</span>
          <h3 className="mt-2 font-heading text-[clamp(2rem,3.6vw,3.9rem)] leading-[0.95]">
            What changes
            <br />
            with <span className="text-zuvvy-purple">Zuvvy?</span>
          </h3>
          <p className="mt-2 max-w-xl text-[clamp(0.9rem,1.2vw,1.2rem)] text-zuvvy-ink/78">
            Screen time becomes meaningful time. Kids move from watching to creating.
          </p>
        </div>
        <Mascot mood="happy" className="h-16 w-16 md:h-20 md:w-20" />
      </div>

      <div className="impact-content-row">
        <div className="impact-radial-card">
          <div className="mx-auto h-32 w-32 md:h-36 md:w-36 rounded-full border-4 border-zuvvy-white/45 p-2">
            <div className="h-full w-full rounded-full border-4 border-zuvvy-teal/70 p-2">
              <div className="h-full w-full rounded-full border-4 border-zuvvy-yellow/80 grid place-items-center">
                <Mascot mood="happy" className="h-14 w-14 md:h-16 md:w-16" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-center font-heading text-[clamp(1.3rem,2.2vw,2rem)] leading-tight">From passive watching to active making.</p>
        </div>

        <div className="impact-metrics-list">
          {rows.map((row, index) => {
            const Icon = icons[index];
            return (
              <div key={row.label} className="rounded-[18px] border border-zuvvy-blue/25 bg-zuvvy-white/92 p-2.5 shadow-soft">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-xl bg-zuvvy-white shadow-soft grid place-items-center">
                      <Icon size={18} className="text-zuvvy-purple" />
                    </div>
                    <div>
                      <p className="font-heading text-[clamp(1rem,1.2vw,1.45rem)] leading-none">{row.label}</p>
                      <p className="mt-1 text-xs text-zuvvy-ink/72">{row.note}</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-zuvvy-purple/14 px-3 py-1 font-heading text-lg text-zuvvy-purple">{row.value}</div>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-zuvvy-ink/10">
                  <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.bar}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
