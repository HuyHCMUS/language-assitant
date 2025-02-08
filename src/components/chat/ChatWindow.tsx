import React, { useState } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isVoiceMode, setIsVoiceMode] = useState(false)

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages([...messages, newMessage])
    // TODO: Implement bot response logic
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      {/* Input area */}
      <div className="border-t p-4">
        <ChatInput 
          onSendMessage={handleSendMessage}
          isVoiceMode={isVoiceMode}
          onToggleVoiceMode={() => setIsVoiceMode(!isVoiceMode)}
        />
      </div>
    </div>
  )
}

export default ChatWindow 