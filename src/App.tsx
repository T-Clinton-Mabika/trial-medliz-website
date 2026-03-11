import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useDarkMode, DarkModeProvider } from './hooks';
import { Home } from './pages/Home';
import { MedBlog } from './pages/MedBlog';
import { ArticleDetail } from './pages/ArticleDetail';
import { MedCourses } from './pages/MedCourses';
import { CourseDetail } from './pages/CourseDetail';
import { ImportantInformation } from './pages/ImportantInformation';
import { AboutContact } from './pages/AboutContact';
import { Heart } from 'lucide-react';

/**
 * Main content wrapper that includes the Header, Footer, and Route definitions.
 * This component is separated from App to allow access to Router hooks if needed.
 */
const AppContent = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<MedBlog />} />
          <Route path="/blog/:id" element={<ArticleDetail />} />
          <Route path="/education" element={<MedCourses />} />
          <Route path="/education/:id" element={<CourseDetail />} />
          <Route path="/info" element={<ImportantInformation />} />
          <Route path="/about" element={<AboutContact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

/**
 * Root Application Component.
 * Wraps the entire app in DarkModeProvider and HashRouter.
 * HashRouter is used for better compatibility with static hosting environments.
 */
export default function App() {
  return (
    <DarkModeProvider>
      <Router basename="/trial-medliz-website">
        <AppContent />
      </Router>
    </DarkModeProvider>
  );
}
