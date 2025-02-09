'use client'

import { Card } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AuthLayout from '@/components/layout/AuthLayout';
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = () => {//(data: { name: string, email: string, password: string }) => {
    login();
    router.push('/profile');
  };

  const handleSocialRegister = () => {//(provider: string) => {
    login();
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