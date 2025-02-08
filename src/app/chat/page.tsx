// app/chat/page.tsx
'use client'
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import ChatWindow from '../../components/chat/ChatWindow';
import ChatInput from '../../components/chat/ChatInput';
import SuggestionBox from '../../components/chat/SuggestionBox';
import { Message } from '@/types/chat';
import styles from './Chat.module.css';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate bot typing
    setIsBotTyping(true);
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Đã nhận',
        sender: 'bot',
        timestamp: new Date(),
        highlightedWords: ['nhận']
      };
      setMessages(prev => [...prev, botMessage]);
      setIsBotTyping(false);
    }, 1500);
  };

  return (
    <Container className={styles.chatContainer}>
      <div className={styles.chatWrapper}>
        <ChatWindow 
          messages={messages} 
          isBotTyping={isBotTyping} 
        />
        <SuggestionBox onSuggestionSelect={handleSendMessage} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </Container>
  );
}