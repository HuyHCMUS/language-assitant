//[type]/page.tsx
'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Alert, Spinner } from 'react-bootstrap';
import QuestionContainer from '@/components/practice/QuestionContainer';
import { practiceService } from '@/lib/api_practice';
import { Question, PracticeType } from '@/types/practice';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const PracticePage: React.FC = () => {
  const params = useParams();
  const practiceType = params.type as PracticeType;
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
    const { isLoggedIn, isLoading } = useAuth();
  
    useEffect(() => {
      if (!isLoading && !isLoggedIn) {
        router.push("/login");
      }
    }, [isLoggedIn, isLoading, router]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const data = await practiceService.getSampleQuestions(practiceType);
        console.log('data:', data);
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading questions:', error);
        setError('Failed to load practice questions. Please try again later.');
        setLoading(false);
      }
    };

    if (practiceType) {
      loadQuestions();
    }
  }, [practiceType]);

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
      <QuestionContainer questions={questions} practiceType={practiceType} />
    </Container>
  );
};

export default PracticePage;