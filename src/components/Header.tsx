import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Moon, Sun, Menu, X, Heart } from 'lucide-react';
import { useDarkMode } from '../hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_POSTS, MOCK_COURSES, CONTRIBUTORS } from '../data';

/**
 * Navigation Header Component.
 * Features:
 * - Responsive navigation links with active state highlighting.
 * - Global search functionality across articles, courses, and contributors.
 * - Dark mode toggle.
 * - Mobile-friendly hamburger menu.
 */
export const Header: React.FC = () => {
  const { 
    isDark, 
    toggle
  } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', color: 'text-default-primary', hover: 'hover:text-default-hover' },
    { name: 'Important Information', path: '/info', color: 'text-default-primary', hover: 'hover:text-default-hover' },
    { name: 'Med-Courses', path: '/education', color: 'text-courses-primary', hover: 'hover:text-courses-hover' },
    { name: 'Med-Blog', path: '/blog', color: 'text-blog-primary', hover: 'hover:text-blog-hover' },
    { name: 'About & Contact', path: '/about', color: 'text-default-primary', hover: 'hover:text-default-hover' },
  ];

  const filteredResults = searchQuery.length > 2 ? [
    ...MOCK_POSTS.filter(p => {
      const postContributors = CONTRIBUTORS.filter(c => p.metadata.contributorId.includes(c.id));
      return p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             p.metadata.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
             postContributors.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }).map(p => ({ ...p, type: 'Article', link: `/blog/${p.id}` })),
    ...MOCK_COURSES.filter(c => {
      const courseContributors = CONTRIBUTORS.filter(cont => c.metadata.contributorId.includes(cont.id));
      return c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             c.metadata.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
             courseContributors.some(cont => cont.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }).map(c => ({ ...c, type: 'Course', link: `/education/${c.id}` })),
    ...CONTRIBUTORS.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(c => ({ ...c, type: 'Contributor', link: '/about' }))
  ] : [];

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const getLinkColor = (link: any) => {
    const isActive = location.pathname === link.path;
    if (isActive) return link.color;
    return 'text-zinc-600 dark:text-zinc-400';
  };

  return (
    <header className="glass-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group h-12">
            <img 
              src={isDark ? "assets/svg/dark mode - landscape - medliz - name version.svg" : "assets/svg/light mode - landscape - medliz - name version.svg"} 
              alt="Medliz Logo" 
              className="h-full w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${link.hover} ${getLinkColor(link)}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Search size={20} />
            </button>
            <button
              onClick={toggle}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block text-lg font-medium transition-colors ${getLinkColor(link)}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
                <Search className="text-zinc-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search articles, courses, contributors..."
                  className="flex-1 bg-transparent border-none outline-none text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => setIsSearchOpen(false)}>
                  <X size={20} className="text-zinc-400" />
                </button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto p-4">
                {filteredResults.length > 0 ? (
                  <div className="space-y-2">
                    {filteredResults.map((result: any, idx) => (
                      <Link
                        key={idx}
                        to={result.link}
                        className="block p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-zinc-900 dark:text-white">{result.title || result.name}</span>
                          <span className="text-xs font-bold uppercase tracking-wider text-medical-primary px-2 py-1 bg-medical-primary/10 rounded-full">
                            {result.type}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : searchQuery.length > 2 ? (
                  <p className="text-center text-zinc-500 py-8">No results found for "{searchQuery}"</p>
                ) : (
                  <p className="text-center text-zinc-500 py-8">Type at least 3 characters to search...</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
