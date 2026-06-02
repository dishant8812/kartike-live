/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Map } from 'lucide-react';
import { BUSINESS_INFO } from '../data';
import { Language } from '../types';

export default function ContactSection({ lang }: { lang: Language }) {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('Traditional Saree');
  const [message, setMessage] = useState('');

  // Submit form and redirect to WhatsApp prefilled text
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Elegant message construction
    const greeting = lang === 'en' 
      ? `Hello Rupali Ma'am (Kartike Saree Center), my name is ${name || 'Customer'}.`
      : `नमस्कार रूपाली मॅडम (कार्तिके साडी सेंटर), मी ${name || 'ग्राहिका'} बोलत आहे.`;

    const topicDetail = lang === 'en'
      ? `I am enquiring about: *${topic}*.`
      : `मला *${topic}* बद्दल चौकशी करायची आहे.`;

    const extraMsg = message 
      ? `\n"${message}"`
      : '';

    const webLinkPrompt = `\n(Sent via Kartike 3D Showroom)`;

    const fullMessage = encodeURIComponent(`${greeting}\n${topicDetail}${extraMsg}${webLinkPrompt}`);
    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${fullMessage}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div id="contact-inner-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 max-w-7xl mx-auto px-4">
      
      {/* 1. Quick Info Panels (Left) */}
      <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-5 rounded-xl bg-stone-900/40 border border-[#D4AF37]/10 flex items-start gap-4 hover:border-[#D4AF37]/25 transition-all duration-300"
          >
            <div className="p-3 rounded-lg bg-[#8B1E3F]/30 text-[#D4AF37] border border-[#D4AF37]/15 shrink-0">
              <Phone size={18} />
            </div>
            <div>
              <h5 className="text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-1">
                {lang === 'en' ? 'CALL SHOWROOM' : 'थेट संपर्क करा'}
              </h5>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="text-base font-sans font-medium text-white hover:text-[#D4AF37] transition-colors"
              >
                {BUSINESS_INFO.phone}
              </a>
              <p className="text-[11px] text-[#D4AF37] mt-1 font-sans">
                {lang === 'en' ? 'Direct support with Rupali Patil' : 'रूपाली पाटील यांच्याशी थेट संवाद'}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="p-5 rounded-xl bg-stone-900/40 border border-[#D4AF37]/10 flex items-start gap-4 hover:border-[#D4AF37]/25 transition-all duration-300"
          >
            <div className="p-3 rounded-lg bg-[#8B1E3F]/30 text-[#D4AF37] border border-[#D4AF37]/15 shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <h5 className="text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-1">
                {lang === 'en' ? 'EMAIL ASSISTANCE' : 'ईमेल चौकशी'}
              </h5>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="text-base font-sans font-medium text-white hover:text-[#D4AF37] transition-colors"
              >
                {BUSINESS_INFO.email}
              </a>
              <p className="text-[11px] text-stone-400 mt-0.5">
                {lang === 'en' ? 'Responses within 24 hours' : '२४ तासात त्वरित प्रतिसाद मिळाला'}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-5 rounded-xl bg-stone-900/40 border border-[#D4AF37]/10 flex items-start gap-4 hover:border-[#D4AF37]/25 transition-all duration-300"
          >
            <div className="p-3 rounded-lg bg-[#8B1E3F]/30 text-[#D4AF37] border border-[#D4AF37]/15 shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <h5 className="text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-1">
                {lang === 'en' ? 'VISIT BOUTIQUE' : 'शोरूम पत्ता'}
              </h5>
              <p className="text-sm font-sans font-medium text-stone-200 leading-snug">
                {BUSINESS_INFO.address[lang]}
              </p>
              <p className="text-[11px] text-[#D4AF37] mt-1">
                Tambepura, Amalner (तांबेपुरा, अमळनेर)
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="p-5 rounded-xl bg-stone-900/40 border border-[#D4AF37]/10 flex items-start gap-4 hover:border-[#D4AF37]/25 transition-all duration-300"
          >
            <div className="p-3 rounded-lg bg-[#8B1E3F]/30 text-[#D4AF37] border border-[#D4AF37]/15 shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <h5 className="text-[10px] font-mono tracking-widest text-stone-400 uppercase mb-1">
                {lang === 'en' ? 'SHOWROOM HOURS' : 'उघडण्याची वेळ'}
              </h5>
              <p className="text-sm font-sans font-medium text-stone-200">
                10:00 AM - 09:00 PM
              </p>
              <p className="text-[11px] text-stone-400 mt-0.5">
                {lang === 'en' ? 'Open daily, including Sundays' : 'दररोज सुरू (रविवारसह)'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Call to action floating link direct */}
        <div className="pt-4 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer"
            className="px-5 py-3 rounded-lg bg-[#25D366] text-black font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-2 hover:bg-[#20ba59] transition-all"
          >
            <MessageSquare size={14} fill="currentColor" />
            <span>WhatsApp Direct</span>
          </a>
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="px-5 py-3 rounded-lg bg-[#111] text-white border border-stone-800 font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-2 hover:bg-stone-900 transition-all"
          >
            <Phone size={14} />
            {lang === 'en' ? 'Call Now' : 'कॉल करा'}
          </a>
        </div>
      </div>

      {/* 2. Stylized Inquiry Form (Right) */}
      <div className="lg:col-span-7">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#171213]/90 border border-[#D4AF37]/15 rounded-xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <MessageSquare size={120} />
          </div>

          <h4 className="text-xl font-sans text-white font-medium mb-1 tracking-tight">
            {lang === 'en' ? 'Luxury Inquiry Concierge' : 'सखी विचारणा सेवा'}
          </h4>
          <p className="text-xs text-stone-400 mb-6 leading-relaxed">
            {lang === 'en'
              ? 'Fill in the fields to instantly formulate a premium WhatsApp text addressed to Rupali Patil.'
              : 'खालील रकाने भरा जेणेकरून रूपाली पाटील यांच्यासाठी व्हाट्सॲप संदेश त्वरित तयार होईल.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
            {/* Name */}
            <div>
              <label htmlFor="inquiry-name" className="block text-xs font-mono tracking-widest text-[#D4AF37] uppercase mb-1.5 font-semibold">
                {lang === 'en' ? 'YOUR NAME' : 'तुमचे नाव'}
              </label>
              <input
                id="inquiry-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === 'en' ? "e.g., Priyanka Deshmukh" : "उदा. प्रियंका देशमुख"}
                className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-lg text-white font-sans focus:border-[#D4AF37]/65 transition-colors focus:outline-none"
              />
            </div>

            {/* Fabric Selector */}
            <div>
              <label htmlFor="inquiry-topic" className="block text-xs font-mono tracking-widest text-[#D4AF37] uppercase mb-1.5 font-semibold">
                {lang === 'en' ? 'COLLECTION OF INTEREST' : 'निवडा साडी प्रकार'}
              </label>
              <select
                id="inquiry-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-lg text-white font-sans focus:border-[#D4AF37]/65 transition-colors focus:outline-none appearance-none"
              >
                <option value="Yeola Paithani {येवला पैठणी}">{lang === 'en' ? 'Traditional Yeola Paithani Saree' : 'पारंपारिक येवला पैठणी'}</option>
                <option value="Banarasi Silk {बनारसी सिल्क}">{lang === 'en' ? 'Royal Banarasi Silk' : 'शाही बनारसी सिल्क'}</option>
                <option value="Wedding Dress / Gown {वधू शृंगार}">{lang === 'en' ? 'Bridal & Gown Collection' : 'लग्नाची साडी व गाऊन्स'}</option>
                <option value="Designer Co-ord Sets {को-ऑर्ड सेट्स}">{lang === 'en' ? 'Designer Dresses & Co-ord Sets' : 'डिझायनर ड्रेसेस आणि को-ऑर्ड'}</option>
                <option value="Cotton / Mulmul Saree {कॉटन साड्या}">{lang === 'en' ? 'Daily Cotton & Mulmul Wear' : 'रोजच्या वापरातील मलमल कॉटन'}</option>
                <option value="Wholesale Bulk Lot {घाऊक होलसेल खरेदी}">{lang === 'en' ? 'Wholesale Bulk Orders (Min. Price Plan)' : 'घाऊक होलसेल बल्क पॅक (किमती सवलत)'}</option>
              </select>
            </div>

            {/* Custom Message */}
            <div>
              <label htmlFor="inquiry-msg" className="block text-xs font-mono tracking-widest text-[#D4AF37] uppercase mb-1.5 font-semibold">
                {lang === 'en' ? 'PARTICULAR REQUEST' : 'अधिक माहिती किंवा निरोप'}
              </label>
              <textarea
                id="inquiry-msg"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={lang === 'en' ? "Please let me know if home courier is available or list some price brackets..." : "होम डिलिव्हरी किंवा इतर डिझाईन फोटो असल्यास माहिती हवी आहे..."}
                className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-lg text-white font-sans focus:border-[#D4AF37]/65 transition-colors focus:outline-none resize-none"
              />
            </div>

            {/* Launch WhatsApp */}
            <button
              id="submit-inquiry-button"
              type="submit"
              className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#8B1E3F] via-[#D4AF37] to-[#8B1E3F] bg-[length:200%_auto] text-black font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:bg-right shadow-lg shadow-[#8B1E3F]/10 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Send size={13} className="text-black transform group-hover:translate-x-1 transition-transform" />
              <span>{lang === 'en' ? 'SECURE CONCIERGE CHAT INITIATE' : 'व्हाट्सअप चौकशी पाठवा'}</span>
            </button>
          </form>
        </motion.div>
      </div>

    </div>
  );
}
