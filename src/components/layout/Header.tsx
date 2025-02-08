'use client'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaUserCircle, FaBell } from 'react-icons/fa';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <Navbar expand="lg" className="py-3 bg-white shadow-sm sticky-top">
      <Container>
        <Link href="/" className="navbar-brand fw-bold text-primary">
          English Assistant
        </Link>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/chatbot" className={`nav-link ${pathname === '/chatbot' ? 'active' : ''}`}>
              Chatbot
            </Link>
            <Link href="/vocabulary" className={`nav-link ${pathname === '/vocabulary' ? 'active' : ''}`}>
              Từ vựng
            </Link>
            <NavDropdown title="Luyện tập" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} href="/practice/listening">
                Nghe
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/practice/speaking">
                Nói
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/practice/reading">
                Đọc
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/practice/writing">
                Viết
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} href="/practice/test">
                Kiểm tra
              </NavDropdown.Item>
            </NavDropdown>
            <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>
              Giới thiệu
            </Link>
          </Nav>

          <Nav className="gap-2 align-items-center">
            {isLoggedIn ? (
              <>
                <Nav.Link href="#" className="position-relative">
                  <FaBell className="fs-5" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3
                  </span>
                </Nav.Link>
                
                <NavDropdown 
                  title={
                    <div className="d-inline-block position-relative" style={{ width: '35px', height: '35px' }}>
                      <Image
                        src="/images/avatars/default-avatar.png"
                        alt="User Avatar"
                        fill
                        className="rounded-circle object-fit-cover"
                      />
                    </div>
                  }
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} href="/profile">
                    <FaUserCircle className="me-2" /> Hồ sơ
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} href="/settings">
                    Cài đặt
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Đăng xuất
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Link href="/login" className="text-decoration-none">
                  <Button variant="outline-primary">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/register" className="text-decoration-none">
                  <Button variant="primary">
                    Đăng ký
                  </Button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
} 