/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { REVIEWS } from '../data';
import { Language } from '../types';

export default function TestimonialSlider({ lang }: { lang: Language }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prev = () => {
    setCurrentIdx((prevIdx) => (prevIdx === 0 ? REVIEWS.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIdx((prevIdx) => (prevIdx === REVIEWS.length - 1 ? 0 : prevIdx + 1));
  };

  const activeReview = REVIEWS[currentIdx];

  return (
    <div id="testimonial-slider-container" className="relative max-w-4xl mx-auto px-4">
      {/* Decorative Golden Ambient Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Slider Card */}
      <div className="relative bg-[#171213]/90 border border-[#D4AF37]/15 rounded-2xl p-6 md:p-12 shadow-2xl backdrop-blur-md">
        
        {/* Floating Quote icon ornament */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 text-[#D4AF37]/20">
          <Quote size={50} className="fill-current" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeReview.id}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10"
          >
            {/* Avatar display with glowing royal border */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-tr from-[#8B1E3F] via-[#D4AF37] to-[#171213] shadow-xl">
                <img
                  src={activeReview.avatar}
                  alt={activeReview.name[lang]}
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 bg-[#D4AF37] text-[#130E0F] rounded-full border border-[#171213] shadow">
                <Sparkles size={11} className="animate-spin duration-3000" />
              </div>
            </div>

            {/* Testimonial written words block */}
            <div className="flex-1 text-center md:text-left">
              {/* Gold Star rating */}
              <div className="flex items-center justify-center md:justify-start gap-1 mb-4 text-[#D4AF37]">
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-stone-200 text-sm md:text-base leading-relaxed font-sans mb-6 md:mb-8 italic">
                "{activeReview.text[lang]}"
              </blockquote>

              {/* Author Attribution */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-stone-850 pt-4 md:pt-6">
                <div>
                  <h6 className="text-base font-sans font-medium text-white tracking-tight">
                    {activeReview.name[lang]}
                  </h6>
                  <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase">
                    {activeReview.location[lang]} • {lang === 'en' ? 'PATRON' : 'सखी ग्राहक'}
                  </span>
                </div>
                <div className="text-[10px] text-stone-500 font-mono">
                  {lang === 'en' ? 'VERIFIED CUSTOMER' : 'प्रमाणित ग्राहक'} ({activeReview.date})
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Floating controls */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex gap-2 z-20">
          <button
            onClick={prev}
            className="p-2.5 rounded-full border border-stone-800 bg-stone-900/80 text-stone-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/35 hover:bg-stone-900 transition-all duration-300 shadow cursor-pointer"
            aria-label="Previous Review"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="p-2.5 rounded-full border border-stone-800 bg-stone-900/80 text-stone-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/35 hover:bg-stone-900 transition-all duration-300 shadow cursor-pointer"
            aria-label="Next Review"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Bottom pagination beads indicators */}
      <div className="flex justify-center items-center gap-1.5 mt-6">
        {REVIEWS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
              idx === currentIdx ? 'w-6 bg-[#D4AF37]' : 'w-1.5 bg-stone-800 hover:bg-stone-700'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
