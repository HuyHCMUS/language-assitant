// utils/practiceUtils.ts
import { Question, PracticeType } from '@/types/practice';

export const getSampleQuestions = (type: PracticeType): Question[] => {
  switch (type) {
    case 'listening':
      return [
        {
          id: 1,
          type: 'multiple-choice',
          question: 'Listen to the audio and choose the correct meaning:',
          correctAnswer: 'Business meeting',
          options: [
            'Business meeting',
            'Casual conversation',
            'Phone call',
            'Job interview'
          ],
          audio: '/sample-audio-1.mp3'
        },
        // Add more listening questions...
      ];

    case 'speaking':
      return [
        {
          id: 1,
          type: 'speaking',
          question: 'Pronounce the following word: "Entrepreneur"',
          correctAnswer: '', // This would be handled differently for speaking
        },
        // Add more speaking questions...
      ];

    case 'reading':
      return [
        {
          id: 1,
          type: 'multiple-choice',
          question: 'What is the main idea of the passage?',
          correctAnswer: 'Global economic trends',
          options: [
            'Global economic trends',
            'Local businesses',
            'Market analysis',
            'Stock prices'
          ],
        },
        // Add more reading questions...
      ];

    case 'writing':
      return [
        {
          id: 1,
          type: 'fill-in',
          question: 'Complete the sentence: The company\'s profits _____ by 15% last quarter.',
          correctAnswer: 'increased',
          hint: 'Think about growth and positive change',
        },
        // Add more writing questions...
      ];

    // Handle other practice types...
    default:
      return [];
  }
};