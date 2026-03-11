import React, { useState } from 'react';
import { CONTRIBUTORS } from '../data';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, ArrowRight, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Modal } from '../components/Modal';
import { FeedbackForm } from '../components/FeedbackForm';

/**
 * About & Contact Page.
 * Features:
 * - Mission statement and company values.
 * - Interactive contributor profiles with detailed bios.
 * - Integrated contact form for general inquiries.
 */
export const AboutContact: React.FC = () => {
  const [selectedContributor, setSelectedContributor] = useState<any>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 py-20 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-zinc-900 dark:text-white mb-6">
              About <span className="text-medical-primary">Medliz</span>
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              We are a team of dedicated medical professionals committed to providing accessible, high-quality medical education and insights to the global healthcare community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Business Info & Contact */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-display font-bold mb-8">Our Mission</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
              Medliz was founded on the belief that medical knowledge should be shared freely and accurately. Our platform bridges the gap between complex clinical research and practical application, empowering healthcare providers and students alike.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-medical-primary/10 rounded-xl flex items-center justify-center text-medical-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-sm text-zinc-500">Email Us</div>
                  <div className="font-bold">contact@medliz.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-medical-primary/10 rounded-xl flex items-center justify-center text-medical-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-sm text-zinc-500">Call Us</div>
                  <div className="font-bold">+1 (555) 012-3456</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-medical-primary/10 rounded-xl flex items-center justify-center text-medical-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-sm text-zinc-500">Visit Us</div>
                  <div className="font-bold">123 Medical Plaza, Health City</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsContactOpen(true)}
              className="mt-12 px-8 py-4 bg-medical-primary hover:bg-medical-secondary text-white font-display font-bold rounded-xl transition-all flex items-center gap-2"
            >
              Get in Touch <ArrowRight size={20} />
            </button>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-medical-primary/20 blur-3xl rounded-full -mr-32 -mt-32" />
            <h2 className="text-3xl font-display font-bold mb-8 relative z-10">Our Values</h2>
            <ul className="space-y-6 relative z-10">
              {[
                { title: 'Integrity', desc: 'Unwavering commitment to medical accuracy and ethical standards.' },
                { title: 'Accessibility', desc: 'Making complex medical education available to everyone, everywhere.' },
                { title: 'Innovation', desc: 'Leveraging digital tools to enhance the learning experience.' },
                { title: 'Community', desc: 'Fostering a collaborative environment for medical professionals.' },
              ].map((value, idx) => (
                <li key={idx}>
                  <h3 className="font-bold text-medical-primary mb-1">{value.title}</h3>
                  <p className="text-zinc-400">{value.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contributors */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white mb-4">
            Meet Our <span className="text-medical-primary">Contributors</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">The experts behind our insights and courses.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CONTRIBUTORS.map(contributor => (
            <motion.div
              key={contributor.id}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedContributor(contributor)}
              className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm cursor-pointer group flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <img src={contributor.image} alt={contributor.name} className="w-32 h-32 rounded-full object-cover border-4 border-medical-primary/10 group-hover:border-medical-primary/30 transition-colors" />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 bg-white dark:bg-zinc-800 px-3 py-1 rounded-full shadow-sm border border-zinc-100 dark:border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  {contributor.socials?.linkedin && <Linkedin size={14} className="text-zinc-400 hover:text-medical-primary" />}
                  {contributor.socials?.twitter && <Twitter size={14} className="text-zinc-400 hover:text-medical-primary" />}
                  {contributor.socials?.instagram && <Instagram size={14} className="text-zinc-400 hover:text-medical-primary" />}
                </div>
              </div>
              <h3 className="text-xl font-display font-bold mb-1 group-hover:text-medical-primary transition-colors">{contributor.name}</h3>
              <div className="text-medical-primary text-sm font-bold mb-4 uppercase tracking-wider">{contributor.role}</div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-3">{contributor.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contributor Modal */}
      <Modal
        isOpen={!!selectedContributor}
        onClose={() => setSelectedContributor(null)}
        title="Contributor Profile"
      >
        {selectedContributor && (
          <div className="space-y-6">
            <div className="flex flex-col items-center text-center gap-6">
              <img src={selectedContributor.image} alt={selectedContributor.name} className="w-40 h-40 rounded-full object-cover border-4 border-medical-primary/10" />
              <div>
                <h3 className="text-3xl font-display font-bold mb-2">{selectedContributor.name}</h3>
                <div className="text-medical-primary font-bold mb-4">{selectedContributor.role}</div>
                <div className="flex justify-center gap-4">
                  {selectedContributor.socials?.linkedin && (
                    <a href={selectedContributor.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-medical-primary transition-colors">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {selectedContributor.socials?.twitter && (
                    <a href={selectedContributor.socials.twitter} target="_blank" rel="noreferrer" className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-medical-primary transition-colors">
                      <Twitter size={20} />
                    </a>
                  )}
                  {selectedContributor.socials?.instagram && (
                    <a href={selectedContributor.socials.instagram} target="_blank" rel="noreferrer" className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-medical-primary transition-colors">
                      <Instagram size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">{selectedContributor.fullBio}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Contact Form Modal */}
      <FeedbackForm
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        subjectName="General Inquiry"
        type="Contact"
      />
    </div>
  );
};
