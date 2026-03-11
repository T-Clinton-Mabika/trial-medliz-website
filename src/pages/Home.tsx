import React from 'react';
import { motion } from 'framer-motion';
import { useScrollCounter } from '../hooks';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, BookOpen, Users, Award, ShieldCheck, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_POSTS, MOCK_COURSES } from '../data';
import { useReadingTime } from '../hooks';
import { BlogCard, CourseCard } from '../components/Cards';

/**
 * Animated counter component for displaying statistics.
 * Uses the useScrollCounter hook to animate from 0 to the target value.
 */
const StatCounter = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useScrollCounter(isInView ? value : 0);

  return (
    <div ref={ref} className="text-center p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
      <div className="text-4xl font-display font-bold text-medical-primary mb-2">
        {count}{suffix}
      </div>
      <div className="text-zinc-500 dark:text-zinc-400 font-medium">{label}</div>
    </div>
  );
};

/**
 * Home Page Component.
 * Features:
 * - Hero section with call-to-action buttons.
 * - Animated statistics grid.
 * - Key features/benefits section.
 * - Previews of latest blog posts and courses.
 */
export const Home: React.FC = () => {
  const latestPosts = [...MOCK_POSTS].sort((a, b) => new Date(b.metadata.publishedDate).getTime() - new Date(a.metadata.publishedDate).getTime()).slice(0, 3);
  const latestCourses = [...MOCK_COURSES].sort((a, b) => new Date(b.metadata.publishedDate).getTime() - new Date(a.metadata.publishedDate).getTime()).slice(0, 3);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative bg-[url('assets/images/Mobile%20Hero%20Image%20-%20Home.png')] bg-cover bg-bottom rounded-[2.5rem] overflow-hidden min-h-[500px] flex flex-col lg:flex-row items-center lg:items-end">
          {/* Overlay to ensure text readability if needed */}
          <div className="absolute inset-0 bg-default-primary/40 z-0"></div>
          {/* Text Content */}
          <div className="flex-1 p-8 md:p-12 lg:p-16 relative z-10 text-white text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-wider uppercase bg-white/20 rounded-full">
                Empowering Medical Excellence
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                Forge Your Future with <span className="text-white/80">Expert-Led</span> Medical Insights
              </h1>
              <p className="text-base md:text-lg text-white/90 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Master clinical skills and stay updated with the latest medical research through our comprehensive education portal and expert-curated insights.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  to="/education"
                  className="px-8 py-4 bg-white text-default-primary hover:bg-zinc-100 text-sm font-display font-bold rounded-xl transition-all flex items-center gap-2 group"
                >
                  Browse Courses <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/blog"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-sm font-display font-bold rounded-xl transition-all backdrop-blur-sm"
                >
                  Read Articles
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="flex-1 w-full lg:w-1/2 h-[300px] md:h-[450px] lg:h-full relative self-end">
            <img
              src="assets/images/Home Hero Image.png"
              alt="Medical Hero"
              className="w-full h-full object-contain object-bottom"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCounter value={100} label="Active Learners" suffix="K+" />
          <StatCounter value={500} label="Expert Courses" suffix="+" />
          <StatCounter value={95} label="Completion Rate" suffix="%" />
          <StatCounter value={4.9} label="Average Rating" />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-zinc-900 dark:text-white mb-4">
            Everything You Need to <span className="text-medical-primary">Succeed</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            We've designed every aspect of the learning experience to help you achieve your goals faster and more effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: BookOpen, title: 'Expert-Led Content', desc: 'Learn from industry practitioners who have built products at top companies.' },
            { icon: Users, title: 'Community Access', desc: 'Join a community of 100K+ learners for networking and support.' },
            { icon: Award, title: 'Certificates', desc: 'Earn industry-recognized certificates to showcase your skills.' },
            { icon: ShieldCheck, title: 'Verified Information', desc: 'All medical content is peer-reviewed by leading specialists.' },
          ].map((feature, idx) => (
            <div key={idx} className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-medical-primary/30 transition-colors">
              <div className="w-12 h-12 bg-medical-primary/10 rounded-xl flex items-center justify-center text-medical-primary mb-6">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-4">Latest Med-Blog Posts</h2>
            <p className="text-zinc-500 dark:text-zinc-400">Our most recent medical research and articles.</p>
          </div>
          <Link to="/blog" className="text-medical-primary font-bold flex items-center gap-2 hover:underline">
            View All <ArrowRight size={20} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {latestPosts.map(post => <BlogCard key={post.id} post={post} />)}
        </div>
      </section>

      {/* Latest Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 dark:text-white mb-4">New Courses</h2>
            <p className="text-zinc-500 dark:text-zinc-400">Recently added professional medical training.</p>
          </div>
          <Link to="/education" className="text-medical-primary font-bold flex items-center gap-2 hover:underline">
            View All <ArrowRight size={20} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {latestCourses.map(course => <CourseCard key={course.id} course={course} />)}
        </div>
      </section>
    </div>
  );
};
