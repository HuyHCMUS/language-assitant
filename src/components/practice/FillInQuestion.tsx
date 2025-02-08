// components/practice/FillInQuestion.tsx
import { useState } from 'react';
import { Question } from '@/types/practice';
import { Form, Button } from 'react-bootstrap';
import styles from './FillInQuestion.module.css';

interface FillInQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

export default function FillInQuestion({
  question,
  onAnswer,
}: FillInQuestionProps) {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnswer(answer);
  };

  return (
    <div className={styles.questionWrapper}>
      <h3 className={styles.questionText}>{question.question}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here"
          />
        </Form.Group>
        <div className={styles.buttonGroup}>
          <Button
            variant="outline-secondary"
            onClick={() => setShowHint(true)}
          >
            Hint
          </Button>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </Form>
      {showHint && (
        <div className={styles.hint}>
          Hint: {question.hint}
        </div>
      )}
    </div>
  );
}