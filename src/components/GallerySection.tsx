/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, Send, Camera } from 'lucide-react';
import { GALLERY_IMAGES } from '../data';
import { Language } from '../types';

export default function GallerySection({ lang, onEnquiry }: { lang: Language; onEnquiry: (name: string) => void }) {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'SAREE' | 'MODERN' | 'WEDDING'>('ALL');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Extract unique tags aligned with filters
  const filters: { id: 'ALL' | 'SAREE' | 'MODERN' | 'WEDDING'; label: { en: string; mr: string } }[] = [
    { id: 'ALL', label: { en: "All", mr: "सर्व" } },
    { id: 'SAREE', label: { en: "Sarees", mr: "साड्या" } },
    { id: 'MODERN', label: { en: "Modern Wear", mr: "आधुनिक" } },
    { id: 'WEDDING', label: { en: "Bridal Spec", mr: "वधू शृंगार" } }
  ];

  const filteredImages = GALLERY_IMAGES.filter((img) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'SAREE') return img.tag.en.toLowerCase().includes('saree') || img.tag.en.toLowerCase().includes('tradition');
    if (activeFilter === 'MODERN') return img.tag.en.toLowerCase().includes('modern') || img.tag.en.toLowerCase().includes('craftsmanship');
    if (activeFilter === 'WEDDING') return img.tag.en.toLowerCase().includes('wedding');
    return true;
  });

  const openLightbox = (src: string) => {
    const idx = GALLERY_IMAGES.findIndex((img) => img.src === src);
    if (idx !== -1) setLightboxIdx(idx);
  };

  const closeLightbox = () => setLightboxIdx(null);

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx !== null) {
      setLightboxIdx((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev! - 1));
    }
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx !== null) {
      setLightboxIdx((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev! + 1));
    }
  };

  return (
    <div id="gallery-masonry-wrapper" className="space-y-10">
      
      {/* Category Filter Pills bar */}
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-400 cursor-pointer ${
              activeFilter === filter.id
                ? 'bg-[#D4AF37] text-[#130E0F] font-bold shadow-lg shadow-[#D4AF37]/15'
                : 'bg-stone-950/60 text-stone-400 border border-stone-850 hover:text-white hover:border-stone-700'
            }`}
          >
            {filter.label[lang]}
          </button>
        ))}
      </div>

      {/* Masonry-style Bento Image Grid (with motion layout animations) */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img, idx) => (
            <motion.div
              layout
              key={img.src}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-96 rounded-xl overflow-hidden cursor-pointer border border-[#D4AF37]/5 hover:border-[#D4AF37]/25 transition-colors duration-500 shadow-xl"
              onClick={() => openLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.title[lang]}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Rich Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Floating Magnify Glass icon */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
                <Maximize2 size={13} className="text-[#D4AF37]" />
              </div>

              {/* Tag Label */}
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#8B1E3F]/90 text-white text-[9px] font-mono tracking-widest uppercase border border-[#D4AF37]/25">
                {img.tag[lang]}
              </div>

              {/* Caption details bottom */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                <h4 className="text-base font-sans font-medium text-white tracking-tight leading-snug group-hover:text-[#D4AF37] transition-colors duration-300">
                  {img.title[lang]}
                </h4>
                <div className="h-[1px] w-0 bg-[#D4AF37]/60 group-hover:w-full transition-all duration-500 mt-2.5" />
                <span className="text-[10px] font-mono tracking-wider text-stone-400 mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Camera size={11} className="text-[#D4AF37]" />
                  {lang === 'en' ? 'Click to View Showcase' : 'मोठ्या आकारात पाहण्यासाठी क्लिक करा'}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Fullscreen Interactive Lightbox Modal */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Close Button top-right */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-stone-900/60 hover:bg-stone-800 text-stone-300 hover:text-white transition-all cursor-pointer z-50 border border-stone-800"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>

            {/* Previous slide control */}
            <button
              onClick={prevLightbox}
              className="absolute left-4 md:left-8 p-3 rounded-full bg-stone-900/60 hover:bg-stone-800 text-stone-300 hover:text-[#D4AF37] transition-all cursor-pointer z-50 border border-stone-800"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Active Image Canvas */}
            <div className="relative max-w-4xl max-h-[75vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={GALLERY_IMAGES[lightboxIdx].src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                src={GALLERY_IMAGES[lightboxIdx].src}
                alt={GALLERY_IMAGES[lightboxIdx].title[lang]}
                className="max-w-full max-h-[75vh] object-contain rounded-lg border border-[#D4AF37]/15 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Next slide control */}
            <button
              onClick={nextLightbox}
              className="absolute right-4 md:right-8 p-3 rounded-full bg-stone-900/60 hover:bg-stone-800 text-stone-300 hover:text-[#D4AF37] transition-all cursor-pointer z-50 border border-stone-800"
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>

            {/* Captions & Inquiry Action at footer */}
            <div className="max-w-xl text-center mt-6 px-4" onClick={(e) => e.stopPropagation()}>
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase">
                {GALLERY_IMAGES[lightboxIdx].tag[lang]}
              </span>
              <h3 className="text-lg md:text-xl font-sans text-white font-medium tracking-tight mt-1">
                {GALLERY_IMAGES[lightboxIdx].title[lang]}
              </h3>
              
              {/* WhatsApp direct inquiry of this precise item */}
              <button
                onClick={() => onEnquiry(GALLERY_IMAGES[lightboxIdx].title[lang])}
                className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8B1E3F] to-[#5c1127] text-white hover:from-[#A2254C] font-medium text-xs tracking-widest uppercase transition-all duration-300 border border-[#D4AF37]/25 flex items-center justify-center gap-2 mx-auto shadow shadow-[#8B1E3F]/20 hover:scale-[1.02]"
              >
                <Send size={11} className="text-[#D4AF37]" />
                <span>{lang === 'en' ? 'Enquire via WhatsApp' : 'व्हॉट्सॲपवर विचारणा करा'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
