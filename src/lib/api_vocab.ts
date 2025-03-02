/*lib/api_vocab.ts */
import type { VocabularyList, VocabularyItem,AllVocabList } from '@/types/vocabulary';
import type { VocabularyFormData } from '@/types/vocabulary';

import { APIClient } from './api';

export class VocabularyService {
    private api: APIClient;
  
    constructor() {
      this.api = new APIClient();
    }
  
    // Add new methods to interact with vocabulary lists
    getVocabList(): Promise<AllVocabList> {
      return this.api.get<AllVocabList>('/vocabulary-list');
    }
  
    getVocabularyById(id: string): Promise<VocabularyList> {
      return this.api.get<VocabularyList>(`/api/vocabulary/${id}`);
    }
  
    createVocabList(data: Partial<VocabularyList>): Promise<VocabularyList> {
      return this.api.post<VocabularyList>('/vocabulary', data);
    }
    editVocabList(data: Partial<VocabularyList>): Promise<VocabularyList> {
      return this.api.patch<VocabularyList>('/vocabulary', data);
    }
    deleteVocabList(id: number): Promise<void> {
      return this.api.delete(`/vocabulary/${id}`);
    }

    // Add new methods to interact with vocabulary items
    getVocabularyItems(listId: number): Promise<VocabularyItem[]> {
      return this.api.get<VocabularyItem[]>(`/vocabulary-item/${listId}`);
    }
    createVocabularyItem(data: VocabularyItem): Promise<VocabularyItem> {
      return this.api.post<VocabularyItem>('/vocabulary-item/', {data});
    }
    updateVocabularyItem(data: VocabularyItem): Promise<VocabularyItem> {
      return this.api.patch<VocabularyItem>('/vocabulary-item/', {data});
    }
    deleteVocabularyItem(id: number): Promise<void> {
      return this.api.delete(`/vocabulary-item/${id}`);
    }
}

export const vocabularyService = new VocabularyService();

export const getdictapi = async (word:string) :Promise<VocabularyFormData>=> {

  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data_json = await response.json();
      const ipa = data_json[0].phonetic || '';
      let definition = '';
      let example = '';
      for (let i =0; i< data_json[0].meanings[0].definitions.length && i< 3; i++)
      {
        definition += (data_json[0].meanings[0].definitions[i].definition) + '\n';
        if (data_json[0].meanings[0].definitions[i].example){
          example += data_json[0].meanings[0].definitions[i].example  + '\n';
        }
      }
      definition = definition.trim()
      example = example.trim()

  return {
    'word': word,
    'ipa':ipa,
    'definition': definition,
    'example':example
  }

}
