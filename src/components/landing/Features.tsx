import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { BsChatDots, BsBook, BsAward, BsPerson } from 'react-icons/bs';

const Features = () => {
  return (
    <div>
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold small">
              FEATURES
            </span>
            <h2 className="mt-3 mb-2 fw-bold display-6">Tính năng chính</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Khám phá các tính năng độc đáo giúp việc học tiếng Anh trở nên hiệu quả
            </p>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-6">
              <Link href="/chatbot" className="text-decoration-none">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="text-primary opacity-50 mb-3 d-flex align-items-center">
                      <BsChatDots size={24} className="me-2" />
                      <h5 className="mb-0 fw-bold">Chatbot</h5>
                    </div>
                    <Card.Text className="mb-0 text-secondary">
                      Trò chuyện tiếng Anh tự nhiên, sửa lỗi ngữ pháp và dịch thuật
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>

            <div className="col-12 col-md-6">
              <Link href="/vocabulary" className="text-decoration-none">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="text-primary opacity-50 mb-3 d-flex align-items-center">
                      <BsBook size={24} className="me-2" />
                      <h5 className="mb-0 fw-bold">Từ vựng</h5>
                    </div>
                    <Card.Text className="mb-0 text-secondary">
                      Quản lý từ vựng và bài tập luyện tập đa dạng
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>

            <div className="col-12 col-md-6">
            <Link href="/practice" className="text-decoration-none">  
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-primary opacity-50 mb-3 d-flex align-items-center">
                    <BsAward size={24} className="me-2" />
                    <h5 className="mb-0 fw-bold">Bài tập</h5>
                  </div>
                  <Card.Text className="mb-0 text-secondary">
                    Luyện tập với các bài tập tương tác và trắc nghiệm
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
            </div>


            <div className="col-12 col-md-6">
              <Link href="/profile" className="text-decoration-none">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="text-primary opacity-50 mb-3 d-flex align-items-center">
                      <BsPerson size={24} className="me-2" />
                      <h5 className="mb-0 fw-bold">Hồ sơ</h5>
                    </div>
                    <Card.Text className="mb-0 text-secondary">
                      Theo dõi tiến trình học tập và tùy chỉnh cài đặt cá nhân
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-semibold small">
              WHY US
            </span>
            <h2 className="mt-3 mb-2 fw-bold display-6">Tại sao nên chọn chúng tôi?</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Khám phá những lý do khiến chúng tôi trở thành lựa chọn tốt nhất cho việc học tiếng Anh
            </p>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-primary opacity-50 mb-3 text-center">
                    <div className="display-4 mb-2">🤖</div>
                    <h5 className="mb-0 fw-bold">AI Thông Minh</h5>
                  </div>
                  <Card.Text className="mb-0 text-secondary text-center">
                    Công nghệ AI tiên tiến giúp bạn học hiệu quả hơn
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-12 col-md-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-primary opacity-50 mb-3 text-center">
                    <div className="display-4 mb-2">📚</div>
                    <h5 className="mb-0 fw-bold">Nội Dung Phong Phú</h5>
                  </div>
                  <Card.Text className="mb-0 text-secondary text-center">
                    Đa dạng bài học và bài tập cho mọi trình độ
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-12 col-md-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-primary opacity-50 mb-3 text-center">
                    <div className="display-4 mb-2">📈</div>
                    <h5 className="mb-0 fw-bold">Theo Dõi Tiến Trình</h5>
                  </div>
                  <Card.Text className="mb-0 text-secondary text-center">
                    Dễ dàng theo dõi và đánh giá sự tiến bộ của bạn
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
