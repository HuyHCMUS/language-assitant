// components/practice/MultipleChoiceQuestion.tsx
import { useState } from 'react';
import { Question } from '@/types/practice';
import { Button } from 'react-bootstrap';
import styles from './MultipleChoiceQuestion.module.css';

interface MultipleChoiceQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

export default function MultipleChoiceQuestion({
  question,
  onAnswer,
}: MultipleChoiceQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      onAnswer(answer);
    }
  };

  return (
    <div className={styles.questionWrapper}>
      <h3 className={styles.questionText}>{question.question}</h3>
      <div className={styles.optionsContainer}>
        {question.options?.map((option, index) => (
          <Button
            key={index}
            variant={
              selectedAnswer === option
                ? isCorrect
                  ? 'success'
                  : 'danger'
                : 'outline-primary'
            }
            className={styles.optionButton}
            onClick={() => handleAnswerSelect(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}