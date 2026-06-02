/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Sparkles, Check, Send, Crown, Gem, Shirt, Layers, Feather, Wind, Briefcase, Package, ShoppingBag, Users } from 'lucide-react';
import { SareeCategory, Language } from '../types';

// Simple dynamic icon mapper
const LucideIconMap: Record<string, React.FC<any>> = {
  Crown, Gem, Sparkles, Shirt, Layers, Feather, Wind, Briefcase, Package, ShoppingBag, Users
};

interface CategoryCardProps {
  key?: string;
  category: SareeCategory;
  lang: Language;
  onEnquiry: (productName: string) => void;
}

export default function CategoryCard({ category, lang, onEnquiry }: CategoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ rX: 0, rY: 0, shadowX: 0, shadowY: 0 });
  const [expanded, setExpanded] = useState(false);

  // 3D Tilt Effect on Desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    // rotation multipliers
    const rX = relativeY * -15; // rotate on X based on vertical delta
    const rY = relativeX * 15;  // rotate on Y based on horizontal delta

    // shadow offsets
    const shadowX = relativeX * -20;
    const shadowY = relativeY * -20;

    setCoords({ rX, rY, shadowX, shadowY });
  };

  const handleMouseLeave = () => {
    setCoords({ rX: 0, rY: 0, shadowX: 0, shadowY: 0 });
  };

  const title = category.title[lang];
  const description = category.description[lang];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${coords.rX}deg) rotateY(${coords.rY}deg)`,
        transition: coords.rX === 0 ? 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        boxShadow: `${coords.shadowX}px ${coords.shadowY}px 35px -10px rgba(212, 175, 55, 0.12)`,
      }}
      className="group relative bg-[#130E0F]/90 border border-[#D4AF37]/15 rounded-xl overflow-hidden backdrop-blur-md flex flex-col h-full transform-gpu"
    >
      {/* Golden Highlight Border Glow */}
      <div className="absolute inset-0 border border-transparent group-hover:border-[#D4AF37]/25 rounded-xl transition-colors duration-500 pointer-events-none" />

      {/* Image Showcase */}
      <div className="relative h-64 md:h-72 overflow-hidden bg-stone-900">
        <img
          src={category.image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Dark Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#130E0F] via-transparent to-transparent opacity-95" />
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
          <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase font-mono font-semibold mb-1 flex items-center gap-1">
            <Sparkles size={10} className="animate-spin duration-3000" />
            {lang === 'en' ? 'WORLD-CLASS LUXURY' : 'अतिशय उत्कृष्ट'}
          </span>
          <h3 className="text-xl md:text-2xl font-sans font-medium text-white tracking-tight leading-tight">
            {title}
          </h3>
        </div>
      </div>

      {/* Card Content body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <p className="text-stone-300 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Benefits bullets list */}
        <ul className="space-y-3.5 mb-6">
          {category.benefits.map((b, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-400">
              <span className="p-0.5 rounded bg-[#8B1E3F]/50 text-[#D4AF37] border border-[#D4AF37]/20 mt-0.5">
                <Check size={10} />
              </span>
              <span>{b[lang]}</span>
            </li>
          ))}
        </ul>

        {/* Expanded collection details */}
        <div className="border-t border-stone-800/80 pt-4 mt-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between text-xs tracking-wider text-[#D4AF37] uppercase font-mono py-2 hover:text-white transition-colors duration-300"
          >
            <span>{expanded ? (lang === 'en' ? 'HIDE SPECIFICATIONS' : 'तपशील लपवा') : (lang === 'en' ? 'EXPLORE CATALOG & SALIENT PRICING' : 'कॅटलॉग व किमती पहा')}</span>
            <ChevronRight size={14} className={`transform transition-transform duration-300 ${expanded ? 'rotate-90 text-white' : 'text-[#D4AF37]'}`} />
          </button>

          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 space-y-3.5 overflow-hidden"
            >
              <div className="p-3 bg-stone-900/60 rounded-lg border border-stone-800 space-y-3">
                {category.subproducts.map((sub, sIdx) => {
                  const IconComp = LucideIconMap[sub.icon] || Sparkles;
                  return (
                    <div key={sIdx} className="flex justify-between items-center text-xs pb-2.5 border-b border-stone-800/40 last:border-b-0 last:pb-0">
                      <div className="flex items-center gap-2 text-stone-300">
                        <span className="text-[#D4AF37]">
                          <IconComp size={13} />
                        </span>
                        <span>{sub.name[lang]}</span>
                      </div>
                      <span className="font-mono text-[11px] text-[#D4AF37]/90 font-medium">
                        {sub.priceRange}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => onEnquiry(title)}
          className="w-full mt-6 py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#8B1E3F] to-[#5c1127] text-white hover:from-[#A2254C] hover:to-[#741632] font-medium text-xs tracking-widest uppercase transition-all duration-300 border border-[#D4AF37]/20 flex items-center justify-center gap-2 group-hover:scale-[1.01] shadow-md shadow-[#8B1E3F]/10 hover:shadow-[#8B1E3F]/30"
        >
          <Send size={12} className="text-[#D4AF37] animate-pulse" />
          <span>{lang === 'en' ? 'ENQUIRE ON WHATSAPP' : 'व्हाट्सअप चौकशी करा'}</span>
        </button>
      </div>
    </motion.div>
  );
}
