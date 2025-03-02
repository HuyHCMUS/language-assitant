// components/chat/SuggestionBox.tsx
import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import styles from './SuggestionBox.module.css';
// import { chatService } from "@/lib/apic_chat";
// import type { SuggestionResponse } from "@/types/chat";



interface SuggestionBoxProps {
  suggestion: string[],
  onSuggestionSelect: (suggestion: string) => void;
}

// components/chat/SuggestionBox.tsx (tiếp tục)
export default function SuggestionBox({ onSuggestionSelect,suggestion }: SuggestionBoxProps) {
    const [currentSuggestion, setCurrentSuggestion] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const loadSuggestions = async () => {
      try {
            console.log('data suggestion:', suggestion);
            setSuggestions(suggestion);
            setCurrentSuggestion(suggestion[0]);
          } catch (error) {
            console.error('Error loading lists:', error);
            // You might want to show an error message to the user here
          }
        ;
        }
    useEffect(() => {
      if (!suggestion) return;
      loadSuggestions();
    }, [suggestion]);
  
    const getNextSuggestion = () => {
      if (suggestions.length === 0) return;
      const currentIndex = suggestions.indexOf(currentSuggestion);
      const nextIndex = (currentIndex + 1) % suggestions.length;
      setCurrentSuggestion(suggestions[nextIndex]);
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