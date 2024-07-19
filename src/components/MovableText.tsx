import React, { useState, useRef } from 'react';
import { TextStyle } from '../types';

interface TextProps {
  text: string;
  style: TextStyle;
  onClick: () => void;
}

const MovableText: React.FC<TextProps> = ({ text, style, onClick }) => {
  const [position, setPosition] = useState({ x: 0 , y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const textRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = Math.max(0, Math.min(e.clientX - dragStart.x, window.innerWidth - (textRef.current?.offsetWidth || 0)));
      const newY = Math.max(0, Math.min(e.clientY - dragStart.y, window.innerHeight - (textRef.current?.offsetHeight || 0)));
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      const newX = Math.max(0, Math.min(touch.clientX - dragStart.x, window.innerWidth - (textRef.current?.offsetWidth || 0)));
      const newY = Math.max(0, Math.min(touch.clientY - dragStart.y, window.innerHeight - (textRef.current?.offsetHeight || 0)));
      setPosition({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={textRef}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: 'move',
        userSelect: 'none',
        touchAction: 'none', // This line prevents default touch actions
        ...style,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Handle mouse leaving the element
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd} // Handle touch cancellation
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default MovableText;
