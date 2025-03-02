// types/practice.ts
export type PracticeType = 'listening' | 'speaking' | 'reading' | 'writing' | 'vocabulary' | 'conversation';

export interface Question {
  question_id: number;
  question_type: string;
  question_text: string;
  question_context?: string;
  correct_answer: boolean[]; // Changed from string to boolean[]
  options?: string[];
  hint?: string[]; // Changed from string to string[]
  audio?: string;
  question_image?: string;
  explanation?: string[]; // Changed from string to string[]
  practice_type?: PracticeType;
  difficulty?: number;
  passage_text?: string;
  parent_id?: number;
}