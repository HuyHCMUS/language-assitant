import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="py-5">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className={styles.title}>Về Chúng Tôi</h5>
            <p className={styles.description}>
              Chúng tôi cung cấp các giải pháp công nghệ tốt nhất cho doanh nghiệp của bạn.
              Với đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi cam kết mang đến sự hài lòng cho khách hàng.
            </p>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h5 className={styles.title}>Liên Kết</h5>
            <ul className={styles.links}>
              <li><a href="#">Trang chủ</a></li>
              <li><a href="#">Dịch vụ</a></li>
              <li><a href="#">Sản phẩm</a></li>
              <li><a href="#">Liên hệ</a></li>
            </ul>
          </Col>
          
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className={styles.title}>Liên Hệ</h5>
            <ul className={styles.links}>
              <li>Địa chỉ: 123 Đường ABC, TP.HCM</li>
              <li>Email: info@example.com</li>
              <li>Điện thoại: (84) 123-456-789</li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h5 className={styles.title}>Kết Nối</h5>
            <div className={styles.social}>
              <a href="#" className={styles.socialIcon}><FaFacebook /></a>
              <a href="#" className={styles.socialIcon}><FaTwitter /></a>
              <a href="#" className={styles.socialIcon}><FaInstagram /></a>
              <a href="#" className={styles.socialIcon}><FaLinkedin /></a>
            </div>
          </Col>
        </Row>
        
        <Row>
          <Col className={styles.copyright}>
            <hr />
            <p className="text-center mb-0">
              © {new Date().getFullYear()} Công ty của bạn. Tất cả quyền được bảo lưu.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 