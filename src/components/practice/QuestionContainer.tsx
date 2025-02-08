// components/practice/QuestionContainer.tsx
import { Question } from '@/types/practice';
import { Card, Button, ProgressBar } from 'react-bootstrap';
import styles from './QuestionContainer.module.css';
import FillInQuestion from './FillInQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import SpeakingQuestion from './SpeakingQuestion';
interface QuestionContainerProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  onNext: () => void;
  onAnswer: (answer: string) => void;
}

export default function QuestionContainer({
  question,
  currentQuestion,
  totalQuestions,
  onNext,
  onAnswer,
}: QuestionContainerProps) {
  return (
    <div className={styles.questionContainer}>
      <ProgressBar
        now={(currentQuestion / totalQuestions) * 100}
        className="mb-4"
      />
      <Card>
        <Card.Body>
          <div className={styles.questionNumber}>
            Question {currentQuestion}/{totalQuestions}
          </div>
          {question.type === 'multiple-choice' ? (
            <MultipleChoiceQuestion question={question} onAnswer={onAnswer} />
          ) : question.type === 'fill-in' ? (
            <FillInQuestion question={question} onAnswer={onAnswer} />
          ) : (
            <SpeakingQuestion question={question} onAnswer={onAnswer} />
          )}
          <Button
            variant="primary"
            className="mt-4"
            onClick={onNext}
          >
            Next
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}   