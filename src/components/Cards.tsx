import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Star, ArrowRight, GraduationCap, Calendar, User } from 'lucide-react';
import { CONTRIBUTORS } from '../data';
import { useReadingTime } from '../hooks';

/**
 * Card component for displaying blog posts in a grid.
 * Includes hover effects, reading time estimation, and contributor info.
 */
export const BlogCard = ({ post }: { post: any }) => {
  const contributors = CONTRIBUTORS.filter(c => post.metadata.contributorId.includes(c.id));
  const mainContributor = contributors[0];
  const othersCount = contributors.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 card-hover"
    >
      <Link to={`/blog/${post.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
          <div className="absolute bottom-4 left-4 flex gap-2">
            {post.metadata.tags.map((tag: string) => (
              <span key={tag} className="px-2 py-1 bg-blog-primary/90 text-white text-[10px] font-bold rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-2 mb-4">
            {/* Line 1: Rating and Reading Time */}
            <div className="flex items-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1"><Star size={14} className="fill-yellow-400 text-yellow-400" /> {post.metadata.rating || 'N/A'}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {post.metadata.readingTime} min read</span>
              {post.metadata.useofAI && (
                <span className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded text-[9px] font-bold uppercase tracking-tighter">AI Assisted</span>
              )}
            </div>
            {/* Line 2: Author and Upload Date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                {mainContributor && (
                  <div className="flex items-center gap-1">
                    <div className="relative">
                      <img src={mainContributor.image} alt={mainContributor.name} className="w-4 h-4 rounded-full object-cover border border-zinc-100 dark:border-zinc-800" />
                      {othersCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-medical-primary text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-white dark:border-zinc-900">
                          +{othersCount}
                        </div>
                      )}
                    </div>
                    <span>{mainContributor.name}</span>
                  </div>
                )}
                <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.metadata.publishedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <h3 className="text-lg font-display font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blog-primary transition-colors">{post.title}</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
          <span className="text-blog-primary font-bold text-sm flex items-center gap-1">Read More <ArrowRight size={16} /></span>
        </div>
      </Link>
    </motion.div>
  );
};

/**
 * Card component for displaying educational courses.
 * Highlights difficulty level and duration.
 */
export const CourseCard = ({ course }: { course: any }) => {
  const contributors = CONTRIBUTORS.filter(c => course.metadata.contributorId.includes(c.id));
  const mainContributor = contributors[0];
  const othersCount = contributors.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 card-hover"
    >
      <Link to={`/education/${course.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
          <div className="absolute top-4 right-4 px-2 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest rounded-full text-courses-primary">
            {course.difficulty}
          </div>
          <div className="absolute bottom-4 left-4 flex gap-2">
            {course.metadata.tags.map((tag: string) => (
              <span key={tag} className="px-2 py-1 bg-courses-primary/90 text-white text-[10px] font-bold rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-2 mb-4">
            {/* Line 1: Rating and Duration */}
            <div className="flex items-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1"><Star size={14} className="fill-yellow-400 text-yellow-400" /> {course.metadata.rating || 'N/A'}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
              {course.metadata.useofAI && (
                <span className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded text-[9px] font-bold uppercase tracking-tighter">AI Assisted</span>
              )}
            </div>
            {/* Line 2: Author and Upload Date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-zinc-400">
                {mainContributor && (
                  <div className="flex items-center gap-1">
                    <div className="relative">
                      <img src={mainContributor.image} alt={mainContributor.name} className="w-4 h-4 rounded-full object-cover border border-zinc-100 dark:border-zinc-800" />
                      {othersCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-medical-primary text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-white dark:border-zinc-900">
                          +{othersCount}
                        </div>
                      )}
                    </div>
                    <span>{mainContributor.name}</span>
                  </div>
                )}
                <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(course.metadata.publishedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <h3 className="text-lg font-display font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-courses-primary transition-colors">{course.title}</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2 mb-4">{course.description}</p>
          <div className="flex items-center justify-end pt-4 border-t border-zinc-50 dark:border-zinc-800">
            <span className="text-courses-primary font-bold text-sm flex items-center gap-1">View Course <ArrowRight size={16} /></span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
