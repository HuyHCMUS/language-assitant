import type { RegisterData, AuthResponse, LoginData } from '@/types/auth';
import type { APIResponse, RequestOptions } from '@/types/api';

const API_BASE_URL = 'https://be-dnt4.onrender.com/api/v1';

interface ErrorResponse {
  detail: string;
  status?: number;
}

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class APIClient {
  private baseUrl: string;
  private refreshPromise: Promise<void> | null = null;
  
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  private setTokens(access_token: string, refresh_token: string) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  }

  private clearTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // Xóa token cũ nếu có
    localStorage.removeItem('token');
  }

  private getHeaders(options?: RequestOptions): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options?.customHeaders || {})
    };

    if (options?.requiresAuth) {
      const token = this.getAccessToken();
      if (!token) {
        throw new APIError('No authentication token found');
      }
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleErrorResponse(response: Response): Promise<never | undefined> {
    let errorMessage: string;
    try {
        const errorData: ErrorResponse = await response.json();
        errorMessage = errorData.detail || 'Unknown error occurred';
    } catch {
        errorMessage = response.statusText || 'API request failed';
    }
    throw new APIError(errorMessage, response.status, response.statusText);
  }

  private async refreshAccessToken(): Promise<void> {
    const refresh_token = this.getRefreshToken();
    if (!refresh_token) {
      this.clearTokens();
      throw new APIError('No refresh token found');
    }

    try {
      const response = await fetch(`${this.baseUrl}/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token }),
      });

      if (!response.ok) {
        this.clearTokens();
        throw new APIError('Failed to refresh token');
      }

      const data: AuthResponse = await response.json();
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        console.log('Refresh OK!')
        console.log('New token', data.access_token)
        console.log('Token from localstorage: ', localStorage.getItem('access_token'))
      }
    } catch (error) {
      this.clearTokens();
      throw error;
    }
  }

  private async handleRequest<T>(
    requestFn: () => Promise<Response>,
    retryCount = 0
  ): Promise<T> {
    try {
        const response = await requestFn();

        if (response.ok) {
            const result: APIResponse<T> = await response.json();
            return result.data;
        }

        // Xử lý refresh token khi nhận 401
        if (response.status === 401 && retryCount === 0) {
            if (!this.refreshPromise) {
              console.log('old token:', localStorage.getItem('access_token'))
                this.refreshPromise = this.refreshAccessToken();
            }

            try {
                await this.refreshPromise;
                return this.handleRequest(requestFn, retryCount + 1);
            } finally {
                this.refreshPromise = null;
            }
        }

        // Nếu không phải 401 hoặc đã retry, throw error
        throw await this.handleErrorResponse(response);

    } catch (error) {
        if (error instanceof APIError) {
            throw error;
        }
        throw new APIError(
            error instanceof Error ? error.message : 'Unknown error occurred'
        );
    }
  }

  async get<T>(endpoint: string, options: RequestOptions = { requiresAuth: true }): Promise<T> {
    return this.handleRequest<T>(() => 
      fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(options),
      })
    );
  }

  async post<T, D = Record<string, unknown>>(
    endpoint: string, 
    data: D, 
    options: RequestOptions = { requiresAuth: true }
  ): Promise<T> {
    return this.handleRequest<T>(() => 
      fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(options),
        body: JSON.stringify(data),
      })
    );
  }

  async patch<T, D = Record<string, unknown>>(
    endpoint: string, 
    data: D, 
    options: RequestOptions = { requiresAuth: true }
  ): Promise<T> {
    return this.handleRequest<T>(() => 
      fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PATCH',
        headers: this.getHeaders(options),
        body: JSON.stringify(data),
      })
    );
  }

  async delete<T>(endpoint: string, options: RequestOptions = { requiresAuth: true }): Promise<T> {
    return this.handleRequest<T>(() => 
      fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(options),
      })
    );
  }
}

// Tạo hàm fetchAuth chung để xử lý các request authentication
async function fetchAuth<T>(endpoint: string, data: T): Promise<AuthResponse> {
  try {
    console.log('Chuẩn bị gửi API');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    console.log('Đã nhận phản hồi');

    if (!response.ok) {
      throw new Error(result.detail || 'Authentication failed');
    }
    
    return {
      success: true,
      message: result.message || 'Authentication successful',
      user: result.user,
      access_token: result.access_token,
      refresh_token: result.refresh_token
    };
  } catch (error) {
    console.log('Bị lỗi');
    throw error;
  }
}

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  return fetchAuth('/register', data);
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  return fetchAuth('/login', data);
};