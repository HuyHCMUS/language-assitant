'use client'

import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';

interface ProgressData {
  totalWords: number;
  learnedWords: number;
  masteredWords: number;
  streak: number;
}

interface ProgressChartProps {
  data: ProgressData;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const learnedPercentage = (data.learnedWords / data.totalWords) * 100;
  const masteredPercentage = (data.masteredWords / data.totalWords) * 100;

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-4">
        <h4 className="fw-bold mb-4">Tiến độ học tập</h4>
        
        <div className="mb-4">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Từ đã học</span>
            <span className="text-primary">
              {data.learnedWords}/{data.totalWords}
            </span>
          </div>
          <ProgressBar 
            now={learnedPercentage} 
            variant="primary"
          />
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Từ đã thành thạo</span>
            <span className="text-success">
              {data.masteredWords}/{data.totalWords}
            </span>
          </div>
          <ProgressBar 
            now={masteredPercentage} 
            variant="success"
          />
        </div>

        <div className="text-center mt-4">
          <span className="fs-4 me-2">🔥</span>
          <span className="fs-5 fw-medium">
            {data.streak} ngày liên tiếp
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProgressChart; 