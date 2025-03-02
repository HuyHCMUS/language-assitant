'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Form, Button } from 'react-bootstrap'
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa'
import { RegisterData } from '@/types/auth' // Import interface RegisterData

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => void;  // Định dạng đúng với interface
  onSocialRegister: (provider: string) => void;
  isLoading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ 
  onSubmit, 
  onSocialRegister, 
  isLoading = false 
}) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    // Bỏ trường confirmPassword và gửi đúng định dạng RegisterData
    
    const { confirmPassword, ...submitData } = formData;
    void confirmPassword; 
    console.log(submitData)
    onSubmit(submitData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Họ và tên</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập họ và tên"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Nhập email của bạn"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control
          type="password"
          placeholder="Tạo mật khẩu"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Xác nhận mật khẩu</Form.Label>
        <Form.Control
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />
      </Form.Group>

      {error && (
        <div className="alert alert-danger mb-3">
          {error}
        </div>
      )}

      <Button type="submit" variant="primary" className="w-100 mb-3" disabled={isLoading}>
        {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
      </Button>

      <div className="text-center mb-3">
        <small className="text-muted">Hoặc đăng ký với</small>
      </div>

      <div className="d-flex gap-2 mb-4">
        <Button
          variant="outline-danger"
          className="w-100"
          onClick={() => onSocialRegister('google')}
        >
          <FaGoogle className="me-2" /> Google
        </Button>
        <Button
          variant="outline-primary"
          className="w-100"
          onClick={() => onSocialRegister('facebook')}
        >
          <FaFacebook className="me-2" /> Facebook
        </Button>
        <Button
          variant="outline-dark"
          className="w-100"
          onClick={() => onSocialRegister('github')}
        >
          <FaGithub className="me-2" /> Github
        </Button>
      </div>

      <div className="text-center">
        <p className="mb-0">
          Đã có tài khoản?{' '}
          <Link href="/login" className="text-decoration-none">
            Đăng nhập
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default RegisterForm;
