'use client'

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="py-5">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-5">
          <span className="bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold small">
            VỀ CHÚNG TÔI
          </span>
          <h1 className="display-5 fw-bold mt-4 mb-3">English Assistant</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Nền tảng học tiếng Anh thông minh với sự hỗ trợ của công nghệ AI
          </p>
        </div>

        {/* Mission Section */}
        <Row className="align-items-center mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="position-relative" style={{ height: '400px' }}>
              <Image
                src="/ai_22_b.jpg"
                alt="Our Mission"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Col>
          <Col lg={6}>
            <h2 className="fw-bold mb-4">Sứ mệnh của chúng tôi</h2>
            <p className="lead mb-4">
              Chúng tôi tin rằng việc học ngôn ngữ nên được cá nhân hóa và hiệu quả. 
              Sứ mệnh của chúng tôi là giúp mọi người tiếp cận việc học tiếng Anh một cách 
              dễ dàng và hiệu quả thông qua công nghệ AI tiên tiến.
            </p>
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="text-primary mb-3">
                  <i className="display-5">🎯</i>
                </div>
                <h3 className="fw-bold h5">Học tập cá nhân hóa</h3>
                <p className="text-muted mb-0">
                  AI phân tích và điều chỉnh lộ trình học tập phù hợp với trình độ và mục tiêu của từng người.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="text-primary mb-3">
                  <i className="display-5">💡</i>
                </div>
                <h3 className="fw-bold h5">Công nghệ tiên tiến</h3>
                <p className="text-muted mb-0">
                  Ứng dụng công nghệ AI hiện đại để tạo ra trải nghiệm học tập tương tác và thú vị.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="text-primary mb-3">
                  <i className="display-5">🌟</i>
                </div>
                <h3 className="fw-bold h5">Hỗ trợ 24/7</h3>
                <p className="text-muted mb-0">
                  Trợ lý AI luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi trong quá trình học tập.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Stats Section */}
        <Row className="text-center g-4">
          <Col md={4}>
            <h2 className="fw-bold text-primary display-4">10K+</h2>
            <p className="text-muted">Người dùng hoạt động</p>
          </Col>
          <Col md={4}>
            <h2 className="fw-bold text-primary display-4">50K+</h2>
            <p className="text-muted">Bài học đã hoàn thành</p>
          </Col>
          <Col md={4}>
            <h2 className="fw-bold text-primary display-4">95%</h2>
            <p className="text-muted">Người dùng hài lòng</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
} 