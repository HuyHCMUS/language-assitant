import type { Question } from "@/types/practice";
import { APIClient } from "./api";

export class PracticeService {
  private api: APIClient;

  constructor() {
    this.api = new APIClient();
  }

  getSampleQuestions(type: string): Promise<Question[]> {
    return this.api.get<Question[]>(`/practice/${type}`);
  }
}
export const practiceService = new PracticeService();

