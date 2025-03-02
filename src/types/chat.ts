// types/chat.ts
export interface Message {
    id?: string;
    content: string;
    sender: 'user' | 'bot';
    audio?: string;
    created_at?: Date;
    highlightedWords?: string[];
  }
  
export interface ErrorDetail {
  error_segment: string;
  error_type: string;
  suggestion: string
}
export interface Error{
  corrected_sentence: string;
  vocabulary: string;
  errors: ErrorDetail
}
export interface BotResponse {
  messages: string[];
  suggestions: string[];
  error?:  Error |null;

}

