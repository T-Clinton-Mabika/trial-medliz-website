import React, { useState } from 'react';
import { MOCK_COURSES } from '../data';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { CourseCard } from '../components/Cards';

/**
 * Med-Courses Page.
 * Features:
 * - Dynamic filtering by tags and time periods.
 * - Sorting by date (newest/oldest).
 * - Grid of educational course cards.
 */
export const MedCourses: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortByDate, setSortByDate] = useState<'newest' | 'oldest' | null>(null);
  const [dateFilter, setDateFilter] = useState<'all' | 'last30' | 'last180' | 'thisYear'>('all');
  const allTags = Array.from(new Set(MOCK_COURSES.flatMap(c => c.metadata.tags)));

  const now = new Date('2026-03-07');

  let filteredCourses = MOCK_COURSES.filter(c => {
    const courseDate = new Date(c.metadata.publishedDate);
    const tagMatch = !selectedTag || c.metadata.tags.includes(selectedTag);
    
    let dateMatch = true;
    if (dateFilter === 'last30') {
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(now.getDate() - 30);
      dateMatch = courseDate >= thirtyDaysAgo;
    } else if (dateFilter === 'last180') {
      const sixMonthsAgo = new Date(now);
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      dateMatch = courseDate >= sixMonthsAgo;
    } else if (dateFilter === 'thisYear') {
      dateMatch = courseDate.getFullYear() === now.getFullYear();
    }

    return tagMatch && dateMatch;
  });

  if (sortByDate === 'newest') {
    filteredCourses = [...filteredCourses].sort((a, b) => new Date(b.metadata.publishedDate).getTime() - new Date(a.metadata.publishedDate).getTime());
  } else if (sortByDate === 'oldest') {
    filteredCourses = [...filteredCourses].sort((a, b) => new Date(a.metadata.publishedDate).getTime() - new Date(b.metadata.publishedDate).getTime());
  }

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mb-16">
        <div className="relative bg-[url('/assets/images/Mobile%20Hero%20Image%20-%20Education.png')] bg-cover bg-bottom rounded-[2.5rem] overflow-hidden min-h-[400px] flex flex-col lg:flex-row items-center lg:items-end">
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-courses-primary/40 z-0"></div>
          {/* Text Content */}
          <div className="flex-1 p-8 md:p-12 lg:p-16 relative z-10 text-white text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Med-<span className="text-white/80">Courses</span>
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-lg mb-8 mx-auto lg:mx-0">
                Professional medical courses designed to enhance your clinical expertise and career progression.
              </p>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="flex-1 w-full lg:w-1/2 h-[250px] md:h-[350px] lg:h-full relative self-end">
            <img
              src="/assets/images/Med-Courses Hero Image.png"
              alt="Education Hero"
              className="w-full h-full object-contain object-bottom"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Filter by Tag</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedTag(null)}
              className={clsx(
                "px-6 py-2 rounded-full text-sm font-bold transition-all",
                !selectedTag ? "bg-courses-primary text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
              )}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={clsx(
                  "px-6 py-2 rounded-full text-sm font-bold transition-all",
                  selectedTag === tag ? "bg-courses-primary text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Time Period</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'all', label: 'All Time' },
              { id: 'last30', label: 'Last 30 Days' },
              { id: 'last180', label: 'Last 6 Months' },
              { id: 'thisYear', label: 'This Year' }
            ].map(period => (
              <button
                key={period.id}
                onClick={() => setDateFilter(period.id as any)}
                className={clsx(
                  "px-6 py-2 rounded-full text-sm font-bold transition-all",
                  dateFilter === period.id ? "bg-courses-primary text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
                )}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Sort by Date</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSortByDate(sortByDate === 'newest' ? null : 'newest')}
              className={clsx(
                "px-6 py-2 rounded-full text-sm font-bold transition-all",
                sortByDate === 'newest' ? "bg-courses-primary text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
              )}
            >
              Newest First
            </button>
            <button
              onClick={() => setSortByDate(sortByDate === 'oldest' ? null : 'oldest')}
              className={clsx(
                "px-6 py-2 rounded-full text-sm font-bold transition-all",
                sortByDate === 'oldest' ? "bg-courses-primary text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
              )}
            >
              Oldest First
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};
