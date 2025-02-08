import React, { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container, Row, Col } from 'react-bootstrap'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)'
    }}>
      <Container fluid>
        <Row className="align-items-center">
          {/* Left side - Auth form */}
          <Col lg={5} className="px-lg-5">
            <div className="text-center mb-4">
              <Link href="/" className="d-inline-flex align-items-center text-decoration-none">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="me-2"
                />
                <span className="h3 text-primary fw-bold mb-0">
                  English Assistant
                </span>
              </Link>
            </div>
            {children}
          </Col>

          {/* Right side - Image */}
          <Col lg={7} className="d-none d-lg-block p-0">
            <div className="position-relative" style={{ height: '100vh' }}>
              <Image
                src="/images/auth-background.jpg"
                alt="Authentication background"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className="position-absolute top-50 start-50 translate-middle text-center text-white p-4" style={{
                background: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '1rem',
                maxWidth: '80%'
              }}>
                <h2 className="display-6 fw-bold mb-3">Học tiếng Anh thông minh</h2>
                <p className="lead mb-0">
                  Cải thiện kỹ năng tiếng Anh của bạn với sự hỗ trợ của AI
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AuthLayout 