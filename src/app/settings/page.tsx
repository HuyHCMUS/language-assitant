'use client'

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SettingsForm from '@/components/settings/SettingsForm';
import NotificationSettings from '@/components/settings/NotificationSettings';

function SettingsPage() {
  const initialSettings = {
    displayLanguage: 'vi' as const,
    chatMode: 'bilingual' as const,
    dailyGoal: 20,
    soundEnabled: true,
    notifications: true
  };

  const notificationSettings = [
    {
      id: '1',
      type: 'Nhắc nhở học tập',
      description: 'Thông báo nhắc nhở khi đến giờ học',
      enabled: true
    },
    {
      id: '2',
      type: 'Cập nhật khóa học',
      description: 'Thông báo khi có bài học mới',
      enabled: true
    },
    {
      id: '3',
      type: 'Thành tích',
      description: 'Thông báo khi đạt được thành tích mới',
      enabled: true
    }
  ];

  return (
    <Container className="py-5">
      <Row className="g-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-4">Cài đặt chung</h4>
              <SettingsForm 
                initialSettings={initialSettings}
                onSave={(data) => console.log('Save settings:', data)}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <NotificationSettings 
                settings={notificationSettings}
                onSettingChange={(id, enabled) => console.log('Notification change:', id, enabled)}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SettingsPage; 