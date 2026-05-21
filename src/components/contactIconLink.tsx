/*
 * =========================== CONTACT ICON LINK ===========================
 * - Rendering an icon for social media or contact information.
 * - Used to represent the contact details of long-term benefactor or contributor.
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactIconLinkProps {
  icon: React.ElementType;
  url: string;
  platform: string;
  handle: string;
}

export const ContactIconLink: React.FC<ContactIconLinkProps> = ({
  icon: Icon,
  url,
  platform,
  handle,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  <div className="relative flex items-center justify-center">
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: -35, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          className="absolute z-50 px-3 py-1.5 bg-auxiliary-white dark:bg-auxiliary-black text-site-baseElementColor text-[10px] font-bold rounded-lg whitespace-nowrap pointer-events-none shadow-2xl border border-site-borderOutline/40 flex items-center gap-2"
        >
          {platform}: {handle}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-auxiliary-white dark:bg-auxiliary-black rotate-45 border-r border-b border-site-borderOutline/40" />
        </motion.div>
      )}
    </AnimatePresence>
    <a
      href={url}
      target="_blank"
      rel="nonreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glow-border bg-site-foreground border border-site-borderOutline text-site-mutedElementColor hover:text-site-patrons transition-all p-3 rounded-xl hover:bg-auxiliary-white dark:hover:bg-auxiliary-black/80 flex items-center justify-center"
    >
      <Icon size={16} />
    </a>
  </div>;
};
