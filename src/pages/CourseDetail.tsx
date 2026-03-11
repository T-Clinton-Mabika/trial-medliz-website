import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_COURSES, CONTRIBUTORS } from '../data';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Star, BarChart, ArrowLeft, Play, CheckCircle2, MessageSquare, ChevronRight, ChevronLeft, Linkedin, Twitter, Instagram } from 'lucide-react';
import { FeedbackForm } from '../components/FeedbackForm';
import { Modal } from '../components/Modal';
import { clsx } from 'clsx';

/**
 * Course Detail Page.
 * Features:
 * - Course overview with instructor info and syllabus.
 * - Interactive module viewer with markdown content loaded from files.
 * - Integrated quiz system with navigation and feedback.
 */
export const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const course = MOCK_COURSES.find(c => c.id === id);
  const contributors = CONTRIBUTORS.filter(c => course?.metadata.contributorId.includes(c.id));
  const [activeModuleIdx, setActiveModuleIdx] = useState<number | null>(null);
  const [moduleContent, setModuleContent] = useState<string>('');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizState, setQuizState] = useState<{
    currentStep: number;
    answers: (number | null)[];
    submitted: boolean;
  }>({ currentStep: 0, answers: [], submitted: false });

  const activeModule = activeModuleIdx !== null ? course?.modules[activeModuleIdx] : null;

  useEffect(() => {
    if (activeModule?.contentPath) {
      fetch(activeModule.contentPath)
        .then(res => res.text())
        .then(text => setModuleContent(text))
        .catch(err => console.error('Failed to load module content:', err));
    } else {
      setModuleContent('');
    }
    
    // Reset quiz state when switching modules
    if (activeModule?.quiz) {
      setQuizState({
        currentStep: 0,
        answers: new Array(activeModule.quiz.questions.length).fill(null),
        submitted: false
      });
    }
  }, [activeModule]);

  if (!course) return <div className="p-20 text-center">Course not found</div>;

  const calculateScore = () => {
    if (!activeModule?.quiz) return 0;
    return quizState.answers.reduce((acc, curr, idx) => {
      return acc + (curr === activeModule.quiz!.questions[idx].correctIndex ? 1 : 0);
    }, 0);
  };

  const handleQuizSubmit = () => {
    setQuizState(prev => ({ ...prev, submitted: true }));
  };

  const resetQuiz = () => {
    if (activeModule?.quiz) {
      setQuizState({
        currentStep: 0,
        answers: new Array(activeModule.quiz.questions.length).fill(null),
        submitted: false
      });
    }
  };

  const questionsPerStep = 3;
  const totalSteps = activeModule?.quiz ? Math.ceil(activeModule.quiz.questions.length / questionsPerStep) : 0;
  const isLastStep = quizState.currentStep === totalSteps - 1;

  return (
    <div className="pb-24">
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <Link to="/education" className="inline-flex items-center gap-2 text-zinc-500 hover:text-courses-primary mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Med-Courses
        </Link>

        {activeModuleIdx === null ? (
          /* Course Intro Page (Coursera Style) */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-4 mb-6">
                {course.metadata.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-courses-primary/10 text-courses-primary text-xs font-bold rounded-full">
                    {tag}
                  </span>
                ))}
                {course.metadata.useofAI && (
                  <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-xs font-bold rounded-full uppercase tracking-wider">
                    AI Assisted
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-zinc-900 dark:text-white mb-8">
                {course.title}
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12 leading-relaxed">
                {course.description}
              </p>

              <div className="grid sm:grid-cols-3 gap-8 mb-16">
                <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  <div className="flex flex-wrap gap-4 mb-4">
                    {contributors.map(contributor => (
                      <div key={contributor.id} className="flex items-center gap-3">
                        <img src={contributor.image} alt={contributor.name} className="w-10 h-10 rounded-full object-cover border-2 border-courses-primary/20" />
                        <div className="flex gap-2">
                          {contributor.socials?.linkedin && <a href={contributor.socials.linkedin} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-courses-primary"><Linkedin size={14} /></a>}
                          {contributor.socials?.twitter && <a href={contributor.socials.twitter} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-courses-primary"><Twitter size={14} /></a>}
                          {contributor.socials?.instagram && <a href={contributor.socials.instagram} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-courses-primary"><Instagram size={14} /></a>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-zinc-500 mb-1">Instructors</div>
                  <div className="font-bold">
                    {contributors.map(c => c.name).join(', ') || 'Medliz Academy'}
                  </div>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  <BarChart className="text-courses-primary mb-4" />
                  <div className="text-sm text-zinc-500 mb-1">Difficulty</div>
                  <div className="font-bold">{course.difficulty}</div>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  <Clock className="text-courses-primary mb-4" />
                  <div className="text-sm text-zinc-500 mb-1">Duration</div>
                  <div className="font-bold">{course.duration}</div>
                </div>
              </div>

              <h2 className="text-2xl font-display font-bold mb-6">Course Content</h2>
              <div className="space-y-4">
                {course.modules.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveModuleIdx(idx)}
                    className="w-full flex items-center justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl hover:border-courses-primary transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-courses-primary/10 flex items-center justify-center text-courses-primary font-bold">
                        {idx + 1}
                      </div>
                      <span className="font-bold text-lg">{m.title}</span>
                    </div>
                    <Play size={20} className="text-zinc-300 group-hover:text-courses-primary transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl">
                <img src={course.image} alt={course.title} className="w-full aspect-video object-cover rounded-2xl mb-8" />
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-xl">{course.metadata.rating || 'N/A'}</span>
                  </div>
                  <span className="text-zinc-500 text-sm">1.2k students enrolled</span>
                </div>
                <button
                  onClick={() => setActiveModuleIdx(0)}
                  className="w-full py-4 bg-courses-primary hover:bg-courses-hover text-white font-display font-bold rounded-xl transition-all mb-4"
                >
                  Start Learning
                </button>
                <p className="text-center text-xs text-zinc-500">100% Online • Flexible Schedule</p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Module Content & Quiz */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h1 className="text-3xl font-display font-bold">{activeModule?.title}</h1>
              <button
                onClick={() => setActiveModuleIdx(null)}
                className="text-zinc-500 hover:text-courses-primary transition-colors"
              >
                Exit Module
              </button>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm mb-12">
              <div className="prose prose-zinc dark:prose-invert max-w-none mb-12 markdown-body">
                <ReactMarkdown>{moduleContent}</ReactMarkdown>
              </div>

              {activeModule?.quiz && (
                <div className="flex justify-center border-t border-zinc-100 dark:border-zinc-800 pt-8">
                  <button
                    onClick={() => setIsQuizOpen(true)}
                    className="flex items-center gap-2 px-8 py-4 bg-courses-primary text-white font-display font-bold rounded-2xl hover:scale-105 transition-transform"
                  >
                    <CheckCircle2 size={20} /> Take Module Quiz
                  </button>
                </div>
              )}
            </div>

            <Modal
              isOpen={isQuizOpen}
              onClose={() => setIsQuizOpen(false)}
              title={`${activeModule?.title} - Quiz`}
              maxWidth="max-w-2xl"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                    Step {quizState.currentStep + 1} of {totalSteps}
                  </div>
                  <div className="h-2 w-32 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-courses-primary transition-all duration-300" 
                      style={{ width: `${((quizState.currentStep + 1) / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>

                {activeModule?.quiz?.questions.slice(quizState.currentStep * questionsPerStep, (quizState.currentStep + 1) * questionsPerStep).map((q, qIdx) => {
                  const globalIdx = quizState.currentStep * questionsPerStep + qIdx;
                  return (
                    <div key={q.id} className="space-y-4">
                      <p className="font-bold text-lg">{globalIdx + 1}. {q.text}</p>
                      <div className="grid gap-3">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = quizState.answers[globalIdx] === optIdx;
                          const isCorrect = q.correctIndex === optIdx;
                          const showResult = quizState.submitted;

                          return (
                            <button
                              key={optIdx}
                              disabled={quizState.submitted}
                              onClick={() => {
                                const newAnswers = [...quizState.answers];
                                newAnswers[globalIdx] = optIdx;
                                setQuizState(prev => ({ ...prev, answers: newAnswers }));
                              }}
                              className={clsx(
                                'w-full text-left p-4 rounded-xl border transition-all',
                                !showResult && isSelected ? 'border-courses-primary bg-courses-primary/5' : 'border-zinc-100 dark:border-zinc-800',
                                showResult && isCorrect ? 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400' : '',
                                showResult && isSelected && !isCorrect ? 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400' : ''
                              )}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                <div className="pt-6 flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                      {quizState.currentStep > 0 && (
                        <button
                          onClick={() => setQuizState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }))}
                          className="flex items-center gap-2 px-6 py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <ChevronLeft size={20} /> Previous
                        </button>
                      )}
                      
                      {!isLastStep && (
                        <button
                          onClick={() => setQuizState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }))}
                          className="flex items-center gap-2 px-6 py-3 bg-courses-primary text-white font-bold rounded-xl hover:bg-courses-hover transition-colors"
                        >
                          Next <ChevronRight size={20} />
                        </button>
                      )}
                    </div>

                    {!quizState.submitted ? (
                      isLastStep && (
                        <button
                          onClick={handleQuizSubmit}
                          className="px-8 py-3 bg-courses-primary text-white font-bold rounded-xl hover:bg-courses-hover transition-colors"
                        >
                          Submit Answers
                        </button>
                      )
                    ) : (
                      <button
                        onClick={resetQuiz}
                        className="px-8 py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        Retake Quiz
                      </button>
                    )}
                  </div>

                  {quizState.submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center"
                    >
                      <div className="text-sm text-zinc-500 mb-1 uppercase tracking-wider font-bold">Your Score</div>
                      <div className="text-4xl font-display font-bold text-courses-primary">
                        {calculateScore()} / {activeModule?.quiz?.questions.length}
                      </div>
                      <div className="mt-2 text-zinc-600 dark:text-zinc-400">
                        {calculateScore() === activeModule?.quiz?.questions.length 
                          ? 'Perfect! You have mastered this module.' 
                          : 'Great effort! Review the correct answers above.'}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </Modal>

            <div className="flex justify-center mb-24">
              <button
                onClick={() => setIsFeedbackOpen(true)}
                className="flex items-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-display font-bold rounded-2xl hover:scale-105 transition-transform"
              >
                <MessageSquare size={20} /> Course Feedback
              </button>
            </div>

            {/* Recommended Section */}
            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-16">
              <h2 className="text-3xl font-display font-bold mb-8">Recommended Courses</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {MOCK_COURSES.filter(c => c.id !== id).slice(0, 2).map(item => (
                  <Link key={item.id} to={`/education/${item.id}`} className="group block">
                    <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="text-xl font-display font-bold group-hover:text-courses-primary transition-colors">{item.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <FeedbackForm
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        subjectName={course.title}
        type="Course"
      />
    </div>
  );
};
