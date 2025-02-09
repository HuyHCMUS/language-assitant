// components/chat/ChatInput.tsx
import { useState, useRef } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Mic, Send } from 'react-bootstrap-icons';
import styles from './ChatInput.module.css';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = async ()=>{//event) => {
        // Here you would typically send the audio to a speech-to-text service
        // For now, we'll just simulate it
        setMessage('This is a simulated voice message');
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.chatInputForm}>
      <InputGroup>
        <Form.Control
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <Button
          variant="outline-secondary"
          onClick={isRecording ? stopRecording : startRecording}
        >
          <Mic color={isRecording ? 'red' : 'currentColor'} />
        </Button>
        <Button type="submit" variant="primary">
          <Send />
        </Button>
      </InputGroup>
    </Form>
  );
}