'use client'
import { useEffect } from 'react';

import { Card } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AuthLayout from '@/components/layout/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import type { LoginData } from '@/types/auth';
import { loginUser } from '../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { isLoggedIn } = useAuth();
  
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/profile");
    }
  }, [isLoggedIn,router]); 

  //const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: LoginData) => {
    try {
      //setIsLoading(true);
      const response = await loginUser(data);
      
      if (response.success && response.user) {
        // Đăng nhập người dùng sau khi đăng ký thành công
        console.log(response)
        login(response.user, response.access_token, response.refresh_token);
        router.push('/profile'); // hoặc trang chính sau đăng ký
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Registration failed');
    } finally {
      //setIsLoading(false);
    }
  };

  const handleSocialLogin = () => {//(provider: string) => {
    //login();
    router.push('/profile');
  };

  return (
    <AuthLayout>
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-1">Đăng nhập</h2>
            <p className="text-muted">Chào mừng bạn trở lại!</p>
          </div>
          <LoginForm 
            onSubmit={handleSubmit}
            onSocialLogin={handleSocialLogin}
          />
        </Card.Body>
      </Card>
    </AuthLayout>
  );
} 