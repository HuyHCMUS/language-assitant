import type { Message, BotResponse } from "@/types/chat";
import { APIClient } from "./api";
// import { SuggestionResponse } from "@/types/chat";

export class ChatService {
  private api: APIClient;

  constructor() {
    this.api = new APIClient();
  }

  getResponseMessage(message: Partial<Message>): Promise<BotResponse> {
    return this.api.post<BotResponse>('/messages', message);
  }
  getSuggestionMessage(content: string): Promise<string[]> {
    return this.api.post<string[]>('/suggestions',{content});
  }
}
export const chatService = new ChatService();

