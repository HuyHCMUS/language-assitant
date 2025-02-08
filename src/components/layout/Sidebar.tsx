import React from 'react'

interface SavedWord {
  id: string
  word: string
  meaning: string
  timestamp: Date
}

interface SidebarProps {
  savedWords: SavedWord[]
  onWordClick: (word: SavedWord) => void
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ savedWords, onWordClick, isOpen, onClose }) => {
  return (
    <div 
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Từ vựng đã lưu</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Word list */}
      <div className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-64px)]">
        {savedWords.length === 0 ? (
          <p className="text-gray-500 text-center">Chưa có từ vựng nào được lưu</p>
        ) : (
          savedWords.map((word) => (
            <div
              key={word.id}
              onClick={() => onWordClick(word)}
              className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <h3 className="font-medium text-gray-800">{word.word}</h3>
              <p className="text-sm text-gray-600">{word.meaning}</p>
              <span className="text-xs text-gray-400">
                {word.timestamp.toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Sidebar 