'use client'

import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

interface SettingsFormProps {
  onSave: (settings: UserSettings) => void
  initialSettings: UserSettings
}

interface UserSettings {
  displayLanguage: 'vi' | 'en'
  chatMode: 'immersive' | 'bilingual'
  dailyGoal: number
  notifications?: boolean
  soundEnabled: boolean
}

const SettingsForm: React.FC<SettingsFormProps> = ({ onSave, initialSettings }) => {
  const [settings, setSettings] = useState<UserSettings>(initialSettings)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(settings)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Ngôn ngữ hiển thị</Form.Label>
        <Form.Select
          value={settings.displayLanguage}
          onChange={(e) => setSettings({ ...settings, displayLanguage: e.target.value as 'vi' | 'en' })}
        >
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Chế độ trò chuyện</Form.Label>
        <Form.Select
          value={settings.chatMode}
          onChange={(e) => setSettings({ ...settings, chatMode: e.target.value as 'immersive' | 'bilingual' })}
        >
          <option value="immersive">Immersive (Chỉ tiếng Anh)</option>
          <option value="bilingual">Bilingual (Song ngữ)</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mục tiêu hàng ngày (số từ)</Form.Label>
        <Form.Control
          type="number"
          value={settings.dailyGoal}
          onChange={(e) => setSettings({ ...settings, dailyGoal: parseInt(e.target.value) })}
          min={1}
          max={100}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Check
          type="switch"
          id="sound-switch"
          label="Bật âm thanh"
          checked={settings.soundEnabled}
          onChange={(e) => setSettings({ ...settings, soundEnabled: e.target.checked })}
        />
      </Form.Group>

      <div className="d-grid">
        <Button type="submit" variant="primary">
          Lưu cài đặt
        </Button>
      </div>
    </Form>
  )
}

export default SettingsForm 