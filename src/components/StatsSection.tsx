/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Heart, Sparkles, TrendingUp, Handshake } from 'lucide-react';
import { Language } from '../types';

interface StatItem {
  id: string;
  icon: React.FC<any>;
  label: { en: string; mr: string };
  prefix?: string;
  suffix: string;
  target: number;
  sub: { en: string; mr: string };
}

export default function StatsSection({ lang }: { lang: Language }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const stats: StatItem[] = [
    {
      id: 'quality',
      icon: ShieldCheck,
      label: { en: "Premium Quality", mr: "अस्सल हमी" },
      suffix: "%",
      target: 100,
      sub: { en: "Pure Silk Certified", mr: "१००% शुद्ध सिल्क हमी" }
    },
    {
      id: 'fashion',
      icon: Sparkles,
      label: { en: "Latest Fashion", mr: "नवीनतम फॅशन" },
      suffix: "+",
      target: 1250,
      sub: { en: "New Designs Weekly", mr: "१,२५०+ नवनवीन स्टॉक" }
    },
    {
      id: 'pricing',
      icon: TrendingUp,
      label: { en: "Affordable Price", mr: "किफायतशीर दर" },
      prefix: "₹",
      suffix: "",
      target: 499,
      sub: { en: "Direct Weaver Value Starts From", mr: " थेट विणकरांकडून वाजवी हमी" }
    },
    {
      id: 'wholesale',
      icon: Handshake,
      label: { en: "Wholesale Ready", mr: "होलसेल खरेदी" },
      suffix: "x",
      target: 15,
      sub: { en: "Bulk Volume Discount", mr: "१५% अधिक नफा सूट" }
    },
    {
      id: 'customers',
      icon: Heart,
      label: { en: "Trusted Customers", mr: "विश्वासार्ह ग्राहक" },
      suffix: "K+",
      target: 25,
      sub: { en: "Smiles Catered", mr: "२५,०००+ समाधानी सख्या" }
    }
  ];

  return (
    <div ref={containerRef} id="stats-section-grid" className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.08 }}
            className={`p-6 rounded-xl border border-[#D4AF37]/10 bg-stone-950/50 backdrop-blur-md flex flex-col items-center text-center group hover:border-[#D4AF37]/35 transition-all duration-500 relative overflow-hidden ${
              idx === stats.length - 1 ? 'col-span-2 lg:col-span-1' : ''
            }`}
          >
            {/* Elegant glowing sphere */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#D4AF37]/5 rounded-full blur-xl group-hover:bg-[#8B1E3F]/10 transition-colors duration-500" />
            
            {/* Floating Luxury Icon */}
            <div className="p-3.5 rounded-full bg-[#1A1214] border border-[#D4AF37]/20 text-[#D4AF37] mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500">
              <Icon size={22} className="animate-pulse" />
            </div>

            {/* Title / Description */}
            <h5 className="text-stone-400 text-[11px] tracking-widest uppercase font-mono mb-2">
              {stat.label[lang]}
            </h5>

            {/* Custom Animated Counter value */}
            <div className="text-3xl md:text-3.5xl font-sans tracking-tight text-white font-medium mb-1.5 flex items-baseline">
              {stat.prefix && <span className="text-lg md:text-xl text-[#D4AF37] mr-0.5">{stat.prefix}</span>}
              <Counter value={stat.target} suffix={stat.suffix} active={isVisible} />
            </div>

            <p className="text-stone-500 text-[10px] leading-relaxed max-w-[140px]">
              {stat.sub[lang]}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

// Performant React-based lightweight Counter
function Counter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 2000; // ms
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quartic out easing
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(ease * value);
      
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(update);
  }, [value, active]);

  return (
    <span className="font-mono text-white tracking-widest">
      {count.toLocaleString()}
      <span className="text-xs md:text-sm text-[#D4AF37] ml-0.5">{suffix}</span>
    </span>
  );
}
