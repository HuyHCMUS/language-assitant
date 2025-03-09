import type { Question } from "@/types/practice";
import { APIClient } from "./api";

export class PracticeService {
  private api: APIClient;

  constructor() {
    this.api = new APIClient();
  }

  getSampleQuestions(type: string, topic: string): Promise<Question[]> {
    return this.api.get<Question[]>(`/practice/${type}?topic=${encodeURIComponent(topic)}`);
  }
}
export const practiceService = new PracticeService();

