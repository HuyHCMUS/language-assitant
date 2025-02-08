import React from 'react'
import Image from 'next/image'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { FaQuoteLeft } from 'react-icons/fa'

interface Testimonial {
  id: string
  content: string
  author: {
    name: string
    role: string
    avatar: string
  }
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    content: 'Trợ lý AI giúp tôi tự tin hơn trong giao tiếp tiếng Anh. Các bài tập và tính năng luyện tập rất hiệu quả. Tôi đã cải thiện đáng kể khả năng nói và nghe của mình.',
    author: {
      name: 'Nguyễn Văn A',
      role: 'Sinh viên Đại học',
      avatar: '/vmpovg.png'
    }
  },
  {
    id: '2',
    content: 'Ứng dụng rất thông minh và dễ sử dụng. Tôi đặc biệt thích tính năng lưu từ vựng và ôn tập tự động. Giờ đây việc học tiếng Anh trở nên thú vị hơn rất nhiều.',
    author: {
      name: 'Trần Thị B',
      role: 'Chuyên viên Marketing',
      avatar: '/thumb-350-375590.webp'
    }
  },
  {
    id: '3',
    content: 'Phương pháp học tập cá nhân hóa giúp tôi tiến bộ nhanh chóng. Giao diện đẹp và trải nghiệm người dùng tuyệt vời. Tôi đã giới thiệu ứng dụng này cho nhiều bạn bè.',
    author: {
      name: 'Lê Văn C',
      role: 'Freelancer',
      avatar: '/kanna.jpg'
    }
  }
]

const Testimonials: React.FC = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <span className="bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold small">
            TESTIMONIALS
          </span>
          <h2 className="mt-3 mb-2 fw-bold display-6">Người dùng nói gì về chúng tôi</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Khám phá trải nghiệm học tập của những người đã sử dụng English Assistant
          </p>
        </div>

        <Row className="g-4">
          {testimonials.map((testimonial) => (
            <Col key={testimonial.id} md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-primary opacity-50 mb-3">
                    <FaQuoteLeft size={24} />
                  </div>
                  
                  <Card.Text className="mb-4 text-secondary">
                    {testimonial.content}
                  </Card.Text>
                  
                  <div className="d-flex align-items-center">
                    <div className="position-relative" style={{ width: '48px', height: '48px' }}>
                      <Image
                        src={testimonial.author.avatar}
                        alt={testimonial.author.name}
                        fill
                        className="rounded-circle object-fit-cover"
                      />
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-1 fw-bold">{testimonial.author.name}</h6>
                      <p className="mb-0 text-muted small">{testimonial.author.role}</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Testimonials 