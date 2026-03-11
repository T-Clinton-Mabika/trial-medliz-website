import React, { useState } from 'react';
import { Modal } from './Modal';
import { Star } from 'lucide-react';
import { clsx } from 'clsx';

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
  subjectName: string;
  type: 'Article' | 'Course' | 'Contact';
}

/**
 * Reusable Feedback and Contact Form.
 * Can be used for article/course feedback or as a general contact form.
 * Includes a star rating system for feedback types.
 */
export const FeedbackForm: React.FC<FeedbackFormProps> = ({ isOpen, onClose, subjectName, type }) => {
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', { ...formData, rating, subjectName, type });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={type === 'Contact' ? 'Contact Us' : `Feedback: ${subjectName}`}>
      {isSubmitted ? (
        <div className="py-12 text-center space-y-4">
          <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
            <Star size={32} className="fill-current" />
          </div>
          <h4 className="text-xl font-display font-bold">Thank You!</h4>
          <p className="text-zinc-500">Your {type === 'Contact' ? 'message' : 'feedback'} has been received.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Name</label>
            <input
              required
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-medical-primary outline-none"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
            <input
              required
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-medical-primary outline-none"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          {type !== 'Contact' && (
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={24}
                      className={clsx(
                        'transition-colors',
                        star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-300 dark:text-zinc-600'
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              {type === 'Contact' ? 'Message' : 'Comment'}
            </label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-medical-primary outline-none resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-medical-primary hover:bg-medical-secondary text-white font-display font-bold rounded-xl transition-colors"
          >
            Submit {type === 'Contact' ? 'Message' : 'Feedback'}
          </button>
        </form>
      )}
    </Modal>
  );
};
