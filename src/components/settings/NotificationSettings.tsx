'use client'

import React from 'react';
import { Form } from 'react-bootstrap';

interface NotificationSetting {
  id: string;
  type: string;
  description: string;
  enabled: boolean;
}

interface NotificationSettingsProps {
  settings: NotificationSetting[];
  onSettingChange: (id: string, enabled: boolean) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  settings,
  onSettingChange
}) => {
  return (
    <>
      <h4 className="fw-bold mb-4">Cài đặt thông báo</h4>
      <div className="d-flex flex-column gap-4">
        {settings.map((setting) => (
          <div key={setting.id}>
            <Form.Check
              type="switch"
              id={`notification-${setting.id}`}
              label={setting.type}
              checked={setting.enabled}
              onChange={(e) => onSettingChange(setting.id, e.target.checked)}
            />
            <small className="text-muted d-block mt-1">
              {setting.description}
            </small>
          </div>
        ))}
      </div>
    </>
  );
};

export default NotificationSettings; 