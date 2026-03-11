import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_POSTS, CONTRIBUTORS } from '../data';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Clock, Star, Calendar, MessageSquare, ArrowLeft, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useReadingTime } from '../hooks';
import { FeedbackForm } from '../components/FeedbackForm';

/**
 * Article Detail Page.
 * Features:
 * - Fetches and renders markdown content from a path.
 * - Displays contributor info and social links.
 * - Includes a feedback form and recommended articles.
 */
export const ArticleDetail: React.FC = () => {
  const { id } = useParams();
  const post = MOCK_POSTS.find(p => p.id === id);
  const contributors = CONTRIBUTORS.filter(c => post?.metadata.contributorId.includes(c.id));
  const [content, setContent] = useState('');
  const readingTime = useReadingTime(content);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  useEffect(() => {
    if (post?.contentPath) {
      fetch(post.contentPath)
        .then(res => res.text())
        .then(text => setContent(text))
        .catch(err => console.error('Failed to load article:', err));
    }
  }, [post]);

  if (!post) return <div className="p-20 text-center">Article not found</div>;

  const recommended = MOCK_POSTS.filter(p => p.id !== id).slice(0, 2);

  return (
    <div className="pb-24">
      <div className="max-w-4xl mx-auto px-4 pt-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-medical-primary mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Med-Blog
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-wrap gap-4 mb-6">
            {post.metadata.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-medical-primary/10 text-medical-primary text-xs font-bold rounded-full">
                {tag}
              </span>
            ))}
            {post.metadata.useofAI && (
              <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-xs font-bold rounded-full uppercase tracking-wider">
                AI Assisted
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-zinc-900 dark:text-white mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-zinc-500 border-b border-zinc-100 dark:border-zinc-800 pb-8 mb-12">
            <div className="flex flex-wrap gap-8">
              {contributors.map(contributor => (
                <div key={contributor.id} className="flex items-center gap-3">
                  <img src={contributor.image} alt={contributor.name} className="w-10 h-10 rounded-full object-cover border-2 border-medical-primary/20" />
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-900 dark:text-white text-sm">{contributor.name}</span>
                    <div className="flex gap-2">
                      {contributor.socials?.linkedin && <a href={contributor.socials.linkedin} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-medical-primary"><Linkedin size={12} /></a>}
                      {contributor.socials?.twitter && <a href={contributor.socials.twitter} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-medical-primary"><Twitter size={12} /></a>}
                      {contributor.socials?.instagram && <a href={contributor.socials.instagram} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-medical-primary"><Instagram size={12} /></a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <div className="flex items-center gap-2">
                <Calendar size={18} /> <span>{post.metadata.publishedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} /> <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={18} className="fill-yellow-400 text-yellow-400" /> <span>{post.metadata.rating || 'N/A'}</span>
              </div>
            </div>
          </div>

          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-3xl mb-12 shadow-xl"
            referrerPolicy="no-referrer"
          />

          <div className="markdown-body mb-16">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          <div className="flex justify-center mb-24">
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="flex items-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-display font-bold rounded-2xl hover:scale-105 transition-transform"
            >
              <MessageSquare size={20} /> Leave Feedback
            </button>
          </div>

          {/* Recommended Section */}
          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-16">
            <h2 className="text-3xl font-display font-bold mb-8">Recommended Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {recommended.map(item => (
                <Link key={item.id} to={`/blog/${item.id}`} className="group block">
                  <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-xl font-display font-bold group-hover:text-medical-primary transition-colors">{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <FeedbackForm
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        subjectName={post.title}
        type="Article"
      />
    </div>
  );
};
