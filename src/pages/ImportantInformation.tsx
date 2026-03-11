import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INFO_NOTICES, EMERGENCY_CONTACTS } from '../data';
import { AlertCircle, ChevronLeft, ChevronRight, ShieldAlert } from 'lucide-react';
import { clsx } from 'clsx';

/**
 * Important Information Page.
 */
export const ImportantInformation: React.FC = () => {
  const [activeNotice, setActiveNotice] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(EMERGENCY_CONTACTS[0].country);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const nextNotice = () => setActiveNotice((prev) => (prev + 1) % INFO_NOTICES.length);
  const prevNotice = () => setActiveNotice((prev) => (prev - 1 + INFO_NOTICES.length) % INFO_NOTICES.length);

  const countryData = EMERGENCY_CONTACTS.find(c => c.country === selectedCountry);

  const getServiceEmoji = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('police')) return '👮';
    if (lowerName.includes('ambulance') || lowerName.includes('medical')) return '🚑';
    if (lowerName.includes('fire')) return '🔥';
    return '🚨';
  };

  return (
    <div className="pb-24">
      {/* Notices Carousel */}
      <section className="bg-zinc-900 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNotice}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="flex flex-col items-center text-center max-w-3xl mx-auto"
              >
                <div className={clsx(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-8",
                  INFO_NOTICES[activeNotice].type === 'tip' ? "bg-green-500/20 text-green-400" :
                  INFO_NOTICES[activeNotice].type === 'notice' ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
                )}>
                  <AlertCircle size={24} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                  {INFO_NOTICES[activeNotice].title}
                </h2>
                <p className="text-xl text-zinc-400 leading-relaxed">
                  {INFO_NOTICES[activeNotice].content}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-12">
              <button onClick={prevNotice} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextNotice} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="max-w-4xl mx-auto px-4 py-24">
        <div className="p-8 md:p-12 bg-medical-accent/5 border border-medical-accent/20 rounded-3xl">
          <div className="flex items-center gap-4 mb-8 text-medical-accent">
            <ShieldAlert size={32} />
            <h2 className="text-3xl font-display font-bold">Medical Disclaimer</h2>
          </div>
          <div className="prose prose-zinc dark:prose-invert max-w-none text-lg">
            <p>
              The content provided on Medliz, including articles, blog posts, and educational courses, is intended for informational and educational purposes only.
            </p>
            <p className="font-bold">
              It is NOT a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            <p>
              Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
            </p>
            <p>
              The opinions expressed by contributors are their own and do not necessarily reflect the official policy or position of any medical institution.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white mb-4">
            Emergency <span className="text-medical-primary">Contacts</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">Find emergency services in your region.</p>
        </div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl">
          <div className="mb-12">
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-3">Select Country</label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-4 pl-16 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-medical-primary text-left text-lg font-medium flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    {countryData?.flagIcon && (
                      <img 
                        src={countryData.flagIcon} 
                        alt={countryData.country} 
                        className="w-8 h-6 object-cover rounded-sm shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                  <span>{selectedCountry}</span>
                </div>
                <ChevronRight size={20} className={clsx("transition-transform", isDropdownOpen ? "rotate-90" : "rotate-0")} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
                  >
                    {EMERGENCY_CONTACTS.map((c) => (
                      <button
                        key={c.country}
                        onClick={() => {
                          setSelectedCountry(c.country);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full p-4 flex items-center gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left"
                      >
                        <img 
                          src={c.flagIcon} 
                          alt={c.country} 
                          className="w-8 h-6 object-cover rounded-sm shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-medium">{c.country}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid gap-4">
            {countryData?.services.length === 1 ? (
              <div className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-700">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🚨</span>
                  <span className="font-bold text-lg">General Emergency Contact</span>
                </div>
                <span className="text-3xl font-display font-bold text-medical-primary">{countryData.services[0].number}</span>
              </div>
            ) : (
              countryData?.services.map((service, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-700">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{getServiceEmoji(service.name)}</span>
                    <span className="font-bold text-lg">{service.name}</span>
                  </div>
                  <span className="text-3xl font-display font-bold text-medical-primary">{service.number}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
