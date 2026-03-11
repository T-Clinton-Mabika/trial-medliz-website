import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../hooks';

/**
 * Global Footer Component.
 * Features a dynamic background image that changes based on the current page.
 * Uses an overlay to maintain text readability over the background image.
 */
export const Footer: React.FC = () => {
  const { isDark } = useDarkMode();
  const location = useLocation();
  
  const getBackgroundImage = () => {
    const path = location.pathname;
    if (path.startsWith('/blog')) {
      return '/assets/images/Footer Background - Blog.png';
    }
    if (path.startsWith('/education')) {
      return '/assets/images/Footer Background - Education.png';
    }
    return '/assets/images/Footer Background - Home.png';
  };

  return (
    <footer 
      className="relative bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-16 overflow-hidden"
      style={{
        backgroundImage: `url("${getBackgroundImage()}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay to ensure readability */}
      <div className="absolute inset-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-[2px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <Link to="/" className="flex items-center group mb-6 h-24">
              <img 
                src={isDark ? "/assets/svg/dark mode - vertical - medliz - name version.svg" : "/assets/svg/light mode - vertical - medliz - name version.svg"} 
                alt="Medliz Logo" 
                className="h-full w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">
              Empowering medical professionals through expert-led education and research-driven insights.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link to="/" className="hover:text-medical-primary transition-colors">Home</Link></li>
              <li><Link to="/blog" className="hover:text-blog-primary transition-colors">Med-Blog</Link></li>
              <li><Link to="/education" className="hover:text-medical-primary transition-colors">Education</Link></li>
              <li><Link to="/info" className="hover:text-medical-primary transition-colors">Important Info</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li>contact@medliz.com</li>
              <li>+1 (555) 012-3456</li>
              <li>123 Medical Plaza, Health City</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400">
          <p>© 2026 Medliz Portal. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-medical-primary">Privacy Policy</a>
            <a href="#" className="hover:text-medical-primary">Terms of Service</a>
            <a href="#" className="hover:text-medical-primary">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
