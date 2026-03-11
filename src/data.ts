import { Post, Course, Contributor, EmergencyContact, InfoNotice } from './types';

/**
 * List of medical professionals who contribute content to the platform.
 * To add a new contributor, create an object following the Contributor interface.
 */
export const CONTRIBUTORS: Contributor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    role: 'Chief Medical Officer',
    bio: 'Specialist in Cardiology with over 15 years of experience in clinical research.',
    fullBio: 'Dr. Sarah Mitchell graduated from Harvard Medical School and has spent the last decade leading cardiovascular research initiatives. She is passionate about preventative medicine and patient education.',
    image: 'https://picsum.photos/seed/doc1/400/400',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    role: 'Pediatric Specialist',
    bio: 'Dedicated to child health and developmental wellness programs.',
    fullBio: 'Dr. James Wilson is a board-certified pediatrician with a focus on early childhood development. He has worked with international health organizations to improve pediatric care in underserved communities.',
    image: 'https://picsum.photos/seed/doc2/400/400',
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: '3',
    name: 'Dr. Elena Rodriguez',
    role: 'Neurology Consultant',
    bio: 'Expert in neurodegenerative diseases and brain health.',
    fullBio: 'Dr. Elena Rodriguez specializes in Alzheimer\'s and Parkinson\'s research. She has published over 50 papers in leading medical journals and frequently speaks at international neurology conferences.',
    image: 'https://picsum.photos/seed/doc3/400/400',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: '4',
    name: 'Dr. Michael Chen',
    role: 'Infectious Disease Expert',
    bio: 'Specializing in global health and epidemiology.',
    fullBio: 'Dr. Michael Chen has spent years on the front lines of global health crises. His work focuses on the spread of infectious diseases and the development of effective public health responses.',
    image: 'https://picsum.photos/seed/doc4/400/400',
    socials: {
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: '5',
    name: 'Dr. Emily Brown',
    role: 'Nutrition & Wellness Advisor',
    bio: 'Passionate about the intersection of diet and long-term health.',
    fullBio: 'Dr. Emily Brown is a clinical nutritionist with a PhD in Nutritional Sciences. She helps patients manage chronic conditions through personalized dietary interventions and lifestyle changes.',
    image: 'https://picsum.photos/seed/doc5/400/400',
    socials: {
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com'
    }
  }
];

/**
 * Emergency contact numbers organized by country.
 * These are displayed on the Important Information page.
 */
export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    country: 'United States',
    flagIcon: '/assets/svg/united-states-flag-icon.svg',
    services: [
      { name: 'Emergency (All)', number: '911' }
    ]
  },
  {
    country: 'United Kingdom',
    flagIcon: '/assets/svg/united-kingdom-flag-icon.svg',
    services: [
      { name: 'Emergency (All)', number: '999' },
      { name: 'Non-Emergency Medical', number: '111' }
    ]
  },
  {
    country: 'South Africa',
    flagIcon: '/assets/svg/south-africa-flag-icon.svg',
    services: [
      { name: 'Police', number: '10111' },
      { name: 'Ambulance', number: '10177' },
      { name: 'Emergency (Mobile)', number: '112' }
    ]
  }
];

/**
 * Short health tips and official notices.
 * 'type' can be 'tip', 'notice', or 'info' which affects the icon displayed.
 */
export const INFO_NOTICES: InfoNotice[] = [
  {
    id: '1',
    title: 'Flu Season Alert',
    content: 'Ensure you get your annual flu shot. Clinics are now open for walk-ins.',
    type: 'notice'
  },
  {
    id: '2',
    title: 'Hydration Tip',
    content: 'Drinking 2 liters of water daily can significantly improve cognitive function.',
    type: 'tip'
  },
  {
    id: '3',
    title: 'New Course Available',
    content: 'Our "Advanced Immunology" course is now live in Med-Courses.',
    type: 'info'
  }
];

/**
 * Mock blog posts for the Med-Blog section.
 * 'contributorId' in metadata must match IDs in the CONTRIBUTORS array.
 */
export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Understanding Modern Immunology',
    excerpt: 'First aid skills that could save a life before help arrives.',
    metadata: {
      contributorId: ['1', '4'],
      useofAI: false,
      publishedDate: '2024-03-15',
      tags: ['Immunology', 'Research'],
      rating: 4.8,
      readingTime: 8,
    },
    contentPath: '/content/articles/immunology.md',
    image: 'https://picsum.photos/seed/med1/800/400'
  },
  {
    id: '2',
    title: 'The Future of Telemedicine',
    excerpt: 'How digital transformation is reshaping patient-doctor interactions.',
    metadata: {
      contributorId: ['2', '3'],
      useofAI: true,
      publishedDate: '2024-03-10',
      tags: ['Technology', 'Healthcare'],
      rating: 4.5,
      readingTime: 5,
    },
    contentPath: '/content/articles/telemedicine.md',
    image: 'https://picsum.photos/seed/med2/800/400'
  },
  {
    id: '3',
    title: 'Cardiovascular Health in 2024',
    excerpt: 'New guidelines for managing hypertension and heart disease.',
    metadata: {
      contributorId: ['1'],
      useofAI: false,
      publishedDate: '2024-03-20',
      tags: ['Cardiology', 'Prevention'],
      rating: 4.9,
      readingTime: 6,
    },
    contentPath: '/content/articles/cardiology.md',
    image: 'https://picsum.photos/seed/med3/800/400'
  }
];

/**
 * Mock educational courses for the Med-Courses section.
 * Each course contains multiple modules, and modules can optionally have a quiz.
 * Content is written in Markdown.
 */
export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Foundations of Clinical Practice',
    description: 'Learn the essential skills required for modern clinical environments.',
    metadata: {
      contributorId: ['1', '3', '5'],
      useofAI: false,
      publishedDate: '2024-01-15',
      tags: ['Clinical', 'Basics'],
      rating: 4.9,
      readingTime: 12,
    },
    difficulty: 'Beginner',
    duration: '12 Hours',
    image: 'https://picsum.photos/seed/course1/800/400',
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Patient Care',
        contentPath: '/content/courses/clinical-basics.md',
        quiz: {
          questions: [
            {
              id: 'q1',
              text: 'What is the primary goal of patient-centered care?',
              options: ['Efficiency', 'Patient Comfort', 'Cost Reduction', 'Doctor Convenience'],
              correctIndex: 1
            },
            {
              id: 'q2',
              text: 'Which of these is a core ethical principle in medicine?',
              options: ['Profitability', 'Autonomy', 'Speed', 'Popularity'],
              correctIndex: 1
            },
            {
              id: 'q3',
              text: 'How often should patient records be updated?',
              options: ['Weekly', 'Monthly', 'After every interaction', 'Annually'],
              correctIndex: 2
            }
          ]
        }
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced Emergency Medicine',
    description: 'Critical care techniques for emergency department professionals.',
    metadata: {
      contributorId: ['1', '4'],
      useofAI: true,
      publishedDate: '2024-02-10',
      tags: ['Emergency', 'Critical Care'],
      rating: 4.7,
      readingTime: 24,
    },
    difficulty: 'Advanced',
    duration: '24 Hours',
    image: 'https://picsum.photos/seed/course2/800/400',
    modules: [
      {
        id: 'm1',
        title: 'Triage Protocols',
        contentPath: '/content/courses/triage-protocols.md',
        quiz: {
          questions: [
            { id: 'q1', text: 'What does the Red category in triage signify?', options: ['Minor injury', 'Life-threatening', 'Deceased', 'Delayed care'], correctIndex: 1 },
            { id: 'q2', text: 'Which method is commonly used for rapid triage?', options: ['STOP', 'START', 'GO', 'FAST'], correctIndex: 1 },
            { id: 'q3', text: 'What color is assigned to "Minimal" injuries?', options: ['Red', 'Yellow', 'Green', 'Black'], correctIndex: 2 },
            { id: 'q4', text: 'In triage, "Expectant" usually means:', options: ['Immediate surgery', 'Minor treatment', 'Non-survivable', 'Observation'], correctIndex: 2 },
            { id: 'q5', text: 'Which vital sign is checked first in START triage?', options: ['Heart rate', 'Respiration', 'Temperature', 'Blood pressure'], correctIndex: 1 },
            { id: 'q6', text: 'A patient who can walk is usually categorized as:', options: ['Red', 'Yellow', 'Green', 'Black'], correctIndex: 2 },
            { id: 'q7', text: 'What is the primary goal of triage?', options: ['Treat everyone', 'Save the most lives', 'Document injuries', 'Transport quickly'], correctIndex: 1 },
            { id: 'q8', text: 'Capillary refill time over 2 seconds indicates:', options: ['Normal status', 'Immediate category', 'Delayed category', 'Minor injury'], correctIndex: 1 },
            { id: 'q9', text: 'If a patient is not breathing after opening the airway:', options: ['Tag Red', 'Tag Black', 'Tag Yellow', 'Start CPR'], correctIndex: 1 },
            { id: 'q10', text: 'The "Delayed" category is for patients who:', options: ['Are walking', 'Need immediate surgery', 'Need care but can wait', 'Are deceased'], correctIndex: 2 },
            { id: 'q11', text: 'Triage should ideally take how long per patient?', options: ['10 seconds', '30-60 seconds', '5 minutes', '10 minutes'], correctIndex: 1 }
          ]
        }
      }
    ]
  },
  {
    id: '3',
    title: 'Pediatric Nutrition Essentials',
    description: 'Comprehensive guide to nutritional requirements in early childhood.',
    metadata: {
      contributorId: ['2', '5'],
      useofAI: false,
      publishedDate: '2024-03-05',
      tags: ['Pediatrics', 'Nutrition'],
      rating: 4.6,
      readingTime: 8,
    },
    difficulty: 'Intermediate',
    duration: '8 Hours',
    image: 'https://picsum.photos/seed/course3/800/400',
    modules: [
      {
        id: 'm1',
        title: 'Growth Milestones',
        contentPath: '/content/courses/pediatric-nutrition.md',
      }
    ]
  }
];
