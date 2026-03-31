import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import {
  BadgeCheck,
  Brain,
  Compass,
  HeartHandshake,
  Medal,
  School,
  ShieldCheck,
  Timer,
  WandSparkles
} from 'lucide-react';
import CityLeaderboard from './components/CityLeaderboard';
import DoomCreateChart from './components/DoomCreateChart';
import FloatingPlayground from './components/FloatingPlayground';
import Mascot from './components/Mascot';
import PhoneDemo from './components/PhoneDemo';
import RadialImpactChart from './components/RadialImpactChart';
import RippleButton from './components/RippleButton';
import SplitComparisonGraph from './components/SplitComparisonGraph';
import SurveyGame from './components/SurveyGame';
import TimeMeter from './components/TimeMeter';

function RevealSection({ children, className = '', id }) {
  return (
    <section id={id} className={`reveal-section ${className}`}>
      {children}
    </section>
  );
}

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <p className="accent-hand inline-flex rounded-full bg-zuvvy-yellow/35 px-4 py-1 text-base text-zuvvy-ink">{eyebrow}</p>
      <h2 className="mt-4 font-heading text-3xl leading-tight md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-zuvvy-ink/80 md:text-lg">{description}</p> : null}
    </div>
  );
}

function TypingTagline({ phrases }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const step = isDeleting ? 28 : 66;
    const pause = isDeleting ? 28 : displayText === current ? 1200 : step;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && displayText === current) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && displayText.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        return;
      }

      setDisplayText((prev) => {
        if (isDeleting) {
          return prev.slice(0, -1);
        }

        return current.slice(0, prev.length + 1);
      });
    }, pause);

    return () => window.clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, phrases]);

  return (
    <p className="font-heading text-xl text-zuvvy-ink/78 md:text-3xl">
      {displayText}
      <span className="typing-caret" />
    </p>
  );
}

const sceneBackdrop = {
  hero: 'from-zuvvy-purple/12 via-zuvvy-white to-zuvvy-teal/16',
  problem: 'from-zuvvy-blue/12 via-zuvvy-white to-zuvvy-yellow/10',
  pain: 'from-zuvvy-yellow/12 via-zuvvy-white to-zuvvy-purple/8',
  solution: 'from-zuvvy-teal/14 via-zuvvy-white to-zuvvy-purple/10',
  system: 'from-zuvvy-purple/10 via-zuvvy-white to-zuvvy-blue/12',
  impact: 'from-zuvvy-blue/10 via-zuvvy-white to-zuvvy-teal/12',
  competition: 'from-zuvvy-yellow/10 via-zuvvy-white to-zuvvy-purple/10',
  trust: 'from-zuvvy-blue/14 via-zuvvy-white to-zuvvy-teal/10',
  survey: 'from-zuvvy-purple/16 via-zuvvy-white to-zuvvy-blue/16'
};

const sceneMascot = {
  hero: { mood: 'wave', message: 'Zuvvy makes screen time feel like a playground with purpose.' },
  problem: { mood: 'sad', message: 'Right now the internet rewards watching, not making.' },
  pain: { mood: 'sad', message: 'Big imagination gets flattened when the feed keeps winning.' },
  solution: { mood: 'curious', message: 'So we flipped the loop: learn, make, earn, share.' },
  system: { mood: 'happy', message: 'Every feature is built to trigger creation instead of passivity.' },
  impact: { mood: 'happy', message: 'The payoff is confidence, skills, and healthier screen habits.' },
  competition: { mood: 'clap', message: 'Healthy school rivalries turn creativity into momentum.' },
  trust: { mood: 'curious', message: 'Parents see structure. Kids still feel joy.' },
  survey: { mood: 'clap', message: 'Help us build the version families will actually love.' }
};

const taglines = ["Create. Don't just scroll.", 'Turn screen time into real skills.', 'Play. Build. Grow.'];

const systemCards = [
  {
    title: 'Creation Missions',
    icon: WandSparkles,
    detail: 'Fun prompts that push kids to build, draw, code, and explore.',
    tone: 'bg-zuvvy-purple/12'
  },
  {
    title: 'Earned Time',
    icon: Timer,
    detail: 'Kids unlock screen time by creating - not scrolling.',
    tone: 'bg-zuvvy-teal/12'
  },
  {
    title: 'Creative Points',
    icon: Medal,
    detail: 'Real effort earns real rewards.',
    tone: 'bg-zuvvy-yellow/24'
  },
  {
    title: 'Portfolio Identity',
    icon: BadgeCheck,
    detail: 'Everything a child creates becomes their portfolio.',
    tone: 'bg-zuvvy-blue/14'
  },
  {
    title: 'Discovery Feed',
    icon: Compass,
    detail: 'Only real creations from real kids - no fake perfection.',
    tone: 'bg-zuvvy-teal/12'
  },
  {
    title: 'School Challenges',
    icon: School,
    detail: 'Compete, collaborate, and grow with other schools.',
    tone: 'bg-zuvvy-purple/10'
  }
];

const trustCards = [
  {
    icon: ShieldCheck,
    title: 'AI moderation before posting',
    detail: 'Posts are checked before they go live, helping keep the platform safe for kids.'
  },
  {
    icon: Brain,
    title: 'Parent dashboards and reports',
    detail: 'Parents can track progress, activity, and growth through clear updates.'
  },
  {
    icon: HeartHandshake,
    title: 'Safe connections and controls',
    detail: 'Families stay in control while kids keep the joy of creating and sharing.'
  }
];

export default function App() {
  const [surveyOpen, setSurveyOpen] = useState(false);
  const [activeScene, setActiveScene] = useState('hero');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      smoothWheel: true
    });

    let rafId = null;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal-section').forEach((section) => revealObserver.observe(section));

    const sceneObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveScene(visible.target.id);
        }
      },
      { threshold: [0.25, 0.45, 0.7] }
    );

    ['hero', 'problem', 'pain', 'solution', 'system', 'impact', 'competition', 'trust', 'survey'].forEach((id) => {
      const node = document.getElementById(id);
      if (node) {
        sceneObserver.observe(node);
      }
    });

    return () => {
      revealObserver.disconnect();
      sceneObserver.disconnect();
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      lenis.destroy();
    };
  }, []);

  const mascotState = sceneMascot[activeScene] || sceneMascot.hero;

  return (
    <div className="page-shell min-h-screen overflow-x-hidden bg-zuvvy-white text-zuvvy-ink">
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 -z-20 bg-gradient-to-b ${sceneBackdrop[activeScene] || sceneBackdrop.hero}`}
        animate={{ opacity: [0.82, 1] }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-80"
        style={{
          backgroundImage:
            'linear-gradient(rgba(108, 92, 231, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(108, 92, 231, 0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <header id="hero" className="relative overflow-hidden px-5 pb-20 pt-6 md:px-10 md:pt-8">
        <FloatingPlayground />
        <div className="hero-orb left-[10%] top-[14%] h-32 w-32 bg-zuvvy-yellow/40" />
        <div className="hero-orb right-[12%] top-[24%] h-40 w-40 bg-zuvvy-teal/25" style={{ animationDelay: '1s' }} />
        <div className="hero-orb bottom-[6%] left-[44%] h-44 w-44 -translate-x-1/2 bg-zuvvy-purple/20" style={{ animationDelay: '1.8s' }} />

        <nav className="relative mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-zuvvy-purple px-5 py-2 font-heading text-lg text-zuvvy-white shadow-bubble">Zuvvy</div>
            <span className="hidden rounded-full border border-zuvvy-blue/35 bg-zuvvy-white/80 px-3 py-1 text-sm md:inline-flex">
              Kids-first creative internet
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSurveyOpen(true)}
            className="rounded-full border border-zuvvy-purple/30 bg-zuvvy-white/85 px-5 py-2 font-heading text-zuvvy-ink shadow-soft transition hover:-translate-y-1"
          >
            Help Build Zuvvy
          </button>
        </nav>

        <div className="relative mx-auto mt-10 max-w-6xl">
          <div className="hero-grid">
            <motion.aside
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="panel-glass doodle-ring interactive-card hidden rounded-[28px] p-5 lg:block"
            >
              <p className="accent-hand text-xl text-zuvvy-purple">For kids</p>
              <p className="mt-3 font-heading text-2xl">A playful world where ideas become projects.</p>
              <p className="mt-3 text-sm leading-6 text-zuvvy-ink/78">
                Creative quests, tiny wins, and visual progress loops that feel exciting instead of restrictive.
              </p>
              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-zuvvy-purple/10 px-4 py-3 text-sm">Build something to unlock your next adventure.</div>
                <div className="rounded-2xl bg-zuvvy-teal/10 px-4 py-3 text-sm">Show work, earn time, climb together.</div>
              </div>
            </motion.aside>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="relative text-center"
            >
              <div className="section-shell rounded-[40px] px-6 py-10 md:px-10 md:py-12">
                <div className="mx-auto max-w-3xl">
                  <p className="accent-hand text-xl text-zuvvy-purple md:text-2xl">Let&apos;s build the internet kids deserve.</p>
                  <h1 className="mt-2 font-heading text-5xl tracking-tight md:text-7xl">Zuvvy</h1>
                  <div className="mt-4 min-h-[40px] md:min-h-[52px]">
                    <TypingTagline phrases={taglines} />
                  </div>
                  <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zuvvy-ink/80 md:text-lg">
                    Zuvvy is a kids-first platform where screen time is earned by creating, not consuming.
                  </p>

                  <div className="hero-cta-stack mt-8">
                    <RippleButton className="bg-zuvvy-yellow text-zuvvy-ink shadow-bubble" onClick={() => setSurveyOpen(true)}>
                      Start Playing with Zuvvy
                    </RippleButton>
                    <button
                      type="button"
                      onClick={() => setSurveyOpen(true)}
                      className="rounded-full border border-zuvvy-purple/35 bg-zuvvy-white/88 px-6 py-3 font-heading text-lg shadow-soft transition hover:-translate-y-1"
                    >
                      Help Build Zuvvy
                    </button>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-zuvvy-ink/72">
                    <span className="rounded-full bg-zuvvy-white/90 px-3 py-2 shadow-soft">For ages 8-15</span>
                    <span className="rounded-full bg-zuvvy-white/90 px-3 py-2 shadow-soft">Play + creativity + learning</span>
                    <span className="rounded-full bg-zuvvy-white/90 px-3 py-2 shadow-soft">Designed to convert scrolling into making</span>
                  </div>
                </div>

                <div className="relative mx-auto mt-10 grid max-w-3xl items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
                  <div className="panel-glass interactive-card rounded-[24px] p-4 text-left md:text-right">
                    <p className="accent-hand text-lg text-zuvvy-blue">Try this!</p>
                    <p className="mt-2 font-heading text-lg">Kids unlock time by creating.</p>
                  </div>

                  <div className="relative mx-auto">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zuvvy-purple/30 via-zuvvy-yellow/20 to-zuvvy-teal/30 blur-3xl" />
                    <motion.div
                      animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
                      transition={{ duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                      className="relative panel-glass rounded-[34px] p-5 shadow-glow"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeScene}
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="mascot-bubble absolute -top-12 left-1/2 z-10 w-max max-w-[230px] -translate-x-1/2 rounded-2xl border border-zuvvy-blue/35 bg-zuvvy-white/96 px-4 py-2 text-sm shadow-soft"
                        >
                          <span className="accent-hand text-zuvvy-purple">Cool idea!</span> {mascotState.message}
                        </motion.div>
                      </AnimatePresence>
                      <Mascot mood={mascotState.mood} className="h-48 w-48 md:h-56 md:w-56" />
                    </motion.div>
                  </div>

                  <div className="panel-glass interactive-card rounded-[24px] p-4 text-left">
                    <p className="accent-hand text-lg text-zuvvy-teal">Let&apos;s build!</p>
                    <p className="mt-2 font-heading text-lg">Parents get trust, kids keep the magic.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="panel-glass sketch-border interactive-card hidden rounded-[28px] p-5 lg:block"
            >
              <p className="accent-hand text-xl text-zuvvy-teal">For parents</p>
              <p className="mt-3 font-heading text-2xl">Built so families can say yes to screen time.</p>
              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl bg-zuvvy-blue/10 px-4 py-3 text-sm">Safe structure that parents can trust.</div>
                <div className="rounded-2xl bg-zuvvy-yellow/20 px-4 py-3 text-sm">Progress kids can see and feel.</div>
                <div className="rounded-2xl bg-zuvvy-purple/10 px-4 py-3 text-sm">A healthier way to use screens.</div>
              </div>
            </motion.aside>
          </div>
        </div>
      </header>

      <main className="px-5 pb-24 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 md:gap-16">
          <RevealSection id="problem" className="problem-fit-section">
            <DoomCreateChart onCta={() => setSurveyOpen(true)} />
          </RevealSection>

          <RevealSection id="pain" className="grid-12 items-stretch">
            <div className="section-shell col-span-12 rounded-[34px] px-6 py-8 md:px-8 lg:col-span-5">
              <SectionHeading
                eyebrow="Emotional pain"
                title="What gets lost?"
                description="A child who could build... ends up just watching."
              />
              <div className="mt-6 grid gap-4">
                <div className="panel-glass interactive-card rounded-[24px] p-4">
                  <p className="accent-hand text-lg text-zuvvy-purple">Lost first</p>
                  <p className="mt-2 font-heading text-xl">Unfinished ideas</p>
                  <p className="mt-2 text-sm leading-6 text-zuvvy-ink/78">Projects never start, sketches stay in notebooks, and ideas disappear before they grow.</p>
                </div>
                <div className="panel-glass interactive-card rounded-[24px] p-4">
                  <p className="accent-hand text-lg text-zuvvy-blue">Lost next</p>
                  <p className="mt-2 font-heading text-xl">Unshared creativity</p>
                  <p className="mt-2 text-sm leading-6 text-zuvvy-ink/78">Talents stay hidden when kids keep consuming instead of showing what they can make.</p>
                </div>
                <div className="panel-glass interactive-card rounded-[24px] p-4">
                  <p className="accent-hand text-lg text-zuvvy-teal">Lost last</p>
                  <p className="mt-2 font-heading text-xl">Lost curiosity</p>
                  <p className="mt-2 text-sm leading-6 text-zuvvy-ink/78">The more passive the loop becomes, the less likely a child is to explore, test, and build.</p>
                </div>
              </div>
            </div>

            <div className="section-shell col-span-12 rounded-[34px] px-6 py-8 md:px-8 lg:col-span-7">
              <SplitComparisonGraph />
            </div>
          </RevealSection>

          <RevealSection id="solution" className="section-shell rounded-[36px] px-6 py-8 md:px-10 md:py-10">
            <div className="grid-12 items-center">
              <div className="col-span-12 lg:col-span-6 lg:order-2">
                <SectionHeading
                  eyebrow="The solution"
                  title="Zuvvy changes how kids use screens"
                  description="Instead of endless scrolling, Zuvvy gives kids a reason to create."
                />
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="panel-glass rounded-2xl px-4 py-4">
                    <p className="font-heading text-lg">Make to unlock</p>
                    <p className="mt-2 text-sm text-zuvvy-ink/78">Creation opens the next part of the experience.</p>
                  </div>
                  <div className="panel-glass rounded-2xl px-4 py-4">
                    <p className="font-heading text-lg">Story-led progress</p>
                    <p className="mt-2 text-sm text-zuvvy-ink/78">Every mission gives kids a reason to keep building.</p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 flex justify-center lg:col-span-6 lg:order-1">
                <PhoneDemo />
              </div>
            </div>
          </RevealSection>

          <RevealSection id="system" className="section-shell rounded-[36px] px-6 py-8 md:px-10 md:py-10">
            <SectionHeading
              eyebrow="The system"
              title="How Zuvvy works"
              description="A simple system that turns screen time into creative momentum."
              align="center"
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {systemCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className={`panel-glass interactive-card rounded-[28px] p-6 ${card.tone}`}
                >
                  <div className="flex items-center justify-between">
                    <card.icon className="text-zuvvy-purple" size={22} />
                    <span className="accent-hand text-lg text-zuvvy-teal">Playful logic</span>
                  </div>
                  <p className="mt-5 font-heading text-2xl">{card.title}</p>
                  <p className="mt-3 text-sm leading-6 text-zuvvy-ink/80">{card.detail}</p>
                </motion.article>
              ))}
            </div>
          </RevealSection>

          <RevealSection id="impact" className="impact-fit-section">
            <div className="impact-left-panel">
              <RadialImpactChart />
            </div>

            <div className="impact-right-panel">
              <TimeMeter minutes={46} />
            </div>
          </RevealSection>

          <RevealSection id="competition" className="section-shell rounded-[36px] px-6 py-8 md:px-10 md:py-10">
            <div className="grid-12 items-center">
              <div className="col-span-12 lg:col-span-5">
                <SectionHeading
                  eyebrow="School competition"
                  title="Creation becomes a competition"
                  description="Schools, cities, and students compete to build more."
                />
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full bg-zuvvy-purple/12 px-4 py-2 text-sm">This month - Delhi vs Mumbai</span>
                  <span className="rounded-full bg-zuvvy-teal/14 px-4 py-2 text-sm">School rankings</span>
                  <span className="rounded-full bg-zuvvy-yellow/24 px-4 py-2 text-sm">When creation becomes social, it becomes powerful.</span>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7">
                <CityLeaderboard />
              </div>
            </div>
          </RevealSection>

          <RevealSection id="trust" className="section-shell rounded-[36px] px-6 py-8 md:px-10 md:py-10">
            <SectionHeading
              eyebrow="Trust"
              title="Built for safety. Designed for growth."
              description="Parents get visibility and control while kids get a space built for creating."
              align="center"
            />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {trustCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="panel-glass interactive-card rounded-[28px] p-6"
                >
                  <card.icon size={24} className="text-zuvvy-blue" />
                  <p className="mt-5 font-heading text-2xl">{card.title}</p>
                  <p className="mt-3 text-sm leading-6 text-zuvvy-ink/80">{card.detail}</p>
                </motion.article>
              ))}
            </div>
          </RevealSection>

          <RevealSection id="survey" className="section-shell rounded-[40px] px-6 py-8 md:px-10 md:py-12">
            <div className="grid-12 items-center">
              <div className="col-span-12 lg:col-span-8">
                <p className="accent-hand text-2xl text-zuvvy-purple">Ready to shape Zuvvy?</p>
                <h2 className="mt-3 font-heading text-3xl leading-tight md:text-5xl">Help shape Zuvvy</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-zuvvy-ink/80 md:text-lg">
                  We’re building Zuvvy for the next generation of creators. Your feedback will shape how it works.
                </p>
                <div className="mt-7 hero-cta-stack !justify-start">
                  <RippleButton className="bg-zuvvy-yellow text-zuvvy-ink shadow-bubble" onClick={() => setSurveyOpen(true)}>
                    Start 1-minute survey 🎮
                  </RippleButton>
                </div>
              </div>
              <div className="col-span-12 flex justify-center lg:col-span-4">
                <div className="panel-glass rounded-[30px] p-6 text-center">
                  <Mascot mood="clap" className="mx-auto h-36 w-36" />
                  <p className="mt-3 font-heading text-2xl">1 minute survey</p>
                  <p className="mt-2 text-sm text-zuvvy-ink/76">Help shape missions, rewards, and the trust layer families want.</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
                    <span className="rounded-full bg-zuvvy-purple/10 px-3 py-2">Startup signal</span>
                    <span className="rounded-full bg-zuvvy-teal/12 px-3 py-2">Kid delight</span>
                    <span className="rounded-full bg-zuvvy-yellow/20 px-3 py-2">Parent trust</span>
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </main>

      <div className="pointer-events-none fixed bottom-4 right-4 z-40 hidden md:block">
        <motion.div
          className="pointer-events-auto panel-glass flex items-center gap-3 rounded-full px-4 py-3"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        >
          <Mascot mood={mascotState.mood} className="h-10 w-10" />
          <div className="min-w-[150px]">
            <p className="font-heading text-xs">Zuvvy Guide</p>
            <p className="text-[11px] text-zuvvy-ink/78">{mascotState.message}</p>
          </div>
          <button
            type="button"
            onClick={() => setSurveyOpen(true)}
            className="rounded-full bg-zuvvy-yellow px-3 py-1.5 text-xs font-heading text-zuvvy-ink transition hover:-translate-y-0.5"
          >
            Survey
          </button>
        </motion.div>
      </div>

      <SurveyGame open={surveyOpen} onClose={() => setSurveyOpen(false)} />
    </div>
  );
}
