import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Mascot from './Mascot';

const states = {
  scroll: {
    title: 'Old app loop',
    mood: 'sad',
    accent: 'bg-zuvvy-ink/8',
    note: 'Content is unlocked by staying longer, so attention leaks away.',
    items: ['Infinite feed first', 'Consumption unlocks more consumption', 'No portfolio or earned progress']
  },
  create: {
    title: 'Zuvvy loop',
    mood: 'happy',
    accent: 'bg-zuvvy-teal/12',
    note: 'Creation unlocks the next moment, so progress feels earned and visible.',
    items: ['Prompt -> make -> share', 'Creation unlocks more time', 'Badges, missions, and proof of growth']
  }
};

function LoopCard({ title, items, accent, note, active }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={`panel-glass interactive-card rounded-[30px] p-5 ${accent} ${active ? 'shadow-glow' : ''}`}
    >
      <p className="font-heading text-2xl">{title}</p>
      <p className="mt-2 text-sm leading-6 text-zuvvy-ink/78">{note}</p>
      <div className="mt-5 grid gap-3">
        {items.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.08 + index * 0.05 }}
            className="rounded-[22px] border border-zuvvy-white/70 bg-zuvvy-white/88 px-4 py-3 text-sm shadow-soft"
          >
            {item}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SplitComparisonGraph() {
  const [mode, setMode] = useState('create');
  const state = states[mode];

  return (
    <div className="chart-stage rounded-[30px] p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-heading text-2xl md:text-3xl">The behavior engine</p>
          <p className="mt-2 text-sm leading-6 text-zuvvy-ink/76">
            One system rewards more watching. The other rewards more making.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.keys(states).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setMode(key)}
              className={`rounded-full px-4 py-2 font-heading text-sm transition ${
                mode === key ? 'bg-zuvvy-purple text-zuvvy-white shadow-soft' : 'bg-zuvvy-white/80'
              }`}
            >
              {key === 'scroll' ? 'Old apps' : 'Zuvvy'}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_170px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: mode === 'create' ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === 'create' ? -24 : 24 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            <LoopCard
              title={state.title}
              items={state.items}
              accent={state.accent}
              note={state.note}
              active
            />
          </motion.div>
        </AnimatePresence>

        <div className="panel-glass rounded-[28px] p-4 text-center">
          <motion.div
            animate={{ y: [0, -7, 0], rotate: [0, 1.5, 0] }}
            transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          >
            <Mascot mood={state.mood} className="mx-auto h-28 w-28" />
          </motion.div>
          <p className="accent-hand mt-3 text-xl text-zuvvy-purple">{mode === 'create' ? 'This feels better.' : 'This feels empty.'}</p>
          <p className="mt-2 text-sm leading-6 text-zuvvy-ink/76">
            Zuvvy turns passive screen habits into active creative habits.
          </p>
        </div>
      </div>
    </div>
  );
}
