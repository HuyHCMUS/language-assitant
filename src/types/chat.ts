// types/chat.ts
export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    highlightedWords?: string[];
  }
  
  export interface SuggestionResponse {
    text: string;
    context: string;
  }