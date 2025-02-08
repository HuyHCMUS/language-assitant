// components/practice/SpeakingQuestion.tsx
import { useState, useRef } from 'react';
import { Question } from '@/types/practice';
import { Button } from 'react-bootstrap';
import styles from './SpeakingQuestion.module.css';

interface SpeakingQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

export default function SpeakingQuestion({
  question,
  onAnswer,
}: SpeakingQuestionProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        onAnswer(url); // You might want to handle the audio blob differently
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
    <div className={styles.questionWrapper}>
      <h3 className={styles.questionText}>{question.question}</h3>
      <div className={styles.recordingControls}>
        <Button
          variant={isRecording ? 'danger' : 'primary'}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
        {audioURL && (
          <audio className={styles.audioPlayer} controls src={audioURL} />
        )}
      </div>
    </div>
  );
}