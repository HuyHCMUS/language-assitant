'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Thêm state isLoading


  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập và thông tin user từ localStorage
    const checkAuth = () => {
      const loginStatus = localStorage.getItem('isLoggedIn');
      const savedUser = localStorage.getItem('user');
      const access_token = localStorage.getItem('access_token');

      if (loginStatus === 'true' && savedUser && access_token) {
        setIsLoggedIn(true);
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false); // Đánh dấu đã check xong
    };

    checkAuth();
  }, []);

  const login = (userData: User, access_token?: string, refresh_token?:string) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    if (access_token && refresh_token) {
      localStorage.setItem('access_token', access_token); 
      localStorage.setItem('refresh_token', refresh_token);// Chỉ lưu token nếu có
    } else {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token') // Xóa token nếu không có
    }
    //localStorage.setItem('token', token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token')
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}