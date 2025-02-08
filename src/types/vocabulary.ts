// types/vocabulary.ts
export interface VocabularyList {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    totalWords: number;
    category: string;
    progress?: number;
    image?: string;
  }
  
  export interface VocabularyItem {
    listId: number;
    id: number;
    word: string;
    ipa: string;
    definition: string;
    example: string;
    imageUrl?: string;

    audioUrlUS?: string;
    audioUrlUK?: string;

  }
  
  export interface FormDataType {
    title: string;
    description: string;
    category: string;
  }