// components/chat/ChatWindow.tsx
//import { forwardRef } from 'react';
import { Message } from '@/types/chat';
import ChatMessage from './ChatMessage';
import styles from './ChatWindow.module.css';


interface ChatWindowProps {
  messages: Message[];
  isBotTyping: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isBotTyping }) => {
  return (
    <div className={styles.chatWindow}>
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {isBotTyping && (
        <div className={styles.typingIndicator}>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;

