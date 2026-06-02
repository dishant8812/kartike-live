/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { TIMELINE } from '../data';
import { Language } from '../types';
import { Sparkles, Star, Calendar } from 'lucide-react';

export default function TimelineSection({ lang }: { lang: Language }) {
  return (
    <div id="timeline-container" className="relative max-w-5xl mx-auto px-4 md:px-6">
      {/* Centered vertical line drawn automatically */}
      <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#D4AF37]/45 via-stone-800 to-transparent pointer-events-none" />

      <div className="space-y-12 md:space-y-20">
        {TIMELINE.map((event, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-start ${
                isEven ? 'md:flex-row-reverse' : ''
              } justify-between`}
            >
              {/* Timeline Gold Marker Sphere */}
              <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-2 z-10 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="w-[18px] h-[18px] rounded-full bg-[#130E0F] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                >
                  <div className="w-[6px] h-[6px] rounded-full bg-[#D4AF37]" />
                </motion.div>
              </div>

              {/* Year Label Panel */}
              <div className="w-full md:w-[45%] pl-10 md:pl-0 md:text-right md:pr-10 flex md:block items-center gap-3">
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`${isEven ? 'md:text-left md:pl-10' : 'md:text-right'} flex flex-col`}
                >
                  <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-[0.25em] font-semibold mb-1 flex items-center gap-1.5 justify-start md:justify-end">
                    <Calendar size={12} className="inline opacity-75" />
                    {lang === 'en' ? 'MILESTONE' : 'संकल्प'}
                  </span>
                  <h4 className="text-2xl md:text-3.5xl font-sans tracking-tight text-white font-medium">
                    {event.year}
                  </h4>
                </motion.div>
              </div>

              {/* Decorative separator on desktop */}
              <div className="hidden md:block w-[10%]" />

              {/* Description Content Box */}
              <div className="w-full md:w-[45%] pl-10 md:pl-0">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className={`relative p-6 rounded-xl bg-stone-900/40 border border-[#D4AF37]/10 hover:border-[#D4AF37]/25 transition-all duration-500 backdrop-blur-sm shadow-xl shadow-black/20`}
                >
                  {/* Hanging luxury stars decoration inside box */}
                  <div className="absolute top-4 right-4 flex gap-1 text-[#D4AF37]/25 pointer-events-none">
                    <Star size={10} fill="currentColor" />
                    <Sparkles size={8} />
                  </div>

                  <h5 className="text-base md:text-lg font-sans font-medium text-[#f7e3c1] mb-2 tracking-tight">
                    {event.title[lang]}
                  </h5>
                  <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans">
                    {event.description[lang]}
                  </p>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
