export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }
  
  export interface AuthContextType {
    isLoggedIn: boolean;
    isLoading: boolean; // Thêm isLoading vào type

    user: User | null;
    login: (user: User, token?: string, refresh_token?:string) => void;
    logout: () => void;
  }

  export interface RegisterData {
    name: string;
    email: string;
    password: string;
  }
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    success: boolean;
    message: string;
    user?: User;
    access_token?: string; 
    refresh_token?: string // Thêm token vào interface
  }