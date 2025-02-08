'use client'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PracticeType } from '@/types/practice';
import Link from 'next/link';
import { Headphones, Mic, Book, Pencil, Shuffle, FileText } from 'react-bootstrap-icons';
import styles from './practice.module.css';

const practiceTypes: { type: PracticeType; title: string; icon: JSX.Element }[] = [
  { type: 'listening', title: 'Listening Practice', icon: <Headphones size={40} /> },
  { type: 'speaking', title: 'Speaking Practice', icon: <Mic size={40} /> },
  { type: 'reading', title: 'Reading Practice', icon: <Book size={40} /> },
  { type: 'writing', title: 'Writing Practice', icon: <Pencil size={40} /> },
  { type: 'random', title: 'Random Practice', icon: <Shuffle size={40} /> },
  { type: 'test', title: 'Test', icon: <FileText size={40} /> },
];

export default function PracticePage() {
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
