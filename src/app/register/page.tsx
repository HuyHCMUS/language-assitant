'use client'
import { useEffect } from 'react';

import { Card } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AuthLayout from '@/components/layout/AuthLayout';
import RegisterForm from '@/components/auth/RegisterForm';
import { registerUser } from '../../lib/api';


import type { RegisterData } from '@/types/auth';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { isLoggedIn } = useAuth();
  
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/profile");
    }
  }, [isLoggedIn]); 
  
  //const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: RegisterData) => {
    try {
      //setIsLoading(true);
      const response = await registerUser(data);
      
      if (response.success && response.user) {
        // Đăng nhập người dùng sau khi đăng ký thành công
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

  const handleSocialRegister = () => {//(provider: string) => {
    //login();
    router.push('/profile');
  };

  return (
    <AuthLayout>
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-1">Đăng ký tài khoản</h2>
            <p className="text-muted">Tạo tài khoản miễn phí!</p>
          </div>
          <RegisterForm 
            onSubmit={handleSubmit}
            onSocialRegister={handleSocialRegister}
          />
        </Card.Body>
      </Card>
    </AuthLayout>
  );
} 