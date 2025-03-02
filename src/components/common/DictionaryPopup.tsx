'use client'
import React, { useState, useEffect, useRef } from 'react';
import { getdictapi } from '@/lib/api_vocab';
interface DictionaryPopupProps {
  word: string;
  position: { x: number; y: number };
  onClose: () => void;
}

interface DictionaryResult {
  word: string;
  ipa: string;
  definition: string;
  example: string;
  loading: boolean;
  error?: string;
}

const DictionaryPopup: React.FC<DictionaryPopupProps> = ({ word, position, onClose }) => {
  const [result, setResult] = useState<DictionaryResult>({
    word: word,
    ipa: '',
    definition: '',
    example: '',
    loading: true
  });
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getdictapi(word);
        setResult({
          ...data,
          loading: false
        });
      } catch {
        setResult({
          word: word,
          ipa: '',
          definition: '',
          example: '',
          loading: false,
          error: 'Không tìm thấy từ này trong từ điển'
        });
      }
    };

    fetchData();

    // Xử lý click outside để đóng popup
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [word, onClose]);

  return (
    <div 
      ref={popupRef}
      className="dictionary-popup" 
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y + 20}px`,
        width: '320px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '12px',
        zIndex: 1000,
      }}
    >
      {result.loading ? (
        <div className="loading">Đang tìm kiếm...</div>
      ) : result.error ? (
        <div className="error">{result.error}</div>
      ) : (
        <>
          <div className="word-header">
            <h3 style={{ margin: '0 0 4px 0' }}>{result.word}</h3>
            {result.ipa && <div className="phonetic">{result.ipa}</div>}
          </div>
          
          <div className="definition" style={{ marginTop: '10px' }}>
            <h4 style={{ margin: '0 0 4px 0' }}>Định nghĩa:</h4>
            <p style={{ margin: '0', whiteSpace: 'pre-line' }}>{result.definition}</p>
          </div>
          
          {result.example && (
            <div className="examples" style={{ marginTop: '10px' }}>
              <h4 style={{ margin: '0 0 4px 0' }}>Ví dụ:</h4>
              <p style={{ margin: '0', fontStyle: 'italic', whiteSpace: 'pre-line' }}>{result.example}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DictionaryPopup;