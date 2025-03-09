//[type]/page.tsx
'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Container, Alert, Spinner } from 'react-bootstrap';
import QuestionContainer from '@/components/practice/QuestionContainer';
import { practiceService } from '@/lib/api_practice';
import { Question, PracticeType } from '@/types/practice';

// import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const PracticePage: React.FC = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const practiceType = params.type as PracticeType;
  const topic = searchParams.get('topic');
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();

  const loadQuestions = async () => {
    if (!practiceType || !topic) {
      setError('Missing practice type or topic');
      return;
    }

    try {
      const data = await practiceService.getSampleQuestions(practiceType, topic);
      return data;
    } catch (error) {
      console.error('Error loading questions:', error);
      setError('Failed to load practice questions. Please try again later.');
      return null;
    }
  };

  // Load câu hỏi ban đầu
  useEffect(() => {
    const initializeQuestions = async () => {
      setLoading(true);
      const initialData = await loadQuestions();
      if (initialData) {
        setQuestions(initialData);
      }
      setLoading(false);
    };

    initializeQuestions();
  }, [practiceType, topic]);

  // Hàm xử lý load thêm câu hỏi
  const handleLoadMore = async () => {
    try {
      const newData = await loadQuestions();
      if (newData) {
        setQuestions(prevQuestions => [...prevQuestions, ...newData]);
      }
    } catch (error) {
      console.error('Error loading more questions:', error);
    }
  };

  const getPracticeTitle = () => {
    switch (practiceType) {
      case 'listening':
        return 'Listening Practice';
      case 'speaking':
        return 'Speaking Practice';
      case 'reading':
        return 'Reading Practice';
      case 'writing':
        return 'Writing Practice';
      case 'vocabulary':
        return 'Vocabulary Practice';
      case 'conversation':
        return 'Conversation Practice';
      default:
        return 'Practice Session';
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading practice questions...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (questions.length === 0) {
    return (
      <Container className="my-5">
        <Alert variant="info">
          No practice questions available for {practiceType}. Please try another practice type.
        </Alert>
      </Container>
    );
  }
  if (isLoading) {
    return <div>Loading...</div>; // hoặc return một loading spinner component
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">{getPracticeTitle()}</h1>
      <QuestionContainer 
        questions={questions} 
        practiceType={practiceType} 
        onLoadMore={handleLoadMore}
      />
    </Container>
  );
};

export default PracticePage;



