/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Crown } from 'lucide-react';

export default function Loader({ onFinished }: { onFinished: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onFinished, 950); // allow fadeout completion
          }, 300);
          return 100;
        }
        // Smooth logarithmic increments for luxury feel
        const diff = Math.max(1, Math.round((100 - prev) * 0.15));
        return prev + diff;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          id="luxury-loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d090a] text-[#f7e3c1]"
          exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        >
          {/* Symmetrical Luxury Grid Lines (Drawn slowly) */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent" />

          {/* Golden Ambient Glow */}
          <div className="absolute w-[350px] h-[350px] bg-[#d4af37] opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />

          <div className="relative text-center px-4 max-w-md">
            {/* Crown Icon with glowing animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="inline-flex items-center justify-center mb-6 text-[#D4AF37]"
            >
              <div className="relative p-4 rounded-full border border-[#D4AF37]/25 bg-[#171213] shadow-lg shadow-[#D4AF37]/10">
                <Crown size={38} className="animate-pulse" />
                <motion.div 
                  className="absolute -inset-1 rounded-full border border-[#D4AF37]/35"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            {/* Brand Header */}
            <motion.h1
              initial={{ letterSpacing: "0.25em", opacity: 0 }}
              animate={{ letterSpacing: "0.15em", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-2xl md:text-3xl font-sans font-medium tracking-tight text-white mb-2 uppercase"
            >
              KARTIKE
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xs tracking-[0.2em] text-[#D4AF37] uppercase mb-12 font-sans font-bold"
            >
              SAREE CENTER • कार्तिके साडी सेंटर
            </motion.h2>

            {/* Premium Progress Bar Layout */}
            <div className="w-[180px] mx-auto relative mb-3">
              <div className="h-[2px] w-full bg-stone-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8B1E3F] via-[#D4AF37] to-[#f7e3c1]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-2 text-[10px] font-mono text-[#D4AF37]/75 tracking-widest">
                <span>REVERENCE</span>
                <span>{progress}%</span>
              </div>
            </div>

            {/* Flowing Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex items-center justify-center gap-1.5 text-stone-400 text-[10px] tracking-widest"
            >
              <Sparkles size={11} className="text-[#D4AF37]" />
              <span>CRAFTING THE EMBODIMENT OF COUTURE</span>
            </motion.div>
          </div>

          {/* Corner traditional layout frames */}
          <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/20" />
          <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/20" />
          <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/20" />
          <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
