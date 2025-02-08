'use client'

import { Card } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AuthLayout from '@/components/layout/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (email: string, password: string) => {
    login();
    router.push('/profile');
  };

  const handleSocialLogin = (provider: string) => {
    login();
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