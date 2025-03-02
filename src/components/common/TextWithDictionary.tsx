'use client'
import React from 'react';
import { useTextSelection} from './TextSelection' ;
import DictionaryPopup from './DictionaryPopup';

const TextWithDictionary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    showIcon,
    iconPosition,
    selectedWord,
    showPopup,
    handleIconClick,
    handleClosePopup
  } = useTextSelection();

  return (
    <div className="text-with-dictionary">
      {children}
      
      {showIcon && (
        <button
          className="dictionary-icon"
          onClick={handleIconClick}
          style={{
            position: 'absolute',
            left: `${iconPosition.x + 5}px`,
            top: `${iconPosition.y - 20}px`,
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6H18V18H6V6Z" fill="none" />
            <path d="M3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z" stroke="currentColor" strokeWidth="2" />
            <path d="M7 9L10 12M10 12L7 15M10 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {showPopup && (
        <DictionaryPopup
          word={selectedWord}
          position={iconPosition}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default TextWithDictionary;