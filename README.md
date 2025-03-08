# English Learning App

## Links
- Backend Repository: https://github.com/HuyHCMUS/BE
- Live Demo: https://language-assitant-zv4n.vercel.app/

## Overview
English Learning App is an AI-powered application designed to help users improve their English skills through interactive chat, vocabulary management, and customizable practice exercises. This project leverages modern web technologies and AI-based tools to provide a personalized learning experience.

## Features

### 🔹 User Authentication & Profile
- Secure user registration and login system
- Personal profile management

### 🔹 Vocabulary Management
- Users can add, edit, and delete vocabulary words
- Quick Vocabulary Lookup: Users can highlight a word and click to instantly look up its meaning
- Vocabulary categorization and tagging
- Spaced repetition system for vocabulary review
- Import vocabulary lists from excel files

### 🔹 AI Chat Practice
- Integrated AI-powered chatbot for conversational English practice
- Supports contextual conversations with natural language understanding
- Automatic Grammar Correction: The chat automatically detects and corrects grammar mistakes in messages
- Multiple conversation topics and scenarios
- Chat history saving and review

### 🔹 Practice Exercises
- Comprehensive English Practice covering multiple skills:
  - Listening comprehension
  - Speaking practice
  - Reading comprehension
  - Writing exercises
  - Grammar drills
  - Vocabulary quizzes
- Customizable practice sessions based on:
  - Topics of interest
  - Skill focus areas
- AI-generated exercises:
  - Multiple-choice questions
  - Fill-in-the-blank exercises
  - Users can generate practice exercises based on selected topics.

## Tech Stack

### 📌 Frontend
- **Next.js 13 (TypeScript)**
  - App Router for improved routing
  - Server Components for better performance
  - API Routes for backend communication
- **React Bootstrap**
  - Responsive design
  - Modern UI components
- **State Management**
  - React Context for global state
  - Local storage for persistence

### 📌 Backend
- **FastAPI**
  - High-performance Python web framework
  - Automatic API documentation with Swagger UI
  - Built-in validation and serialization
- **Database**
  - PostgreSQL for data storage
  - SQLAlchemy ORM
  - Alembic for migrations
- **Authentication**
  - JWT-based authentication
  - Secure password hashing

### 📌 AI & NLP
- **LangChain**
  - AI chat integration
  - Dynamic exercise generation
  - Context management
- **Google Generative AI API**
  - gemini models for chat responses
  - Exercise generation
  - Grammar correction
  - Text analysis

## Installation & Setup

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- PostgreSQL
- OpenAI API key

### Frontend Setup
```bash
# Clone the repository
git clone [frontend-repo-url]
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/HuyHCMUS/BE
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run migrations
alembic upgrade head

# Start server
uvicorn main:app --reload
```

## Usage
1. Register an account or log in to access all features
2. Set up your learning preferences and goals
3. Start with vocabulary management:
   - Add new words
   - Create custom word lists
   - Practice with flashcards
4. Practice with AI chat:
   - Choose conversation topics
   - Get real-time corrections
   - Review chat history
5. Generate and complete practice exercises:
   - Select skill areas
   - Choose topics
   - Track your progress

## Future Improvements
- Speech recognition and pronunciation feedback
- Gamification features
  - Achievement badges
  - Learning streaks
  - Leaderboards
  - Point system
- Enhanced AI capabilities
  - More sophisticated conversation patterns
  - Better context understanding
  - Personalized learning paths
- Mobile app development
- Integration with external learning resources
- Social features for peer learning
- Advanced analytics and progress tracking
- Offline mode support
- Multi-language support
- API integration with other learning platforms

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
