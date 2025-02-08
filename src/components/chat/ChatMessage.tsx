import { FC } from 'react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot'
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isBot
            ? 'bg-neutral-100 text-gray-800'
            : 'bg-primary-600 text-white'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <span className="text-xs opacity-70">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  )
}

export default ChatMessage 