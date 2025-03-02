'use client'

import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import Image from 'next/image';
import {User} from '../../types/auth';
// import { Display } from 'react-bootstrap-icons';


interface ProfileCardProps {
  profile: User;
  onUpdate: (data: User) => void;
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
              src="/kanna.jpg"
              //src={profile.avatar}


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
            <Button 
              variant="outline-primary" 
              onClick={() => setIsEditing(true)}
              style={{ display: "none" }}
            >
              Chỉnh sửa thông tin
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProfileCard; 