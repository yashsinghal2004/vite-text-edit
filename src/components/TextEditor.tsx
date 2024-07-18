import React, { useState, useCallback } from 'react';
import MovableText from './MovableText';
import { TextState, TextStyle } from '../types';

const TextEditor: React.FC = () => {
  const [text, setText] = useState<string>('Edit this text!');
  const [style, setStyle] = useState<TextStyle>({
    fontFamily: 'Arial',
    fontSize: '16px',
    color: '#000000',
  });
  const [history, setHistory] = useState<TextState[]>([{ text, style }]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const updateHistory = useCallback((newText: string, newStyle: TextStyle) => {
    const newState: TextState = { text: newText, style: newStyle };
    setHistory(prev => [...prev.slice(0, historyIndex + 1), newState]);
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    updateHistory(e.target.value, style);
  };

  const handleStyleChange = (property: keyof TextStyle, value: string) => {
    const newStyle = { ...style, [property]: value };
    setStyle(newStyle);
    updateHistory(text, newStyle);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      const prevState = history[historyIndex - 1];
      setText(prevState.text);
      setStyle(prevState.style);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      const nextState = history[historyIndex + 1];
      setText(nextState.text);
      setStyle(nextState.style);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input value={text} onChange={handleTextChange} />
          <select onChange={(e) => handleStyleChange('fontFamily', e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
          <input
            type="number"
            value={parseInt(style.fontSize)}
            onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
          />
          <input
            type="color"
            value={style.color}
            onChange={(e) => handleStyleChange('color', e.target.value)}
          />
          <button onClick={() => setIsEditing(false)}>Done</button>
        </div>
      ) : (
        <MovableText text={text} style={style} onClick={() => setIsEditing(true)} />
      )}
      <div>
        <button onClick={handleUndo} disabled={historyIndex === 0}>Undo</button>
        <button onClick={handleRedo} disabled={historyIndex === history.length - 1}>Redo</button>
      </div>
    </div>
  );
};

export default TextEditor;