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
            VỀ MÌNH NÈ
          </span>
          <h1 className="display-5 fw-bold mt-4 mb-3">Eng Buddy 🤪</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            Ứng dụng học tiếng Anh siêu xịn xò do dân FA code ra vì quá rảnh 🙄
          </p>
        </div>

        {/* Mission Section */}
        <Row className="align-items-center mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="position-relative" style={{ height: '350px' }}>
              <Image
                src="/kanna.jpg"
                alt="Ảnh chế AI"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Col>
          <Col lg={6}>
            <h2 className="fw-bold mb-4">Lý do ra đời</h2>
            <p className="lead mb-4">
              Thực ra, tụi mình làm app này vì thấy ChatGPT được thổi phồng quá trời.
              Kiểu `&quot;`AI này, AI nọ`&quot;` nhưng cuối cùng nó vẫn không thể giúp bạn không bị friendzone. 
              Nên bọn mình quyết định làm một app nhỏ nhỏ xinh xinh để... cũng chẳng giúp được gì 
              nhưng ít ra bạn nói tiếng Anh ngầu hơn xíu! 😎
            </p>
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="text-primary mb-3">
                  <i className="display-5">🤯</i>
                </div>
                <h3 className="fw-bold h5">Học mà không buồn ngủ</h3>
                <p className="text-muted mb-0">
                  App có tính năng phát âm thanh báo thức nếu phát hiện bạn ngáp quá 3 lần. Không tin thì thử đi!
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="text-primary mb-3">
                  <i className="display-5">🤖</i>
                </div>
                <h3 className="fw-bold h5">`&quot;`AI`&quot;` cực mạnh</h3>
                <p className="text-muted mb-0">
                  AI của chúng tôi là `&quot;`Actually Idiotic`&quot;` - trả lời sai tè le nhưng ít ra làm bạn cười và nhớ dai!
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="text-primary mb-3">
                  <i className="display-5">🧠</i>
                </div>
                <h3 className="fw-bold h5">Hỗ trợ 24/7*</h3>
                <p className="text-muted mb-0">
                  * Điều kiện áp dụng: 24 phút/7 ngày, sau đó app sẽ giả vờ crash để được nghỉ ngơi.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Stats Section */}
        <Row className="text-center g-4">
          <Col md={4}>
            <h2 className="fw-bold text-primary display-4">5</h2>
            <p className="text-muted">Người dùng (kể cả mẹ tui)</p>
          </Col>
          <Col md={4}>
            <h2 className="fw-bold text-primary display-4">3.5</h2>
            <p className="text-muted">Bài học được hoàn thành (nửa kia bỏ dở)</p>
          </Col>
          <Col md={4}>
            <h2 className="fw-bold text-primary display-4">69%</h2>
            <p className="text-muted">Tỉ lệ người dùng ngủ gật khi học</p>
          </Col>
        </Row>

        {/* Disclaimer */}
        <div className="bg-light p-4 rounded-3 mt-5 text-center">
          <p className="mb-0 fst-italic">
            Học với Eng Buddy, 3 tháng sau bạn sẽ nói tiếng Anh... vẫn y như trước nhưng ít ra đã cười nhiều hơn! 
            App nhà nghèo, code bằng nước mắt và mì gói, nhưng tình yêu thì vô bờ bến! 
            Không dùng app là tiếc cả đời, mà dùng rồi thì... cũng tiếc luôn! 🤣
          </p>
        </div>
      </Container>
    </div>
  );
}