'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Form, Button } from 'react-bootstrap'
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa'
import { LoginData } from '@/types/auth' // Import interface RegisterData


interface LoginFormProps {
  onSubmit: (data: LoginData) => void; 
  onSocialLogin: (provider: string) => void;
  isLoading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSubmit, 
  onSocialLogin, 
  isLoading = false 
}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ email, password });

  }

  return (
    <Form onSubmit={handleSubmit}>


      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <Form.Check
          type="checkbox"
          label="Ghi nhớ đăng nhập"
          id="remember-me"
        />
        <Link href="/forgot-password" className="text-decoration-none">
          Quên mật khẩu?
        </Link>
      </div>

      <Button type="submit" variant="primary" className="w-100 mb-3" disabled={isLoading}>
        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </Button>

      <div className="text-center mb-3">
        <small className="text-muted">Hoặc đăng nhập với</small>
      </div>

      <div className="d-flex gap-2 mb-4">
        <Button
          variant="outline-danger"
          className="w-100"
          onClick={() => onSocialLogin('google')}
        >
          <FaGoogle className="me-2" /> Google
        </Button>
        <Button
          variant="outline-primary"
          className="w-100"
          onClick={() => onSocialLogin('facebook')}
        >
          <FaFacebook className="me-2" /> Facebook
        </Button>
        <Button
          variant="outline-dark"
          className="w-100"
          onClick={() => onSocialLogin('github')}
        >
          <FaGithub className="me-2" /> Github
        </Button>
      </div>

      <div className="text-center">
        <p className="mb-0">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="text-decoration-none">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default LoginForm; 