// app/practice/[type]/page.tsx
'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Container } from 'react-bootstrap';
import QuestionContainer from '../../../components/practice/QuestionContainer';
import { Question, PracticeType } from '@/types/practice';
import { getSampleQuestions } from '../../../utils/practiceUtils';


export default function PracticeSessionPage() {
  const params = useParams();
  const practiceType = params.type as PracticeType;
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    // In a real app, you would fetch questions from an API
    const loadedQuestions = getSampleQuestions(practiceType);
    console.log(loadedQuestions);
    setQuestions(loadedQuestions);
  }, [practiceType]);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestionIndex]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle practice session completion
      console.log('Practice session completed:', answers);
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="py-5">
      <QuestionContainer
        question={questions[currentQuestionIndex]}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onNext={handleNext}
        onAnswer={handleAnswer}
      />
    </Container>
  );
}