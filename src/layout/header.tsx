/*
 * =========================== HEADER COMPONENT ===========================
 * - Logic container for the header of the application, which includes the navigation bar and any related functionality.
 * - Manages the state and behavior of the header, such as handling user interactions, toggling themes, and controlling the visibility of the search overlay.
 * - Integrates with other components like SearchOverlay to provide a cohesive user experience.
 */

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { controlIcons } from "../icons";
import { SearchOverlay } from "../overlays/searchOverlay";
import { useDarkMode } from "../utilities/darkMode";

interface NavLink {
  name: string;
  urlPath: string;
  pageActiveColor: string;
}

const navLinks: NavLink[] = [
  { name: "Home", urlPath: "/", pageActiveColor: "text-site-general" },
  {
    name: "Med-Courses",
    urlPath: "/med-courses",
    pageActiveColor: "text-site-courses",
  },
  {
    name: "Med-Blog",
    urlPath: "/med-blog",
    pageActiveColor: "text-site-blog",
  },
  {
    name: "About Us",
    urlPath: "/about",
    pageActiveColor: "text-site-general",
  },
  {
    name: "Contact Us",
    urlPath: "/contact",
    pageActiveColor: "text-site-general",
  },
];

export const Header: React.FC = () => {
  const { isDark, toggle } = useDarkMode();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle scroll effect of the header.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // set the navigation link color based on whether the link is active (i.e., matches the current URL path) or not. If the link is active, it returns the specific active color defined for that link; otherwise, it returns a default muted text color with a hover effect to indicate interactivity.
  const getLinkColor = (navOption: NavLink) => {
    const isActive = location.pathname === navOption.urlPath;
    if (isActive) return navOption.pageActiveColor;
    return "text-site-mutedElementColor hover:text-site-baseElementColor transition-colors";
  };

  // set the glow color for nav options when hovering over them.
  const navOptionHoverStyle = (urlPath: string) => {
    if (urlPath === "/med-courses") return "var(--color-site-courses)";
    if (urlPath === "/med-blog") return "var(--color-site-blog)";
    return "var(--color-site-general)";
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300">
        <motion.div
          layout
          initial={false}
          animate={{
            width: isScrolled ? "95%" : "100%",
            maxWidth: isScrolled ? "1200px" : "100%",
            borderRadius: isScrolled ? "100px" : "0px",
            marginTop: isScrolled ? "1rem" : "0px",
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
            layout: { duration: 0.3 },
          }}
          className={`glass-header pointer-events-auto h-20 shadow-lg relative overflow-visible ${isScrolled ? "scrolled border border-site-borderOutline px-4 md:px-8" : ""}`}
        >
          <div className="h-full max-w-1440px mx-auto px-4 sm:px-6 lg:px-4">
            <div className="flex justify-between items-center h-full">
              {/* Logo */}
              <Link to="/" className="flex items-center group h-12">
                <img
                  src={
                    isDark
                      ? "/assets/vectors/dark-mode-logo-medliz.svg"
                      : "/assets/vectors/light-mode-logo-medliz.svg"
                  }
                  alt="Medliz Logo"
                  className="h-full w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </Link>

              {/* Navigation Links (Desktop/Larger Screens) */}
              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((navOption) => {
                  const isActive = location.pathname === navOption.urlPath;
                  const hoverColor = navOptionHoverStyle(navOption.urlPath);
                  return (
                    <Link
                      key={navOption.urlPath}
                      to={navOption.urlPath}
                      className={`text-sm font-medium transition-colors relative group flex items-center gap-1.5 ${isActive ? "cursor-default" : "hover:text-site-baseElementColor"} ${getLinkColor(navOption)}`}
                      onClick={(e) => {
                        if (isActive) {
                          e.preventDefault(); // Prevent navigation if already on the active page
                        }
                      }}
                    >
                      <span className="flex items-center justify-center w-4 h-4">
                        {isActive && (
                          <span className="text-current text-10px">◉</span>
                        )}
                      </span>
                      <span className="relative py-1">
                        {navOption.name}
                        <span
                          className="absolute bottom-0 inset-x-0 h-2px rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                          style={{
                            backgroundColor: hoverColor,
                            boxShadow: `0 0 10px ${hoverColor}, 0 0 4px ${hoverColor}`,
                          }}
                        />
                      </span>
                    </Link>
                  );
                })}
              </nav>

              {/* Controls: Search, Theme Toggle & Mobile Menu */}
              <div className="flex items-center gap-4">
                {/* Search Button */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-full hover:bg-site-foreground transition-colors glow-border"
                  style={
                    {
                      "--glow-color": "var(--color-site-general)",
                    } as React.CSSProperties
                  }
                  aria-label="Open Search"
                >
                  <controlIcons.search size={20} />
                </button>

                {/* Theme Toggle Button */}
                <button
                  onClick={toggle}
                  className="group relative h-10 rounded-full transition-all duration-500 glow-border flex items-center border border-site-borderOutline overflow-hidden"
                  style={
                    {
                      "--glow-color": "var(--color-site-general)",
                      background: "var(--gradient-site-background-general)",
                    } as React.CSSProperties
                  }
                  aria-label="Dark/Light Theme Toggle"
                >
                  {/* Smaller Screen/Mobile version - shows icons only */}
                  <div className="md:hidden flex items-center justify-center w-10 h-10 text-site-mutedElementColor group-hover:text-site-baseElementColor transition-colors">
                    {isDark ? (
                      <controlIcons.lightMode size={18} />
                    ) : (
                      <controlIcons.darkMode size={18} />
                    )}
                  </div>

                  {/* Larger Screen version - shows text + icons */}
                  <div className="hidden md:flex items-center w-140px h-full px-1 relative">
                    <span
                      className={`absolute transition-all duration-500 text-[10px] font-bold uppercase tracking-widget text-site-mutedElementColor group-hover:text-site-baseElementColor ${isDark ? "left-4" : "right-4"}`}
                    >
                      {isDark ? "Dark Mode" : "Light Mode"}
                    </span>

                    <motion.div
                      className="size-8 rounded-full flex items-center justify-center shadow-md relative z-10 text-site-inverseMutedElementColor group-hover:text-site-inverseBaseElementColor"
                      style={{
                        background: "var(--color-site-inverseForeground)",
                      }}
                      animate={{ x: isDark ? 98 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                      }}
                    >
                      {isDark ? (
                        <controlIcons.darkMode size={18} />
                      ) : (
                        <controlIcons.lightMode size={18} />
                      )}
                    </motion.div>
                  </div>
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-full"
                  aria-label="Toggle Mobile Menu"
                >
                  {isMobileMenuOpen ? (
                    <controlIcons.openMenu size={24} />
                  ) : (
                    <controlIcons.closedMenu size={24} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-site-foreground border-b border-site-inverseBorderOutline overflow-hidden"
              >
                <div className="px-4 py-6 space-y-4">
                  {navLinks.map((navOption) => {
                    const isActive = location.pathname === navOption.urlPath;
                    return (
                      <Link
                        key={navOption.urlPath}
                        to={navOption.urlPath}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 text-lg font-medium ${getLinkColor(navOption)}`}
                      >
                        <span className="flex items-center justify-center w-6 h-6">
                          {isActive && (
                            <span className="text-current text-xl">◉</span>
                          )}
                        </span>
                        <span className="relative py-1">
                          {navOption.name}
                          <span className="absolute bottom-0 inset-0 h-2.5px rounded-full" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
