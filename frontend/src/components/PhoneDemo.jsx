import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, PenLine, Rocket, Sparkles } from 'lucide-react';

const items = [
  { icon: Camera, label: 'Photo Post', reward: 4 },
  { icon: PenLine, label: 'How I Made It', reward: 6 },
  { icon: Rocket, label: 'Challenge Mode', reward: 8 },
  { icon: Sparkles, label: 'Create Reel', reward: 7 }
];

export default function PhoneDemo() {
  const [selected, setSelected] = useState('How I Made It');

  const totalBoost = useMemo(() => {
    const active = items.find((item) => item.label === selected);
    return 20 + (active?.reward || 0);
  }, [selected]);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[320px]"
      initial={{ y: 14, rotate: -2 }}
      animate={{ y: [14, 0, 14], rotate: [-2, 0, -2] }}
      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
    >
      <div className="rounded-[34px] border border-zuvvy-purple/35 bg-zuvvy-white/75 p-4 shadow-bubble backdrop-blur-md">
        <div className="mb-3 rounded-2xl bg-gradient-to-r from-zuvvy-purple/20 to-zuvvy-teal/20 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="font-heading text-sm">Zuvvy Playground</p>
            <span className="rounded-full bg-zuvvy-yellow/55 px-2 py-1 text-[10px] font-heading">Mission Live</span>
          </div>
          <p className="mt-1 text-xs text-zuvvy-ink/75">Create to unlock more fun</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-zuvvy-blue/25">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-zuvvy-teal to-zuvvy-purple"
              animate={{ width: `${Math.min(100, totalBoost)}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              role="button"
              tabIndex={0}
              onClick={() => setSelected(item.label)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  setSelected(item.label);
                }
              }}
              className={`cursor-pointer rounded-2xl border p-3 ${
                selected === item.label
                  ? 'border-zuvvy-purple/60 bg-zuvvy-purple/10 shadow-soft'
                  : 'border-zuvvy-blue/35 bg-zuvvy-white'
              }`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <item.icon size={16} className="text-zuvvy-purple" />
              <p className="mt-2 text-xs font-heading">{item.label}</p>
              <p className="mt-1 text-[10px] text-zuvvy-ink/75">+{item.reward} time points</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.span
        className="absolute left-0 top-5 max-w-[94px] truncate rounded-full bg-zuvvy-yellow px-2 py-1 text-[10px] font-heading"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      >
        +{totalBoost} min
      </motion.span>
      <motion.span
        className="absolute bottom-6 right-0 max-w-[120px] truncate rounded-full bg-zuvvy-teal px-2 py-1 text-[10px] font-heading"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}
      >
        {selected}
      </motion.span>
    </motion.div>
  );
}
