'use client'

import { FC, useState } from 'react'
import { Card, Button } from 'react-bootstrap'

interface QuizQuestion {
  id: string
  word: string
  meaning: string
  options: string[]
  correctAnswer: string
}

interface QuizCardProps {
  question: QuizQuestion
  onAnswer: (isCorrect: boolean) => void
}

const QuizCard: FC<QuizCardProps> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!selectedAnswer) return
    
    const isCorrect = selectedAnswer === question.correctAnswer
    setIsSubmitted(true)
    onAnswer(isCorrect)
  }

  return (
    <Card className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
      <Card.Body>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Chọn nghĩa đúng cho từ: <span className="text-primary">{question.word}</span>
        </h3>

        <div className="space-y-3">
          {question.options.map((option) => (
            <Button
              key={option}
              onClick={() => !isSubmitted && setSelectedAnswer(option)}
              variant={isSubmitted ? (option === question.correctAnswer ? 'success' : (option === selectedAnswer ? 'danger' : 'light')) : 'light'}
              className="w-100 text-left"
              disabled={isSubmitted}
            >
              {option}
            </Button>
          ))}
        </div>

        {!isSubmitted && (
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="mt-6 w-full bg-primary-600 text-white"
          >
            Kiểm tra
          </Button>
        )}

        {isSubmitted && (
          <div className={`mt-4 p-4 rounded-lg ${selectedAnswer === question.correctAnswer ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {selectedAnswer === question.correctAnswer
              ? '🎉 Chính xác!'
              : `❌ Đáp án đúng là: ${question.correctAnswer}`
            }
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default QuizCard 