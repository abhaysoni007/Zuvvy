import { Crown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Mascot from './Mascot';

const cities = [
  { name: 'DPS Kanpur', score: 847, tone: 'from-zuvvy-purple to-zuvvy-blue', place: '🥇' },
  { name: 'St. Xavier\'s', score: 731, tone: 'from-zuvvy-teal to-zuvvy-blue', place: '🥈' },
  { name: 'Kendriya Vidyalaya', score: 698, tone: 'from-zuvvy-yellow to-zuvvy-purple', place: '🥉' }
];

export default function CityLeaderboard() {
  return (
    <div className="chart-stage rounded-[32px] p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-heading text-2xl md:text-3xl">This month - Delhi vs Mumbai</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zuvvy-ink/76">
            Schools, cities, and students compete to build more.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-zuvvy-yellow/24 px-4 py-2 text-sm font-heading">
          <Sparkles size={16} />
          Creation becomes social
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_170px]">
        <div className="rounded-[28px] bg-zuvvy-blue/10 p-4 md:p-5">
          <div className="grid grid-cols-3 items-end gap-5">
            {cities.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 30, scaleY: 0.2 }}
                whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ type: 'spring', stiffness: 140, damping: 12, delay: index * 0.08 }}
                className="text-center"
              >
                {index === 0 ? (
                  <motion.div
                    className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-zuvvy-yellow text-zuvvy-ink shadow-soft"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Crown size={18} />
                  </motion.div>
                ) : (
                  <div className="mb-3 h-10" />
                )}

                <div className="relative mx-auto flex h-64 items-end justify-center">
                  <div className="absolute bottom-1 h-4 w-24 rounded-full bg-zuvvy-ink/10 blur-sm" />
                  <div
                    style={{ height: `${Math.max(120, city.score * 0.22)}px` }}
                    className={`leader-column w-full max-w-[92px] bg-gradient-to-b ${city.tone}`}
                  />
                </div>
                <p className="mt-4 font-heading text-lg">{city.name}</p>
                <p className="text-sm text-zuvvy-ink/68">{city.score} points {city.place}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="panel-glass rounded-[28px] p-4 text-center">
          <motion.div
            animate={{ y: [0, -7, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          >
            <Mascot mood="clap" className="mx-auto h-28 w-28" />
          </motion.div>
          <p className="accent-hand mt-3 text-xl text-zuvvy-purple">Build more together.</p>
          <p className="mt-2 text-sm leading-6 text-zuvvy-ink/76">
            When creation becomes social, it becomes powerful.
          </p>
        </div>
      </div>
    </div>
  );
}
