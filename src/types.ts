/**
 * Represents a blog post or article in the Med-Blog section.
 */
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  metadata: {
    contributorId: string[];
    useofAI: boolean;
    publishedDate: string;
    tags: string[];
    rating: number | null;
    readingTime: number;
  };
  contentPath: string; // Path to the markdown file or content source
  image: string; // URL for the featured image
}

/**
 * Represents an educational course in the Med-Courses section.
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  metadata: {
    contributorId: string[];
    useofAI: boolean;
    publishedDate: string;
    tags: string[];
    rating: number | null;
    readingTime?: number;
  };
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string; // e.g., "12 Hours"
  image: string;
  modules: CourseModule[]; // A course consists of multiple learning modules
}

/**
 * A single module within a course.
 */
export interface CourseModule {
  id: string;
  title: string;
  contentPath: string; // Path to the markdown file for the module
  quiz?: Quiz; // Optional quiz at the end of the module
}

/**
 * A quiz containing multiple questions.
 */
export interface Quiz {
  questions: Question[];
}

/**
 * A single multiple-choice question.
 */
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number; // Index of the correct answer in the options array
}

/**
 * Information about a medical professional contributing to the platform.
 */
export interface Contributor {
  id: string;
  name: string;
  role: string;
  bio: string; // Short summary
  fullBio: string; // Detailed biography
  image: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

/**
 * Emergency contact numbers for different countries.
 */
export interface EmergencyContact {
  country: string;
  flagIcon: string;
  services: {
    name: string;
    number: string;
  }[];
}

/**
 * Short notices or tips displayed on the Important Information page.
 */
export interface InfoNotice {
  id: string;
  title: string;
  content: string;
  type: 'tip' | 'notice' | 'info';
}
