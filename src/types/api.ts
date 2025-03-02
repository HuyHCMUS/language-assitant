export interface APIResponse<T> {
    data: T;
    message: string;
    status: number;
  }

export interface RequestOptions {
    requiresAuth?: boolean;
    customHeaders?: Record<string, string>;
  }
  