// types/vocabulary.ts

  export interface VocabularyList {
    list_id: number;
    title: string;
    category: string;
    description: string;
    updated_at?: string;
    total_words?: number;
    progress?: number;
    image?: string;
  }

  export interface AllVocabList {
    vocab_list_user: VocabularyList[],
    vocab_list_public: VocabularyList[]
  }
  
  
  export interface VocabularyItem {
    list_id: number;
    item_id: number;
    word: string;
    ipa: string;
    definition: string;
    example: string;
    image_url?: string;
    //image_file?: 
  }
  
  export interface FormDataType {
    title: string;
    description: string;
    category: string;
  }

  export interface VocabularyFormData {
    word: string;
    ipa: string;
    definition: string;
    example: string;
    image_base64?:string;
  }