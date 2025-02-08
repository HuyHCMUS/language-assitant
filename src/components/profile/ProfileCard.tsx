'use client'

import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import Image from 'next/image';

interface Profile {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  bio: string;
  avatar: string;
}

interface ProfileCardProps {
  profile: Profile;
  onUpdate: (data: Profile) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-4">
        <div className="text-center mb-4">
          <div className="position-relative mx-auto" style={{ width: '120px', height: '120px' }}>
            <Image
              src={profile.avatar}
              alt="Profile"
              fill
              className="rounded-circle object-fit-cover"
            />
          </div>
          <h2 className="fw-bold mt-3 mb-1">{profile.name}</h2>
          <p className="text-muted">Học viên</p>
        </div>

        {isEditing ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Giới thiệu</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary" className="flex-grow-1">
                Lưu thay đổi
              </Button>
              <Button variant="outline-secondary" onClick={() => setIsEditing(false)}>
                Hủy
              </Button>
            </div>
          </Form>
        ) : (
          <>
            <div className="mb-4">
              <h6 className="text-muted mb-2">Thông tin cá nhân</h6>
              <div className="mb-2">
                <small className="text-muted d-block">Email:</small>
                <div>{profile.email}</div>
              </div>
              <div className="mb-2">
                <small className="text-muted d-block">Số điện thoại:</small>
                <div>{profile.phone}</div>
              </div>
              <div className="mb-2">
                <small className="text-muted d-block">Ngày sinh:</small>
                <div>{new Date(profile.birthDate).toLocaleDateString('vi-VN')}</div>
              </div>
              <div>
                <small className="text-muted d-block">Giới thiệu:</small>
                <div>{profile.bio}</div>
              </div>
            </div>
            <Button variant="outline-primary" onClick={() => setIsEditing(true)}>
              Chỉnh sửa thông tin
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProfileCard; 