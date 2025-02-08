// types/practice.ts
export type QuestionType = 'multiple-choice' | 'fill-in' | 'speaking';
export type PracticeType = 'listening' | 'speaking' | 'reading' | 'writing' | 'random' | 'test';

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  correctAnswer: string;
  options?: string[];
  hint?: string;
  audio?: string;
}

export interface PracticeSession {
  type: PracticeType;
  totalQuestions: number;
  currentQuestion: number;
  questions: Question[];
}