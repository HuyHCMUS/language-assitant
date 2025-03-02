'use client'
import { useState, useEffect } from 'react';

interface UseTextSelectionResult {
  showIcon: boolean;
  iconPosition: { x: number; y: number };
  selectedWord: string;
  showPopup: boolean;
  handleIconClick: () => void;
  handleClosePopup: () => void;
}

export const useTextSelection = (): UseTextSelectionResult => {
  const [showIcon, setShowIcon] = useState(false);
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
  const [selectedWord, setSelectedWord] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      
      if (!selection || selection.isCollapsed) {
        if (!showPopup) setShowIcon(false);
        return;
      }

      const selectedText = selection.toString().trim();
      
      // Kiểm tra xem đây có phải một từ đơn không (không có khoảng trắng)
      if (selectedText && !selectedText.includes(' ')) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setSelectedWord(selectedText);
        setIconPosition({
          x: rect.right + window.scrollX,
          y: rect.top + window.scrollY
        });
        setShowIcon(true);
      } else {
        if (!showPopup) setShowIcon(false);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [showPopup]);

  const handleIconClick = () => {
    setShowPopup(true);
    setShowIcon(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return {
    showIcon,
    iconPosition,
    selectedWord,
    showPopup,
    handleIconClick,
    handleClosePopup
  };
};