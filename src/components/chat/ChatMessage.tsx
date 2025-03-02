// components/chat/ChatMessage.tsx
import { Message } from '@/types/chat';
import { VolumeUp } from 'react-bootstrap-icons';
import { speakText } from '@/utils/speechUtils';
import styles from './ChatMessage.module.css';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const highlightText = (text: string, words: string[] = []) => {
    let result = text;
    words.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      result = result.replace(regex, `<span class="${styles.highlight}">$1</span>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className={`${styles.message} ${styles[message.sender]}`}>
      <div className={styles.messageContent}>
        {message.highlightedWords 
          ? highlightText(message.content, message.highlightedWords)
          : message.content}
        {message.sender === 'bot' && (
          <button
            className={styles.speakButton}
            onClick={() => speakText(message.content)}
          >
            <VolumeUp size={16} />
          </button>
        )}
      </div>
      {/* <div className={styles.timestamp}>
      {message.created_at
      ? message.created_at.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : 'N/A'}
      </div> */}
    </div>
  );
}