'use client'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PracticeType } from '@/types/practice';
import { Headphones, Mic, Book, Pencil, FileText, Chat } from 'react-bootstrap-icons';
import styles from './practice.module.css';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Form, Button } from 'react-bootstrap';

const practiceTypes: { type: PracticeType; title: string; icon: React.ReactNode }[] = [
  { type: 'vocabulary', title: 'Vocabulary', icon: <FileText size={40} /> },
  { type: 'conversation', title: 'Conversation Practice', icon: <Chat size={40} /> },
  { type: 'listening', title: 'Listening Practice', icon: <Headphones size={40} /> },
  { type: 'speaking', title: 'Speaking Practice', icon: <Mic size={40} /> },
  { type: 'reading', title: 'Reading Practice', icon: <Book size={40} /> },
  { type: 'writing', title: 'Writing Practice', icon: <Pencil size={40} /> },
  // { type: 'random', title: 'Random Practice', icon: <Shuffle size={40} /> },
  // { type: 'test', title: 'Test', icon: <FileText size={40} /> },
];

const topics = [
  'Travel', 'Food', 'Technology', 'Health', 'Education', 
  'Sports', 'Entertainment', 'Science', 'Business', 'Art'
];

export default function PracticePage() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();
  const [selectedType, setSelectedType] = useState<PracticeType | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');

  const handleTypeSelect = (type: PracticeType) => {
    setSelectedType(type);
  };

  const handleTopicSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(event.target.value);
  };

  const handleCustomTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTopic(event.target.value);
  };

  const handleStartPractice = () => {
    const topic = customTopic || selectedTopic;
    if (selectedType && topic) {
      router.push(`/practice/${selectedType}?topic=${encodeURIComponent(topic)}`);
    }
  };

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>; // hoặc return một loading spinner component
  }

  if (!isLoggedIn) {
    return null;
  }
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Practice Your Skills</h1>
      {!selectedType ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {practiceTypes.map(({ type, title, icon }) => (
            <Col key={type}>
              <div onClick={() => handleTypeSelect(type)} className={styles.practiceLink}>
                <Card className="text-center p-4">
                  <Card.Body>
                    <div className="mb-3">{icon}</div>
                    <Card.Title>{title}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <div>
          <Form.Group controlId="topicSelect">
            <Form.Label>Select a Topic</Form.Label>
            <Form.Select value={selectedTopic} onChange={handleTopicSelect}>
              <option value="">Choose a topic...</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="customTopic" className="mt-3">
            <Form.Label>Or enter a custom topic</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter custom topic" 
              value={customTopic} 
              onChange={handleCustomTopicChange} 
            />
          </Form.Group>
          <Button className="mt-3" onClick={handleStartPractice}>Start Practice</Button>
        </div>
      )}
    </Container>
  );
}
