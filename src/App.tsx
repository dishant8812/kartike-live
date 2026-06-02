/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Crown, Sparkles, Send, Phone, Mail, MapPin, 
  Menu, X, ChevronDown, MessageSquare, ArrowUp, Heart, Star, HelpCircle
} from 'lucide-react';

import { Language } from './types';
import { BUSINESS_INFO, CATEGORIES, FAQS } from './data';

import Loader from './components/Loader';
import ThreeSareeCanvas from './components/ThreeSareeCanvas';
import CategoryCard from './components/CategoryCard';
import TimelineSection from './components/TimelineSection';
import StatsSection from './components/StatsSection';
import TestimonialSlider from './components/TestimonialSlider';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [faqsExpanded, setFaqsExpanded] = useState<Record<number, boolean>>({});
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Monitor mouse position for 3D parallax hero
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Monitor scroll for headers & back-to-top buttons
  useEffect(() => {
    const handleScroll = () => {
      // Toggle floating button
      if (window.scrollY > 500) {
        setShowFloatingBtn(true);
      } else {
        setShowFloatingBtn(false);
      }

      // Intersection tracking for current active section highlight
      const sections = ['home', 'story', 'collection', 'stats', 'gallery', 'contact', 'faq'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLangToggle = (targetLang: Language) => {
    setLang(targetLang);
  };

  const handleGlobalEnquiry = (itemName: string) => {
    const textStr = lang === 'en'
      ? `Hello Rupali Ma'am (Kartike Saree Center), I am very interested in: *${itemName}*. Could you please share catalog designs?`
      : `नमस्कार रूपाली मॅडम (कार्तिके साडी सेंटर), मी *${itemName}* बद्दल खूप उत्सुक आहे. कृपया मला कॅटलॉग डिझाईन्स मिळतील का?`;
    
    const url = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(textStr)}`;
    window.open(url, '_blank');
  };

  const toggleFaq = (idx: number) => {
    setFaqsExpanded((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setShowMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#0d090a] text-[#f7e3c1] font-sans antialiased bg-mesh-blur relative overflow-x-hidden selection:bg-[#8B1E3F] selection:text-white">
      
      {/* 1. Breathtaking Introductory Loader */}
      <Loader onFinished={() => setLoading(false)} />

      {!loading && (
        <div id="application-mount-root">
          
          {/* Symmetrical Luxury Grid Decorative Framework overlays (subtle ambient rules) */}
          <div className="absolute top-[800px] left-0 w-[1px] h-[3000px] bg-gradient-to-b from-[#D4AF37]/15 to-transparent pointer-events-none hidden xl:block" />
          <div className="absolute top-[800px] right-0 w-[1px] h-[3000px] bg-gradient-to-b from-[#D4AF37]/15 to-transparent pointer-events-none hidden xl:block" />

          {/* 2. Premium Fixed Navigation bar (Floating Glassmorphism) */}
          <header className="fixed top-0 inset-x-0 z-50 bg/80 backdrop-blur-md border-b border-[#D4AF37]/10">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
              
              {/* Brand Logo with golden emblem */}
              <div 
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => scrollTo('home')}
                id="brand-logo-trigger"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8B1E3F] to-[#D4AF37] p-[1px]">
                  <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center text-[#D4AF37]">
                    <Crown size={18} className="animate-pulse" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-serif text-lg md:text-xl font-bold tracking-[0.1em] text-white leading-tight">
                    KARTIKE
                  </h1>
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[#D4AF37] font-semibold">
                    {lang === 'en' ? 'SAREE CENTER' : 'कार्तिके साडी सेंटर'}
                  </span>
                </div>
              </div>

              {/* Desktop Menu Link List */}
              <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.2em] font-mono">
                {[
                  { id: 'home', label: { en: 'Home', mr: 'मुख्य' } },
                  { id: 'story', label: { en: 'Story', mr: 'परंपरा' } },
                  { id: 'collection', label: { en: 'Collection', mr: 'संग्रह' } },
                  { id: 'gallery', label: { en: 'Gallery', mr: 'दालन' } },
                  { id: 'contact', label: { en: 'Contact', mr: 'संपर्क' } },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`hover:text-[#D4AF37] transition-all relative py-1 cursor-pointer ${
                      activeSection === item.id ? 'text-[#D4AF37]' : 'text-stone-300'
                    }`}
                  >
                    <span>{item.label[lang]}</span>
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#D4AF37]"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                ))}
              </nav>

              {/* Luxury Language Switcher & Call CTA */}
              <div className="hidden lg:flex items-center gap-6">
                {/* Language switch beads */}
                <div className="flex items-center gap-1 p-1 rounded-full border border-stone-800 bg-stone-900/60 font-mono text-[9px] tracking-widest font-bold">
                  <button
                    onClick={() => handleLangToggle('en')}
                    className={`px-3 py-1.5 rounded-full uppercase transition-all duration-300 cursor-pointer ${
                      lang === 'en' ? 'bg-[#D4AF37] text-black font-semibold shadow' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => handleLangToggle('mr')}
                    className={`px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      lang === 'mr' ? 'bg-[#D4AF37] text-black font-semibold shadow' : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    मराठी
                  </button>
                </div>

                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="px-4 py-2 text-[10px] tracking-widest uppercase font-mono font-bold text-[#D4AF37] border border-[#D4AF37]/25 rounded-md hover:bg-[#8B1E3F]/35 transition-all flex items-center gap-2"
                >
                  <Phone size={11} />
                  <span>{lang === 'en' ? 'CALL NOW' : 'संपर्क साधा'}</span>
                </a>
              </div>

              {/* Mobile controls bar (Language + Toggle Menu) */}
              <div className="flex lg:hidden items-center gap-3">
                {/* Language toggle micro-pill */}
                <button
                  onClick={() => handleLangToggle(lang === 'en' ? 'mr' : 'en')}
                  className="px-2.5 py-1.5 text-[9px] font-mono tracking-wider uppercase font-extrabold rounded-md border border-stone-800 bg-stone-900/90 text-[#D4AF37]"
                >
                  {lang === 'en' ? 'मराठी' : 'ENGLISH'}
                </button>

                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2 text-stone-300 hover:text-[#D4AF37] focus:outline-none cursor-pointer"
                  aria-label="Toggle mobile menu"
                >
                  {showMobileMenu ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>

            </div>
          </header>

          {/* Mobile Drawer Overlay Menu */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="fixed top-[73px] inset-x-0 z-40 bg-[#0d090a]/95 border-b border-stone-850 p-6 flex flex-col gap-6 lg:hidden backdrop-blur-lg shadow-2xl"
              >
                <div className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest text-center">
                  {[
                    { id: 'home', label: { en: 'Home', mr: 'मुख्य' } },
                    { id: 'story', label: { en: 'Story', mr: 'परंपरा' } },
                    { id: 'collection', label: { en: 'Collection', mr: 'संग्रह' } },
                    { id: 'gallery', label: { en: 'Gallery', mr: 'दालन' } },
                    { id: 'contact', label: { en: 'Contact', mr: 'संपर्क' } },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className="py-2.5 text-stone-200 hover:text-[#D4AF37] border-b border-stone-900/40 text-center active:bg-stone-900/40 rounded transition-colors"
                    >
                      {item.label[lang]}
                    </button>
                  ))}
                </div>

                <div className="flex justify-center pt-2">
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="w-full text-center py-3 rounded bg-gradient-to-r from-[#8B1E3F] to-[#5c1127] text-white font-mono text-xs tracking-widest uppercase border border-[#D4AF37]/20"
                  >
                    {lang === 'en' ? 'Direct Showroom Line' : 'थेट शोरूम संपर्क नंबर'}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. HERO SECTION (With real 3D draping Three.js artwork on right side) */}
          <section id="home" className="relative min-h-screen pt-28 pb-10 flex items-center justify-center flex-col overflow-hidden">
            
            {/* Background elements (Parallax dots and golden ribbons) */}
            <div className="absolute inset-0 bg-mesh-blur opacity-80 pointer-events-none" />
            <div className="absolute top-[15%] left-[5%] w-72 h-72 bg-[#8B1E3F]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[5%] w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
              
              {/* Product Slogan and CTAs (Left) with 3D Parallax Tilt */}
              <div 
                className="lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left mt-4 md:mt-0"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePos.y * -16}deg) rotateY(${mousePos.x * 16}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
              >
                
                {/* Traditional luxury badge header */}
                <div 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#161011]/80 backdrop-blur text-[9px] md:text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-mono font-semibold"
                  style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}
                >
                  <Crown size={11} className="text-[#D4AF37]" />
                  <span>{lang === 'en' ? 'Rupali Patil Initiative' : 'रूपाली पाटील उपक्रम'}</span>
                  <span className="hidden md:inline text-stone-500">•</span>
                  <span className="hidden md:inline">{lang === 'en' ? 'Tambepura, Amalner' : 'तांबेपुरा, अमळनेर'}</span>
                </div>

                <div 
                  className="space-y-3 md:space-y-4"
                  style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
                >
                  {/* Luxury bilingual branding display */}
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1] font-bold">
                    Kartike Saree Center
                  </h2>
                  <h3 className="text-xl md:text-2xl font-serif text-[#D4AF37] italic font-medium">
                    कार्तिके साडी सेंटर
                  </h3>

                  <div className="h-[2px] w-24 bg-gradient-to-r from-[#D4AF37] to-transparent mx-auto lg:mx-0 mt-2" />

                  <p className="text-base md:text-lg text-stone-100 font-sans tracking-wide leading-relaxed font-semibold max-w-xl mx-auto lg:mx-0 pt-1">
                    "{BUSINESS_INFO.tagline[lang]}"
                  </p>
                </div>

                <p 
                  className="text-xs md:text-sm text-stone-300 leading-relaxed max-w-md mx-auto lg:mx-0"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {lang === 'en'
                    ? 'Discover the absolute peak of ladies sartorial luxury. Handcurated bridal Paithani silks, stylish modern coordinate ensembles, and high quality cottons at honest wholesale values.'
                    : 'साडी आणि डिझायनर ड्रेसेसचे अमळनेरमधील सर्वात भव्य आणि विश्वासार्ह दालन. उत्कृष्ट विवाह पैठणी सिल्क, आधुनिक पोशाख आणि घाऊक व होलसेल खरेदी साठा थेट तुमच्या सेवेसाठी.'}
                </p>

                {/* Call-to-action triggers */}
                <div 
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
                  style={{ transform: 'translateZ(45px)', transformStyle: 'preserve-3d' }}
                >
                  <button
                    onClick={() => scrollTo('collection')}
                    className="px-7 py-4 rounded-lg bg-[#D4AF37] hover:bg-[#ebd074] text-black font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-xl shadow-[#D4AF37]/10 flex items-center gap-2 group cursor-pointer hover:scale-[1.02]"
                  >
                    <span>{lang === 'en' ? 'EXPLORE COLLECTION' : 'संग्रह पहा'}</span>
                    <Sparkles size={13} className="text-black inline" />
                  </button>

                  <button
                    onClick={() => handleGlobalEnquiry('Showroom General')}
                    className="px-7 py-4 rounded-lg bg-gradient-to-r from-[#8B1E3F] to-[#5c1127] text-white hover:from-[#A2254C] font-semibold text-xs tracking-widest uppercase transition-all duration-300 border border-[#D4AF37]/15 flex items-center gap-2 group cursor-pointer hover:scale-[1.02]"
                  >
                    <span>{lang === 'en' ? 'WHATSAPP INQUIRY' : 'व्हाट्सअप चौकशी'}</span>
                    <Send size={12} className="text-[#D4AF37] inline" />
                  </button>
                </div>

                {/* WhatsApp Group Invitation Button - High Contrast Maroon and Gold */}
                <div 
                  className="pt-4"
                  style={{ transform: 'translateZ(60px)' }}
                >
                  <a
                    href="https://chat.whatsapp.com/FPfcTsbOvLcBTxv3zZl63u"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-3 px-5 py-4 rounded-xl bg-gradient-to-r from-[#8B1E3F] via-[#A2254C] to-[#D4AF37] hover:from-[#A2254C] hover:to-[#ebd074] text-white hover:text-black font-semibold text-center text-xs md:text-[13px] tracking-wide transition-all duration-300 border border-[#D4AF37]/35 shadow-2xl hover:scale-[1.02] cursor-pointer"
                  >
                    <span className="relative flex h-3 w-3 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
                    </span>
                    <span>
                      Join Our WhatsApp Group for Latest Collections | नवीन कलेक्शन पाहण्यासाठी आमच्या व्हॉट्सॲप ग्रुपमध्ये सामील व्हा
                    </span>
                  </a>
                </div>

                {/* Micro social highlights */}
                <div 
                  className="pt-4 flex justify-center lg:justify-start items-center gap-8 text-[11px] text-stone-400 font-mono"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  <div className="flex items-center gap-2">
                    <Heart size={14} className="text-[#8B1E3F] fill-current" />
                    <span>{lang === 'en' ? 'Boutique Collection' : 'डिझायनर सिल्क'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Crown size={14} className="text-[#D4AF37]" />
                    <span>{lang === 'en' ? 'Retailer & Supplier' : 'घाऊक आणि किरकोळ पुरवठा'}</span>
                  </div>
                </div>

              </div>

              {/* Spectacular 3D Saree fabric mesh container (Right) */}
              <div className="lg:col-span-6 relative flex items-center justify-center">
                
                {/* Visual background framing border */}
                <div className="absolute inset-4 rounded-2xl border border-dashed border-[#D4AF37]/15 pointer-events-none" />

                {/* 3D Saree Canvas item */}
                <div className="w-full relative rounded-2xl bg-gradient-to-b from-[#181112] to-[#0d090a] border border-[#D4AF37]/10 shadow-2xl p-4 overflow-hidden">
                  
                  {/* Floating badge over artwork */}
                  <div className="absolute top-6 left-6 z-10 px-3 py-1 rounded bg-black/75 backdrop-blur text-[8px] tracking-widest uppercase text-[#D4AF37] border border-[#D4AF37]/20">
                    {lang === 'en' ? '3D FLUID FABRIC SIMULATOR' : '३D वेविंग सिल्क कापड रचना'}
                  </div>

                  <ThreeSareeCanvas />

                  {/* Instructions badge under artwork */}
                  <div className="absolute bottom-6 inset-x-6 text-center z-10 pointer-events-none">
                    <span className="inline-block px-3 py-1 rounded-full bg-stone-900/90 backdrop-blur text-[9px] tracking-wider text-stone-300 font-mono shadow-md border border-stone-800">
                      {lang === 'en' ? '← Move mouse/drag over fabric to feel luxury folds →' : '← रेशीम कापड हालचाल जाणून घेण्यासाठी माऊस फिरवा →'}
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* Downward indicator node clicker */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
              <button
                onClick={() => scrollTo('story')}
                className="flex flex-col items-center gap-1 cursor-pointer text-stone-500 hover:text-[#D4AF37] transition-colors"
                aria-label="Scroll down to story"
              >
                <span className="text-[9px] uppercase tracking-widest font-mono">
                  {lang === 'en' ? 'DISCOVER MORE' : 'खाली पहा'}
                </span>
                <ChevronDown size={14} className="animate-bounce" />
              </button>
            </div>

          </section>

          {/* 4. ABOUT BRAND SHOWROOM STUDY SECTION */}
          <section id="story" className="py-20 md:py-32 relative bg-gradient-to-b from-[#0d090a] via-[#100b0c] to-[#0d090a]">
            <div className="absolute inset-0 bg-mesh-blur opacity-40 pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
              
              {/* Section Header */}
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="font-mono text-xs tracking-[0.35em] text-[#D4AF37] uppercase font-bold">
                  {lang === 'en' ? 'THE LEGENDARY STORY' : 'उत्कृष्ट वाटचाल'}
                </span>
                <h3 className="text-3xl md:text-4.5xl font-serif text-white tracking-tight leading-tight">
                  {lang === 'en' ? 'Heritage & Trusted Handlooms' : 'परंपरा, विश्वास आणि भव्यता'}
                </h3>
                <div className="h-[2px] w-16 bg-[#8B1E3F] mx-auto" />
                <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
                  {lang === 'en'
                    ? "Deeply integrated in the culture of Maharashtra, Kartike Saree Center was founded to bring forward raw traditional artisan talent alongside comfortable modern daily fashion."
                    : "महाराष्ट्राच्या प्रत्येक सख्यांच्या पेहरावात सौंदर्य आणि सन्मान आणण्याच्या ध्येयाने सुरू झालेले अमळनेर मधील सर्वोत्तम साडी शो-रूम."}
                </p>
              </div>

              {/* Owner card display & story writeup */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto">
                
                {/* Showroom visual portrait representation */}
                <div className="lg:col-span-12 xl:col-span-5 relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#8B1E3F] to-[#D4AF37] rounded-xl opacity-15 blur-lg group-hover:opacity-25 transition-opacity duration-500" />
                  
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-96 border border-[#D4AF37]/15 bg-stone-900 shadow-2xl">
                    <img
                      src="https://placehold.co/600x800/800020/ffffff?text=Amalner+Luxury+Showroom"
                      alt="Owner Rupali Patil Showroom details"
                      className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700 hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                    
                    {/* Hanging label */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block mb-1">
                        {lang === 'en' ? 'OWNERSHIP INITIATIVE' : 'दालन व्यवस्थापिका'}
                      </span>
                      <h4 className="text-lg font-serif text-white font-medium leading-none mb-1">
                        {BUSINESS_INFO.owner[lang]}
                      </h4>
                      <p className="text-xs font-mono text-stone-400">
                        {lang === 'en' ? 'Founder, Kartike Saree Center' : 'संस्थापिका, कार्तिके साडी सेंटर'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Narrative content list */}
                <div className="lg:col-span-12 xl:col-span-7 space-y-6 md:pl-6 leading-relaxed">
                  <div className="space-y-4">
                    <span className="text-xs tracking-wider text-[#D4AF37] uppercase font-mono font-semibold">
                      {lang === 'en' ? 'OUR BUSINESS CORE' : 'व्यवसायाची मुख्य वैशिष्ट्ये'}
                    </span>
                    <h4 className="text-xl md:text-2xl font-serif text-white font-medium">
                      {lang === 'en' ? 'Providing Premium Wholesaler Advantage to Every Saree Patron' : 'थेट घाऊक खरेदीचा सामान्य खरेदीदाराला भरघोस फायदा'}
                    </h4>
                  </div>

                  <p className="text-xs md:text-sm text-stone-300">
                    {lang === 'en'
                      ? "Kartike Saree Center, under the persistent guidance of Rupali Patil, has set a new benchmark in Amalner for authentic sarees and ladies fashion. By eliminating high-street middlemen, we bridge direct handloom weavers with retail customers."
                      : "कार्तिके साडी सेंटरच्या माध्यमातून रूपाली पाटील यांनी अमळनेरमध्ये फॅशनचा नवा आणि उत्कृष्ट आदर्श घालून दिला आहे. थेट कारागिरांकडून किंवा विणकरांकडून मालाची खरेदी केली जात असल्यामुळे, दलालांचे कमिशन वाचते आणि हा थेट फायदा आमच्या प्रत्येक सखी ग्राहकाला मिळतो."}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-stone-900/30 rounded-lg border border-stone-850">
                      <h5 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                        {lang === 'en' ? '1. Trusted Family values' : '१. कौटुंबिक आणि विश्वासाचे नाते'}
                      </h5>
                      <p className="text-[11px] text-[#c1bab4] leading-relaxed">
                        {lang === 'en' ? 'Honesty in rates, transparent material description, and generational relationships.' : 'किमतीत आणि दर्जाबाबत शंभर टक्के पारदर्शकता राखली जाते.'}
                      </p>
                    </div>

                    <div className="p-4 bg-stone-900/30 rounded-lg border border-stone-850">
                      <h5 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                        {lang === 'en' ? '2. Direct Weaver Network' : '२. थेट होलसेल जोडणी'}
                      </h5>
                      <p className="text-[11px] text-[#c1bab4] leading-relaxed">
                        {lang === 'en' ? 'Sourced directly from Yeola, Banaras, Surat, and Surat looms for high-grade stocks.' : 'येवला, बनारस, आणि सुरत येथील उत्कृष्ट विणकर कामगारांकडून थेट खरेदी.'}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Timeline list component */}
              <div id="timeline" className="pt-10">
                <TimelineSection lang={lang} />
              </div>

            </div>
          </section>

          {/* 5. CATEGORIES / COMPREHENSIVE COLLECTION SHOWCASE */}
          <section id="collection" className="py-20 md:py-32 relative">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
              
              {/* Header block with elegant slogan info */}
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="font-mono text-xs tracking-[0.35em] text-[#D4AF37] uppercase font-bold">
                  {lang === 'en' ? 'CURATED HIGHLIGHTS' : 'उत्कृष्ट संग्रह दालन'}
                </span>
                <h3 className="text-3xl md:text-4.5xl font-serif text-white tracking-tight leading-tight">
                  {lang === 'en' ? 'The Premium Collection Hierarchy' : 'वैविध्यपूर्ण वस्त्र संग्रह सुबकता'}
                </h3>
                <div className="h-[2px] w-16 bg-[#8B1E3F] mx-auto" />
                <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
                  {lang === 'en'
                    ? "Indulge in our exquisite assortment tailored for grand weddings, sophisticated parties, daily office comfort, and business retailers."
                    : "लग्नसमारंभ, सण-उत्सव, ऑफिस वापरासाठी आणि होलसेल दुकानदारांसाठी निवडक डिझाइन्सचा देखणा ठेवा."}
                </p>
              </div>

              {/* Grid categories display */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-4">
                {CATEGORIES.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    lang={lang}
                    onEnquiry={handleGlobalEnquiry}
                  />
                ))}
              </div>

            </div>
          </section>

          {/* 6. STATISTICS & TRUST PILOT COUNTERS */}
          <section id="stats" className="py-16 md:py-24 relative bg-[#110d0e]/60 border-y border-stone-900 overflow-hidden">
            <div className="absolute inset-0 bg-mesh-blur opacity-35 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16 relative z-10">
              
              {/* Stat Counters box */}
              <div>
                <StatsSection lang={lang} />
              </div>

              {/* Simple banner trust elements */}
              <div className="max-w-4xl mx-auto bg-stone-950/40 border border-[#D4AF37]/15 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase">
                    {lang === 'en' ? 'WHOLESALE BUSINESSES & RESELLER PROGRAM' : 'घरगुती साडी विक्री उद्योग सुवर्णसंधी'}
                  </span>
                  <h4 className="text-lg font-serif text-white font-medium tracking-tight leading-snug">
                    {lang === 'en' ? 'Want to Start Your Own Boutique or Reselling From Home?' : 'घर बसल्या साडी विक्री व्यवसाय सुरू करू इच्छिता?'}
                  </h4>
                  <p className="text-xs text-stone-300 max-w-xl">
                    {lang === 'en'
                      ? "Get personalized handselected bridal lots and starter collections with dedicated pricing plans suggested directly by owner Rupali Patil."
                      : "रूपाली पाटील यांच्याकडून थेट मार्गदर्शन, विशेष निवडलेल्या साड्यांचा कॅटलॉग आणि वाजवी दरात घरबसल्या व्यवसायाची उत्तम व सुलभ संधी मिळवा."}
                  </p>
                </div>

                <button
                  onClick={() => handleGlobalEnquiry('Wholesale Starter Program')}
                  className="px-6 py-3.5 rounded bg-white text-black font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-2 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <span>{lang === 'en' ? 'Join Reseller Group' : 'रीसेलर चौकशी करा'}</span>
                </button>
              </div>

            </div>
          </section>

          {/* 7. CUSTOMER EXPERIENCE TESTIMONIALS SLIDER SECTION */}
          <section id="testimonials" className="py-20 md:py-32 relative">
            <div className="absolute inset-0 bg-mesh-blur opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
              
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="font-mono text-xs tracking-[0.35em] text-[#D4AF37] uppercase font-bold">
                  {lang === 'en' ? 'PATRON VOICES' : 'ग्राहकांच्या बोलक्या प्रतिक्रिया'}
                </span>
                <h3 className="text-3xl md:text-4.5xl font-serif text-white tracking-tight leading-tight">
                  {lang === 'en' ? 'Stories of Love and Style' : 'आपुलकी आणि विश्वासाची साक्ष'}
                </h3>
                <div className="h-[2px] w-16 bg-[#8B1E3F] mx-auto" />
                <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans">
                  {lang === 'en'
                    ? "See why thousand of happy sisters across Amalner and Chopda trust Kartike Saree Center as their permanent wardrobe curator."
                    : "अमळनेर आणि परिसरातील आमच्या सख्यांनी कार्तिके साडी सेंटरसोबतचे त्यांचे अनुभव मांडले आहेत."}
                </p>
              </div>

              {/* Slider Component */}
              <div>
                <TestimonialSlider lang={lang} />
              </div>

            </div>
          </section>

          {/* 8. GALLERY PICTURES MASONRY */}
          <section id="gallery" className="py-20 md:py-32 bg-stone-950/20 border-t border-stone-900">
            <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
              
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="font-mono text-xs tracking-[0.35em] text-[#D4AF37] uppercase font-bold">
                  {lang === 'en' ? 'EXCLUSIVE VISUAL GALLERY' : 'हौस आणि सौंदर्य संग्रह'}
                </span>
                <h3 className="text-3xl md:text-4.5xl font-serif text-white tracking-tight leading-tight">
                  {lang === 'en' ? 'Exquisite Boutique Vignettes' : 'साडी व ड्रेसेसचे सुंदर नक्षीकाम'}
                </h3>
                <div className="h-[2px] w-16 bg-[#8B1E3F] mx-auto" />
                <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
                  {lang === 'en'
                    ? "Catch beautiful snapshots of our silk looms, bridal matching set-ups, and modern chic dresses. Click any photo to inspect closely."
                    : "आमच्या दालनातील उत्कृष्ट साड्यांचे सुंदर क्लोज-अप आणि डिझाईन्स. बारीक तपशील निरखण्यासाठी कोणत्याही फोटोवर क्लिक करा."}
                </p>
              </div>

              {/* Masonry image grids with lightbox overlay hooks */}
              <div>
                <GallerySection lang={lang} onEnquiry={handleGlobalEnquiry} />
              </div>

            </div>
          </section>

          {/* 9. EXTENDED DESIGNER FAQS */}
          <section id="faq" className="py-20 md:py-28 relative border-t border-stone-900 bg-gradient-to-b from-[#0d090a] to-[#100b0c]">
            <div className="absolute inset-0 bg-mesh-blur opacity-20 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-12">
              
              <div className="text-center space-y-3">
                <span className="font-mono text-xs tracking-[0.35em] text-[#D4AF37] uppercase">
                  {lang === 'en' ? 'COMMON QUESTIONS' : 'सामान्य प्रश्नोत्तरे'}
                </span>
                <h3 className="text-2xl md:text-3.5xl font-serif text-white font-medium tracking-tight">
                  {lang === 'en' ? 'Curator Frequently Asked Questions' : 'ग्राहकांचे नेहमीचे प्रश्न व माहिती'}
                </h3>
                <div className="h-[1.5px] w-12 bg-[#8B1E3F] mx-auto" />
              </div>

              {/* Accordeon Accordion listings built safely in React */}
              <div className="space-y-4 pt-4">
                {FAQS.map((faq, idx) => {
                  const isExp = !!faqsExpanded[idx];
                  return (
                    <div
                      key={idx}
                      className="border border-stone-850 bg-stone-900/10 rounded-xl overflow-hidden hover:border-[#D4AF37]/20 transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 text-xs md:text-sm text-stone-200 hover:text-white font-medium font-sans focus:outline-none focus:bg-stone-900/20"
                      >
                        <span className="flex items-center gap-2">
                          <HelpCircle size={14} className="text-[#D4AF37] shrink-0" />
                          <span>{faq.question[lang]}</span>
                        </span>
                        <motion.div
                          animate={{ rotate: isExp ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-stone-400"
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExp && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-1 text-xs md:text-[13px] text-stone-400 leading-relaxed font-sans border-t border-stone-850/50 bg-[#130E0F]/40">
                              {faq.answer[lang]}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>

          {/* 10. STYLISH DIRECT CONTACT CARDS & INQUIRY FORM */}
          <section id="contact" className="py-20 md:py-32 bg-stone-950/40 relative border-t border-stone-900">
            <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
              
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="font-mono text-xs tracking-[0.35em] text-[#D4AF37] uppercase font-bold">
                  {lang === 'en' ? 'CONTACT CONCIERGE' : 'थेट संवाद केंद्र'}
                </span>
                <h3 className="text-3xl md:text-4.5xl font-serif text-white tracking-tight leading-tight">
                  {lang === 'en' ? 'Inquire With Rupali Patil Directly' : 'रूपाली पाटील यांच्याशी थेट विचारणा संपर्क'}
                </h3>
                <div className="h-[2px] w-16 bg-[#8B1E3F] mx-auto" />
                <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
                  {lang === 'en'
                    ? "Whether you require a custom bridalNauvari drape or seek bulk retailer price charts, our team is standing by to respond."
                    : "अस्सल विवाह नऊवारी साडीची चौकशी असो वा घरबसल्या व्यवसायासाठी घाऊक होलसेल खरेदीची माहिती हवी असल्यास त्वरित संदेश पाठवा."}
                </p>
              </div>

              {/* Main Contact detail row with fields */}
              <div>
                <ContactSection lang={lang} />
              </div>

              {/* Full-width Stylized Premium Google Map iframe */}
              <div className="max-w-7xl mx-auto px-4 pt-6">
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="rounded-2xl overflow-hidden border border-[#D4AF37]/15 bg-stone-950/80 p-2 shadow-2xl relative"
                >
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-black/85 backdrop-blur text-[10px] tracking-widest font-mono text-[#D4AF37] border border-[#D4AF37]/20 uppercase flex items-center gap-1.5 shadow-md">
                    <MapPin size={11} className="text-[#D4AF37]" />
                    <span>Tambepura, Amalner • तांबेपुरा, अमळनेर</span>
                  </div>

                  <iframe
                    title="Kartike Saree Center Showroom Location in Amalner, Maharashtra"
                    src={BUSINESS_INFO.mapsLink}
                    width="100%"
                    height="380"
                    style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.15) brightness(0.9)' }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl w-full"
                  />
                </motion.div>
              </div>

            </div>
          </section>

          {/* 11. LUXURY BRIDAL BRAND FOOTER */}
          <footer className="bg-[#0b0708] border-t border-stone-900 py-16 text-stone-400 text-xs text-center relative overflow-hidden font-sans">
            <div className="absolute inset-x-0 bottom-0 top-[60%] bg-gradient-to-t from-[#8B1E3F]/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 relative z-10">
              {/* WhatsApp Group Banner inside Footer */}
              <div className="p-[1px] bg-gradient-to-r from-[#8B1E3F] via-[#D4AF37] to-[#8B1E3F] rounded-xl shadow-xl">
                <div className="bg-[#0f0a0b]/95 rounded-xl px-6 py-8 flex flex-col xl:flex-row items-center justify-between gap-6 border border-stone-900">
                  <div className="text-center xl:text-left space-y-2">
                    <h5 className="font-serif text-lg md:text-xl text-white font-semibold">
                      {lang === 'en' ? 'Get Direct Live Updates' : 'थेट लाईव्ह अपडेट्स मिळवा'}
                    </h5>
                    <p className="text-stone-400 text-xs md:text-sm">
                      {lang === 'en' ? 'Never miss a new design. Join our family hub on WhatsApp.' : 'नवीन साडी डिझाइन्स कधीही चुकवू नका. आमच्या व्हॉट्सॲप फॅमिली ग्रुपमध्ये सामील व्हा.'}
                    </p>
                  </div>
                  <a
                    href="https://chat.whatsapp.com/FPfcTsbOvLcBTxv3zZl63u"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full xl:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-gradient-to-r from-[#8B1E3F] via-[#A2254C] to-[#D4AF37] hover:from-[#A2254C] hover:to-[#ebd074] text-white hover:text-black font-semibold text-center text-xs tracking-wide transition-all duration-300 border border-[#D4AF37]/35 shadow-xl hover:scale-[1.01] cursor-pointer"
                  >
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]"></span>
                    </span>
                    Join Our WhatsApp Group for Latest Collections | नवीन कलेक्शन पाहण्यासाठी आमच्या व्हॉट्सॲप ग्रुपमध्ये सामील व्हा
                  </a>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-left pb-12 border-b border-stone-850 relative z-10">
              
              {/* Brand Summary */}
              <div className="space-y-4 md:col-span-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#8B1E3F] flex items-center justify-center text-white">
                    <Crown size={14} className="text-[#D4AF37]" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-white tracking-wide">
                    {BUSINESS_INFO.name[lang]}
                  </h4>
                </div>
                <p className="text-stone-400 text-[11px] leading-relaxed">
                  {lang === 'en'
                    ? "Kartike Saree Center: Symbolizing generations of handloom elegance. Sourced directly, priced honestly in Tambepura, Amalner."
                    : "कार्तिके साडी सेंटर: महिलांच्या सौंदर्य आणि सन्मानाचे हक्काचे ठिकाण. थेट विणकरांकडून सर्वोत्तम साडी खरेदी, तांबेपुरा, अमळनेर."}
                </p>
                <div className="text-[10px] text-stone-500 font-mono">
                  {lang === 'en' ? 'Proprietor: Rupali Patil' : 'प्रॉपायटर: रूपाली पाटील'}
                </div>
              </div>

              {/* Quick links */}
              <div className="space-y-3">
                <h5 className="font-mono text-xs tracking-widest text-[#D4AF37] uppercase font-bold">
                  {lang === 'en' ? 'QUICK DIRECTORY' : 'नेव्हिगेशन'}
                </h5>
                <ul className="space-y-2 text-[11px] font-sans">
                  {['home', 'story', 'collection', 'gallery', 'contact', 'faq'].map((id) => {
                    const labelMap: Record<string, string> = {
                      home: lang === 'en' ? 'Introduction Home' : 'मुख्य दालन',
                      story: lang === 'en' ? 'Our Heritage Story' : 'परंपरा कथा',
                      collection: lang === 'en' ? 'Silk Collection' : 'साडी प्रकार',
                      gallery: lang === 'en' ? 'Photo Portfolio' : 'कॅटलॉग फोटो',
                      contact: lang === 'en' ? 'Contact Desk' : 'संपर्क केंद्र',
                      faq: lang === 'en' ? 'Curator FAQs' : 'मदत प्रश्नोत्तरे'
                    };
                    return (
                      <li key={id}>
                        <button
                          onClick={() => scrollTo(id)}
                          className="hover:text-white hover:underline transition-all text-stone-400 cursor-pointer"
                        >
                          {labelMap[id]}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Collections listings */}
              <div className="space-y-3">
                <h5 className="font-mono text-xs tracking-widest text-[#D4AF37] uppercase font-bold">
                  {lang === 'en' ? 'CATEGORIES' : 'साडी विशेष'}
                </h5>
                <ul className="space-y-2 text-[11px] text-stone-400">
                  <li>{lang === 'en' ? 'Yeola Paithani Silk' : 'अस्सल येवला पैठणी'}</li>
                  <li>{lang === 'en' ? 'Banarasi Gold Brocade' : 'बनारसी जरी ब्रोकेड'}</li>
                  <li>{lang === 'en' ? 'Bridal Nauvari Setup' : 'वधू लग्नाची नऊवारी'}</li>
                  <li>{lang === 'en' ? 'Designer Co-ord Sets' : 'डिझायनर को-ऑर्ड सेट्स'}</li>
                  <li>{lang === 'en' ? 'Pure Mulmul Cottons' : 'शुद्ध गोड मलमल कॉटन्स'}</li>
                </ul>
              </div>

              {/* Contacts info details */}
              <div className="space-y-3">
                <h5 className="font-mono text-xs tracking-widest text-[#D4AF37] uppercase font-bold">
                  {lang === 'en' ? 'HQ SHOWROOM' : 'मुख्यालय पत्ता'}
                </h5>
                <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
                  {BUSINESS_INFO.address[lang]}<br />
                  Amalner, Jalgaon Dist. 425401
                </p>
                <div className="space-y-1.5 pt-1 text-[11px]">
                  <p className="text-[#D4AF37]">{BUSINESS_INFO.phone}</p>
                  <p className="truncate text-stone-500">{BUSINESS_INFO.email}</p>
                </div>
              </div>

            </div>

            {/* Copyright & credit nodes */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-stone-500 font-mono">
              <p>
                © 2026 Kartike Saree Center. All Rights Reserved. Complete Women's Fashion & Elegance.
              </p>
              <p className="text-[#D4AF37]/50">
                {lang === 'en' ? 'Premium 3D Experience Crafted under Rupali Patil' : 'रूपाली पाटील मार्गदर्शनाखाली डिझाईन केलेले ३D दालन'}
              </p>
            </div>

          </footer>

          {/* 12. FLOATING QUICK ACTIONS (Back to Top & Sticky WhatsApp) */}
          <AnimatePresence>
            {showFloatingBtn && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
              >
                {/* Float WhatsApp */}
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(lang === 'en' ? 'Hello Rupali Ma\'am, I am interested in exploring the collection.' : 'नमस्कार रूपाली मॅडम, मुझे साडी डिझाईन्स पाहायच्या आहेत.')}`}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="p-3.5 bg-[#25D366] text-black rounded-full shadow-2xl hover:scale-108 active:scale-95 transition-transform flex items-center justify-center border border-white/20"
                  aria-label="Contact Owner Rupali Patil directly on WhatsApp"
                >
                  <MessageSquare size={18} fill="currentColor" />
                </a>

                {/* Back to top */}
                <button
                  onClick={() => scrollTo('home')}
                  className="p-3.5 bg-stone-900 border border-stone-850 hover:border-[#D4AF37]/30 text-[#D4AF37] rounded-full shadow-2xl hover:scale-108 active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
                  aria-label="Back to top"
                >
                  <ArrowUp size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}

    </div>
  );
}
