'use client'

import { FC, useState } from 'react'
import { Card, Button } from 'react-bootstrap'

interface VocabCardProps {
  word: string
  meaning: string
  example: string
  pronunciation: string
  onRemove?: () => void
}

const VocabCard: FC<VocabCardProps> = ({
  word,
  meaning,
  example,
  pronunciation,
  onRemove
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <Card 
      className="relative w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`transition-all duration-500 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
        {/* Front side */}
        <Card.Body className="p-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{word}</h3>
          <p className="text-gray-600 italic mb-4">{pronunciation}</p>
          {onRemove && (
            <Button
              variant="link"
              onClick={(e) => {
                e.stopPropagation()
                onRemove()
              }}
              className="text-gray-400 hover:text-red-500"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          )}
        </Card.Body>
      </div>

      <div 
        className={`absolute inset-0 bg-white p-4 transition-all duration-500 ${
          isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Back side */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Nghĩa:</h4>
          <p className="text-gray-600 mb-4">{meaning}</p>
          <h4 className="font-semibold text-gray-700 mb-2">Ví dụ:</h4>
          <p className="text-gray-600 italic">{example}</p>
        </div>
      </div>
    </Card>
  )
}

export default VocabCard 