// app/practice/page.tsx
'use client'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PracticeType } from '@/types/practice';
import Link from 'next/link';
import styles from './practice.module.css';


const practiceTypes: { type: PracticeType; title: string; icon: string }[] = [
  { type: 'listening', title: 'Listening Practice', icon: '🎧' },
  { type: 'speaking', title: 'Speaking Practice', icon: '🎤' },
  { type: 'reading', title: 'Reading Practice', icon: '📖' },
  { type: 'writing', title: 'Writing Practice', icon: '✍️' },
  { type: 'random', title: 'Random Practice', icon: '🎲' },
  { type: 'test', title: 'Test', icon: '📝' },
];

export default function PracticePage() {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Practice Your Skills</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {practiceTypes.map(({ type, title, icon }) => (
          <Col key={type}>
            <Link href={`/practice/${type}`} className={styles.practiceLink}>
              <Card className={styles.practiceCard}>
                <Card.Body className="text-center">
                  <div className={styles.practiceIcon}>{icon}</div>
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