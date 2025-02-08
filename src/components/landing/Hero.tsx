import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Row, Col, Button } from 'react-bootstrap'

const Hero: React.FC = () => {
  return (
    <section className="py-5" style={{ 
      background: 'linear-gradient(135deg, #0062E6 0%, #33A7FF 100%)',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
            <div className="text-white">
              <span className="bg-white bg-opacity-25 text-white px-3 py-2 rounded-pill fw-semibold small">
                ENGLISH ASSISTANT
              </span>
              <h1 className="display-4 fw-bold mt-4 mb-3">
                Trợ Lý Học Tiếng Anh Thông Minh
              </h1>
              <p className="lead mb-4 opacity-90">
                Cải thiện kỹ năng tiếng Anh của bạn với sự hỗ trợ của AI. 
                Học mọi lúc, mọi nơi với phương pháp cá nhân hóa.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                <Button 
                  variant="light" 
                  size="lg" 
                  className="fw-semibold"
                  href="/register"
                >
                  Bắt đầu ngay
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg"
                  href="/about"
                >
                  Tìm hiểu thêm
                </Button>
              </div>
            </div>
          </Col>
          
          <Col lg={6} className="text-center">
            <div className="position-relative" style={{ height: '400px' }}>
              <Image
                src="/ai_22_b.jpg"
                alt="English Learning Illustration"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero 