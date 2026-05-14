/*
 * =========================== MODAL ===========================
 * - General structure for a modal that is overlayed on the screen/window.
 * - This is used to view short information that does not warrant a standalone page.
 * - Such information includes noticeboard info, contributor details, quizzes, etc.
 */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { controlIcons } from "../icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-auxiliary-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-site-foreground rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-site-borderOutline">
              <h3 className="text-xl font-display font-bold text-site-mainText">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="glow-border p-2 bg-site-foreground rounded-full hover:bg-auxiliary-white dark:hover:bg-auxiliary-black transition-colors"
                style={
                  {
                    "--glow-color": "var(--color-auxiliary-red-neutral)",
                  } as React.CSSProperties
                }
              >
                <controlIcons.closeIcon size={20} />
              </button>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
