import React from 'react';
import { Card } from 'react-bootstrap';
import { FaBook, FaCheckCircle, FaMicrophone } from 'react-icons/fa';

interface Activity {
  id: number;
  type: 'lesson' | 'quiz' | 'practice';
  title: string;
  date: string;
}

interface ActivityLogProps {
  activities: Activity[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ activities }) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'lesson':
        return <FaBook className="text-primary" />;
      case 'quiz':
        return <FaCheckCircle className="text-success" />;
      case 'practice':
        return <FaMicrophone className="text-warning" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-4">
        <h4 className="fw-bold mb-4">Hoạt động gần đây (Test thôi, chưa làm)</h4>
        <div className="d-flex flex-column gap-3">
          {activities.map((activity) => (
            <div key={activity.id} className="d-flex align-items-center gap-3">
              <div className="fs-4">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-grow-1">
                <div>{activity.title}</div>
                <small className="text-muted">
                  {formatDate(activity.date)}
                </small>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ActivityLog; 