/*
 * =========================== SEARCH OVERLAY ===========================
 * - Scroll to top function to reset page position to top of page as user navigates from page to page
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { controlIcons } from "../icons";
import { Articles, Courses } from "../entities/data";
import { useDarkMode } from "../utilities/darkMode";

interface SearchResult {
  title: string;
  link: string;
  type: string;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDark } = useDarkMode();

  // Clear search when overlay closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  //application of filter feature. cs means course, ae means article, lb means labels (i.e. tags).
  const filterResults: SearchResult[] =
    searchQuery.length > 2
      ? [
          // Search/Filter option for articles.
          ...Articles.filter((ae) => {
            return (
              ae.articleInformation.contentTitle
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              ae.articleInformation.contentMetadata.contentLabels.some((lb) =>
                lb.toLowerCase().includes(searchQuery.toLowerCase()),
              )
            );
          }).map((ae) => ({
            title: ae.articleInformation.contentTitle,
            link: `/med-blog/${ae.articleInformation.contentSlug}`,
            type: "article",
          })),

          // Search/Filter option for courses.
          ...Courses.filter((cs) => {
            return (
              cs.courseInformation.contentTitle
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              cs.courseInformation.contentMetadata.contentLabels.some((lb) =>
                lb.toLowerCase().includes(searchQuery.toLowerCase()),
              )
            );
          }).map((cs) => ({
            title: cs.courseInformation.contentTitle,
            link: `/med-courses/${cs.courseInformation.contentSlug}`,
            type: "course",
          })),
        ]
      : [];

  const handleResultClick = () => {
    onClose();
  };

  //setting colour variables for type section to be dependent on type and theme/mode.
  const typeColourScheme = (type: string) => {
    switch (type) {
      case "article":
        return {
          typeText: isDark
            ? "bg-site-auxiliary-purple-shade"
            : "bg-site-auxiliary-purple-tint",
          typeBackground: "text-site-blog",
          typeBorder: isDark
            ? "border-site-auxiliary-purple-tint"
            : "border-site-auxiliary-purple-shade",
        };
      case "course":
        return {
          typeText: isDark
            ? "bg-site-auxiliary-green-shade"
            : "bg-site-auxiliary-green-tint",
          typeBackground: "text-site-courses",
          typeBorder: isDark
            ? "border-site-auxiliary-green-tint"
            : "border-site-auxiliary-green-shade",
        };
      default:
        return {
          typeText: isDark
            ? "bg-site-auxiliary-blue-shade"
            : "bg-site-auxiliary-blue-tint",
          typeBackground: "text-site-general",
          typeBorder: isDark
            ? "border-site-auxiliary-blue-tint"
            : "border-site-auxiliary-blue-shade",
        };
    }
  };

  //display layout for the search overlay.
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-site-auxiliary-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-site-foreground rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-site-borderOutline flex items-center gap-4">
              <input
                autoFocus
                className="flex-1 bg-transparent border-none outline-none text-lg"
                type="text"
                placeholder="Search articles and courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-site-auxiliary-white dark:hover:bg-site-auxiliary-black transition-colors glow-border"
                style={
                  {
                    "--glow-color": "var(--color-auxiliary-red-neutral)",
                  } as React.CSSProperties
                }
              >
                <controlIcons.closeIcon
                  size={20}
                  className="text-site-mutedText"
                />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {filterResults.length > 0 ? (
                <div className="space-y-2">
                  {filterResults.map((result, index) => {
                    const typeStyles = typeColourScheme(result.type);
                    return (
                      <Link
                        key={index}
                        to={result.link}
                        onClick={handleResultClick}
                        className="block p-3 rounded-xl hover:bg-site-hoverElement"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-site-mainText">
                            {result.title}
                          </span>
                          <span
                            className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${typeStyles.typeBackground} ${typeStyles.typeText} ${typeStyles.typeBorder}`}
                          >
                            {result.type}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : searchQuery.length > 2 ? (
                <p className="text-center text-auxiliary-grey-two dark:text-auxiliary-grey-one py-8">
                  No results found for "{searchQuery}"
                </p>
              ) : (
                <p className="text-center text-auxiliary-grey-two dark:text-auxiliary-grey-one py-8">
                  Type at least 3 characters to search...
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
