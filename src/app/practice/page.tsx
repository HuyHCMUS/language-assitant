'use client'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PracticeType } from '@/types/practice';
import Link from 'next/link';
import { Headphones, Mic, Book, Pencil, FileText, Chat } from 'react-bootstrap-icons';
import styles from './practice.module.css';

import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';


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

export default function PracticePage() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();

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
      <Row xs={1} md={2} lg={3} className="g-4">
        {practiceTypes.map(({ type, title, icon }) => (
          <Col key={type}>
            <Link href={`/practice/${type}`} className={styles.practiceLink}>
              <Card className="text-center p-4">
                <Card.Body>
                  <div className="mb-3">{icon}</div>
                  <Card.Title>{title}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
