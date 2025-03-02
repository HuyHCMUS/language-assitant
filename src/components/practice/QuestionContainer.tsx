import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card, Alert, ProgressBar } from 'react-bootstrap';
import { Question, PracticeType } from '@/types/practice';
import ReactMarkdown from "react-markdown";


interface QuestionContainerProps {
  questions: Question[];
  practiceType: PracticeType;
}

const QuestionContainer: React.FC<QuestionContainerProps> = ({ questions, practiceType }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  
  // Group questions by parent
  const [parentQuestions, setParentQuestions] = useState<Question[]>([]);
  const [childQuestions, setChildQuestions] = useState<Question[][]>([]);
  const [currentParentIndex, setCurrentParentIndex] = useState(0);
  const [currentChildIndex, setCurrentChildIndex] = useState(0);
  const [isReadingLayout, setIsReadingLayout] = useState(false);

  const organizeReadingQuestions = () => {
    // Find all parent questions (those with no parent_id)
    const parents: Question[] = questions.filter(q => !q.parent_id);
    
    // Group child questions by parent_id
    const children: Question[][] = parents.map(parent => 
      questions.filter(q => q.parent_id === parent.question_id)
    );

    setParentQuestions(parents);
    setChildQuestions(children);
    setIsReadingLayout(parents.length > 0 && children.some(group => group.length > 0));
    
    // Start with the first parent and its first child
    if (parents.length > 0) {
      setCurrentParentIndex(0);
      setCurrentChildIndex(0);
    }
  };
  useEffect(() => {
    if (practiceType === 'reading') {
      organizeReadingQuestions();
    }
  }, [practiceType, questions]);

  

  // Get current question based on layout type
  const getCurrentQuestion = () => {
    if (isReadingLayout) {
      if (childQuestions[currentParentIndex] && childQuestions[currentParentIndex][currentChildIndex]) {
        return childQuestions[currentParentIndex][currentChildIndex];
      }
      return parentQuestions[currentParentIndex]; // Fallback to parent if no child
    }
    return questions[currentQuestionIndex];
  };

  const currentQuestion = getCurrentQuestion();
  
  const handlePrevious = () => {
    if (isReadingLayout) {
      if (currentChildIndex > 0) {
        setCurrentChildIndex(currentChildIndex - 1);
      } else if (currentParentIndex > 0) {
        // Move to the previous parent's last child
        setCurrentParentIndex(currentParentIndex - 1);
        setCurrentChildIndex(childQuestions[currentParentIndex - 1].length - 1);
      }
    } else {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    }
    resetQuestionState();
  };

  const handleNext = () => {
    if (isReadingLayout) {
      if (currentChildIndex < childQuestions[currentParentIndex].length - 1) {
        // Move to next child of the same parent
        setCurrentChildIndex(currentChildIndex + 1);
      } else if (currentParentIndex < parentQuestions.length - 1) {
        // Move to the next parent's first child
        setCurrentParentIndex(currentParentIndex + 1);
        setCurrentChildIndex(0);
      }
    } else {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
    resetQuestionState();
  };

  const resetQuestionState = () => {
    setShowHint(false);
    setUserAnswer('');
    setShowAnswer(false);
    setSelectedOptions([]);
    setAudioBlob(null);
    setIsRecording(false);
  };

  const playAudio = () => {
    if (currentQuestion.audio && audioRef.current) {
      audioRef.current.play();
    }
  };

  const toggleOption = (option: string) => {
    if (currentQuestion.question_type === 'multiple_choice' || currentQuestion.question_type === 'true_false') {
      setSelectedOptions([option]);
      checkAnswer();
    }
  };

  const checkAnswer = () => {
    if (currentQuestion.question_type === 'multiple_choice' || currentQuestion.question_type === 'true_false') {
      setShowAnswer(true);
    }
  };

  const handleSubmitTextAnswer = () => {
    setShowAnswer(true);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
      };
      
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const submitRecording = () => {
    setShowAnswer(true);
  };

  const renderPassageContent = () => {
    const parentQuestion = parentQuestions[currentParentIndex];
    return (
      <Card className="mb-3 h-100">
        <Card.Header>
          <h5>Reading Passage</h5>
        </Card.Header>
        <Card.Body style={{ overflowY: 'auto', maxHeight: '70vh' }}>
          <Card.Title>{parentQuestion.question_text}</Card.Title>
          {parentQuestion.passage_text && (
            <Card.Text className="mb-3">
              {parentQuestion.passage_text}
            </Card.Text>
          )}
          {parentQuestion.question_image && (
            <div className="text-center mb-3">
              <img 
                src={parentQuestion.question_image} 
                alt="Passage visual" 
                style={{ maxWidth: '100%', maxHeight: '300px' }}
              />
            </div>
          )}
        </Card.Body>
      </Card>
    );
  };

  const renderQuestionContent = () => {
    return (
      <Card className="mb-3 border-0">
        <Card.Body>
        <Card.Title>
          {`Question${
            practiceType === 'conversation' ? `: ${currentQuestion.question_context}` : ':'
          }`}
        </Card.Title>
          
          {!isReadingLayout && currentQuestion.passage_text && (
            <Card.Text className="mb-3 border p-3 bg-light">
              {currentQuestion.passage_text}
            </Card.Text>
          )}
          
          { (
            <Card.Text style={{whiteSpace: "pre-line" }}>{currentQuestion.question_text}</Card.Text>
          )}
          
          {currentQuestion.question_image && (
            <div className="text-center mb-3">
              <img 
                src={currentQuestion.question_image} 
                alt="Question visual" 
                style={{ maxWidth: '100%', maxHeight: '300px' }}
              />
            </div>
          )}
          
          {currentQuestion.audio && (
            <div className="mb-3">
              <Button variant="outline-primary" onClick={playAudio}>
                <i className="bi bi-volume-up"></i> Play Audio
              </Button>
              <audio ref={audioRef} src={currentQuestion.audio} style={{ display: 'none' }}></audio>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  };

  const renderMultipleChoice = () => {
    if (!currentQuestion.options) return null;
    console.log(currentQuestion.options)
    console.log(currentQuestion.correct_answer)
    return (
      <Row className="mb-3">
        {currentQuestion.options.map((option, index) => (
          <Col md={6} key={index} className="mb-2">
            <Button
              variant={
                showAnswer
                  ? currentQuestion.correct_answer[index]
                    ? 'success'
                    : selectedOptions.includes(option)
                    ? 'danger'
                    : 'outline-secondary'
                  : selectedOptions.includes(option)
                  ? 'primary'
                  : 'outline-secondary'
              }
              className="w-100"
              onClick={() => toggleOption(option)}
              disabled={showAnswer && !currentQuestion.correct_answer[index]}
            >
              {option}
            </Button>
          </Col>
        ))}
      </Row>
    );
  };


  const renderTextAnswer = () => {
    const isMultiline = currentQuestion.question_type === 'writing';
    const correctAnswer = currentQuestion.options?.[0] || "";
    
    return (
      <>
        <Form.Group className="mb-3">
          {isMultiline ? (
            <Form.Control
              as="textarea"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={5}
            />
          ) : (
            <Form.Control
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer"
            />
          )}
        </Form.Group>
        <Button variant="primary" onClick={handleSubmitTextAnswer}>
          Submit Answer
        </Button>
        {showAnswer && (
          <Alert variant="info" className="mt-3" >
            <strong>Suggested Answer:</strong><br></br> 
            <ReactMarkdown>{correctAnswer}</ReactMarkdown>
            {currentQuestion.explanation && currentQuestion.explanation[0] && (
              <div className="mt-2">
                <strong>Explanation:</strong> {currentQuestion.explanation[0]}
              </div>
            )}
          </Alert>
        )}
      </>
    );
  };

  const renderRecordingAnswer = () => {
    const correctAnswer = currentQuestion.options?.[0] || "";
    
    return (
      <>
        <div className="d-flex justify-content-center mb-3">
          {isRecording ? (
            <Button variant="danger" onClick={stopRecording}>
              <i className="bi bi-stop-fill"></i> Stop Recording
            </Button>
          ) : (
            <Button 
              variant="outline-primary" 
              onClick={startRecording}
            >
              <i className="bi bi-mic-fill"></i> Start Recording
            </Button>
          )}
        </div>
        
        {audioBlob && (
          <div className="mb-3 text-center">
            <audio 
              src={URL.createObjectURL(audioBlob)} 
              controls 
              className="w-100 mb-2"
            />
            <Button 
              variant="primary" 
              onClick={submitRecording}
              disabled={showAnswer}
            >
              Submit Recording
            </Button>
          </div>
        )}
        
        {showAnswer && (
          <Alert variant="info">
            <p><strong>Correct pronunciation:</strong></p>
            {currentQuestion.audio && (
              <audio src={currentQuestion.audio} controls className="w-100" />
            )}
            <p className="mt-2">{correctAnswer}</p>
            {currentQuestion.explanation && currentQuestion.explanation[0] && (
              <div className="mt-2">
                <strong>Explanation:</strong> {currentQuestion.explanation[0]}
              </div>
            )}
          </Alert>
        )}
      </>
    );
  };

  const renderAnswerSection = () => {
    switch (currentQuestion.question_type) {
      case 'multiple_choice':
      case 'true_false':
        return renderMultipleChoice();
      case 'short_answer':
        case 'fill_in':
      case 'writing':
        return renderTextAnswer();
      case 'speaking':
        return renderRecordingAnswer();
      default:
        return <p>Unsupported question type</p>;
    }
  };

  const getProgressValue = () => {
    if (isReadingLayout) {
      // Calculate total questions across all parents
      const totalQuestions = childQuestions.reduce((sum, group) => sum + group.length, 0);
      
      // Calculate current question number
      let currentNumber = 0;
      for (let i = 0; i < currentParentIndex; i++) {
        currentNumber += childQuestions[i].length;
      }
      currentNumber += currentChildIndex + 1;
      
      return {
        percent: (currentNumber / totalQuestions) * 100,
        label: `${currentNumber}/${totalQuestions}`
      };
    } else {
      return {
        percent: ((currentQuestionIndex + 1) / questions.length) * 100,
        label: `${currentQuestionIndex + 1}/${questions.length}`
      };
    }
  };

  const progress = getProgressValue();

  if (isReadingLayout) {
    return (
      <Container fluid className="px-4">
        <ProgressBar 
          now={progress.percent}
          label={progress.label}
          className="mb-4"
        />
        
        <Row>
          {/* Left column - Reading passage */}
          <Col md={5} className="mb-4">
            {renderPassageContent()}
          </Col>
          
          {/* Right column - Question and answer */}
          <Col md={7}>
            <Card className="mb-4">
              <Card.Body>
                {renderQuestionContent()}
                <hr className="my-3" />
                <div>
                  <h5 className="mb-3">Your Answer</h5>
                  {renderAnswerSection()}
                </div>
              </Card.Body>
            </Card>
            
            <div className="d-flex justify-content-between mb-4">
              <Button 
                variant="outline-secondary" 
                onClick={handlePrevious}
                disabled={currentParentIndex === 0 && currentChildIndex === 0}
              >
                <i className="bi bi-arrow-left"></i> Previous
              </Button>
              
              <Button 
                variant="outline-info" 
                onClick={() => setShowHint(!showHint)}
                disabled={!currentQuestion.hint || !currentQuestion.hint[0]}
              >
                <i className="bi bi-lightbulb"></i> {showHint ? 'Hide Hint' : 'Show Hint'}
              </Button>
              
              <Button 
                variant="outline-secondary" 
                onClick={handleNext}
                disabled={
                  currentParentIndex === parentQuestions.length - 1 && 
                  currentChildIndex === childQuestions[currentParentIndex].length - 1
                }
              >
                Next <i className="bi bi-arrow-right"></i>
              </Button>
            </div>
            
            {showHint && currentQuestion.hint && currentQuestion.hint[0] && (
              <Alert variant="warning" className="mt-3">
                <strong>Hint:</strong><br></br>
                <ReactMarkdown>{currentQuestion.hint[0]}</ReactMarkdown> 
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    );
  }

  // Standard layout for non-reading practice types
  return (
    <Container className="w-75 mx-auto">
      <ProgressBar 
        now={progress.percent}
        label={progress.label}
        className="mb-4"
      />
      
      <Card className="mb-4">
        <Card.Body>
          {renderQuestionContent()}
          <hr className="my-3" />
          <div>
            <h5 className="mb-3">Your Answer</h5>
            {renderAnswerSection()}
          </div>
        </Card.Body>
      </Card>
      
      <div className="d-flex justify-content-between mb-4">
        <Button 
          variant="outline-secondary" 
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <i className="bi bi-arrow-left"></i> Previous
        </Button>
        
        <Button 
          variant="outline-info" 
          onClick={() => setShowHint(!showHint)}
          disabled={!currentQuestion.hint || !currentQuestion.hint[0]}
        >
          <i className="bi bi-lightbulb"></i> {showHint ? 'Hide Hint' : 'Show Hint'}
        </Button>
        
        <Button 
          variant="outline-secondary" 
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next <i className="bi bi-arrow-right"></i>
        </Button>
      </div>
      
      {showHint && currentQuestion.hint && currentQuestion.hint[0] && (
        <Alert variant="warning" className="mt-3">
          <strong>Hint:</strong> <br></br>
          <ReactMarkdown>{currentQuestion.hint[0]}</ReactMarkdown>
        </Alert>
      )}
    </Container>
  );
};

export default QuestionContainer;