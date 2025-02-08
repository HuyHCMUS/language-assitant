// components/chat/SuggestionBox.tsx
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from './SuggestionBox.module.css';

const sampleSuggestions = [
  "How are you today?",
  "Can you help me practice English?",
  "What's the weather like?",
  "Tell me about yourself",
];

interface SuggestionBoxProps {
  onSuggestionSelect: (suggestion: string) => void;
}

// components/chat/SuggestionBox.tsx (tiếp tục)
export default function SuggestionBox({ onSuggestionSelect }: SuggestionBoxProps) {
    const [currentSuggestion, setCurrentSuggestion] = useState(sampleSuggestions[0]);
  
    const getNextSuggestion = () => {
      const currentIndex = sampleSuggestions.indexOf(currentSuggestion);
      const nextIndex = (currentIndex + 1) % sampleSuggestions.length;
      setCurrentSuggestion(sampleSuggestions[nextIndex]);
    };
  
    return (
      <div className={styles.suggestionBox}>
        <Button
          variant="outline-secondary"
          className={styles.suggestionText}
          onClick={() => onSuggestionSelect(currentSuggestion)}
        >
          💡 {currentSuggestion}
        </Button>
        <Button
          variant="link"
          className={styles.nextButton}
          onClick={getNextSuggestion}
        >
          Next suggestion →
        </Button>
      </div>
    );
  }