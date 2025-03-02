'use client'
import { useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import ChatWindow from '../../components/chat/ChatWindow';
import ChatInput from '../../components/chat/ChatInput';
import SuggestionBox from '../../components/chat/SuggestionBox';
import { Message } from '@/types/chat';
import styles from './Chat.module.css';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { chatService } from '@/lib/apic_chat';

export default function ChatPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();
  // Di chuyển tất cả useState lên trên cùng
  const [messages, setMessages] = useState<Message[]>([]);
  const [botSuggestions, setBotSuggestions] = useState<string[]>([]);

  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      content: content,
      sender: 'user',
      created_at: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    const bot_response = await chatService.getResponseMessage(userMessage);
    console.log(bot_response)
    const bot_messages = bot_response.messages
    const error_dection = bot_response.error
    if (error_dection != null){
      setIsBotTyping(true);
        setTimeout(() => {
          const botMessage: Message = {
            content: 'Corrected sentence: ' + error_dection.corrected_sentence,
            sender: 'bot',
            created_at: new Date(),
          };
          setMessages(prev => [...prev, botMessage]);
          setIsBotTyping(false);
        }, 1500);
      }
    for(let i=0; i< bot_messages.length; i++)
    {
      setIsBotTyping(true);
      setTimeout(() => {
        const botMessage: Message = {
          content: bot_messages[i],
          sender: 'bot',
          created_at: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
        setIsBotTyping(false);
      }, 1500);
    }
    setBotSuggestions(bot_response.suggestions)
  };

  // Render loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render null khi chưa login
  if (!isLoggedIn) {
    return null;
  }

  // Main render
  return (
    <Container className={styles.chatContainer}>
      <div className={styles.chatWrapper}>
        <ChatWindow 
          messages={messages} 
          isBotTyping={isBotTyping} 
        />
        <SuggestionBox onSuggestionSelect={handleSendMessage} suggestion= {botSuggestions}/>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </Container>
  );
}