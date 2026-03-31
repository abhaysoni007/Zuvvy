import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, ArrowRight, BadgeAlert, BookOpenCheck, Clock3, Flame, Sparkles, TrendingDown } from 'lucide-react';
import Lottie from 'lottie-react';

const doomScenes = [
  {
    id: 'hook',
    chip: 'Scrolling Loop',
    title: 'One swipe becomes one hour.',
    copy: 'Tiny dopamine hits keep kids locked in passive watching when they could be building.',
    metricLabel: 'Avg daily short-video time',
    metricValue: '2.8h',
    alarm: 'Attention drops fast after repeated quick-reward loops.',
    icon: Clock3
  },
  {
    id: 'decline',
    chip: 'Learning Dip',
    title: 'Creation time gets replaced.',
    copy: 'When passive feeds win, curiosity, experimentation, and project completion lose ground.',
    metricLabel: 'Hands-on creative time',
    metricValue: '-42%',
    alarm: 'Teachers report lower sustained focus in class.',
    icon: TrendingDown
  },
  {
    id: 'signal',
    chip: 'Emotional Cost',
    title: 'Mood and confidence get hit too.',
    copy: 'Comparison-heavy feeds can increase stress and reduce confidence in early teens.',
    metricLabel: 'Reported stress trend',
    metricValue: 'Rising',
    alarm: 'Kids consume more but feel less accomplished.',
    icon: Flame
  }
];

const lottieUrl = 'https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json';

export default function DoomCreateChart({ onCta }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = doomScenes[activeIndex];
  const Icon = active.icon;

  const progressLabel = useMemo(() => `${activeIndex + 1} / ${doomScenes.length}`, [activeIndex]);

  function go(delta) {
    setActiveIndex((prev) => {
      const next = prev + delta;
      if (next < 0) {
        return 0;
      }
      if (next > doomScenes.length - 1) {
        return doomScenes.length - 1;
      }
      return next;
    });
  }

  return (
    <section className="doom-fit-shell">
      <aside className="doom-left-rail">
        <div className="doom-left-top">
          <p className="doom-eyebrow">The Problem</p>
          <h3 className="doom-main-title">
            The Hidden
            <br />
            Cost of
            <br />
            <span>Doomscrolling</span>
          </h3>
          <p className="doom-main-copy">
            Kids are not failing because they lack talent. They are trapped in products designed for passive attention.
          </p>
        </div>

        <div className="doom-bullets">
          <div className="doom-bullet">
            <BadgeAlert size={15} /> Infinite feeds reward watching, not making.
          </div>
          <div className="doom-bullet">
            <BookOpenCheck size={15} /> School effort rises while focus resilience falls.
          </div>
          <div className="doom-bullet">
            <Sparkles size={15} /> Zuvvy flips this into a creation-first loop.
          </div>
        </div>

        <div className="doom-shift-card">
          <p className="doom-shift-title">What changes with Zuvvy</p>
          <p className="doom-shift-copy">From endless consumption to earned creation, visible progress, and healthier screen habits.</p>
          <button type="button" onClick={onCta} className="doom-shift-cta">
            Join early builders
          </button>
        </div>
      </aside>

      <div className="doom-right-board">
        <div className="doom-right-topbar">
          <div className="doom-chip-row" role="tablist" aria-label="Doomscroll insights">
            {doomScenes.map((scene, index) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`doom-chip ${index === activeIndex ? 'active' : ''}`}
              >
                {scene.chip}
              </button>
            ))}
          </div>

          <div className="doom-nav-side">
            <span className="doom-progress">{progressLabel}</span>
            <button type="button" onClick={() => go(-1)} disabled={activeIndex === 0} className="doom-nav-btn" aria-label="Previous insight">
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={activeIndex === doomScenes.length - 1}
              className="doom-nav-btn"
              aria-label="Next insight"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="doom-board-content">
          <motion.article
            key={active.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="doom-data-card"
          >
            <div className="doom-data-head">
              <span className="doom-data-chip">
                <Icon size={14} /> {active.chip}
              </span>
            </div>
            <h4>{active.title}</h4>
            <p>{active.copy}</p>

            <div className="doom-metric-row">
              <div className="doom-metric-box">
                <p>{active.metricLabel}</p>
                <strong>{active.metricValue}</strong>
              </div>
              <div className="doom-alert-box">
                <AlertTriangle size={15} />
                <span>{active.alarm}</span>
              </div>
            </div>
          </motion.article>

          <div className="doom-media-stack">
            <div className="doom-lottie-wrap">
              <Lottie path={lottieUrl} loop autoplay className="doom-lottie" />
              <p className="doom-credit">Animation from LottieFiles</p>
            </div>

            <div className="doom-storyset-wrap">
              <iframe
                title="Storyset illustration reference"
                src="https://storyset.com/illustration/social-media-addiction/amico"
                loading="lazy"
                className="doom-storyset-frame"
              />
              <p className="doom-credit">
                Illustration source: <a href="https://storyset.com" target="_blank" rel="noreferrer">Storyset</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}