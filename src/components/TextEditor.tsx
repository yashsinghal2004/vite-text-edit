import React, { useState, useCallback } from 'react';
import MovableText from './MovableText';
import { TextState, TextStyle } from '../types';

const TextEditor: React.FC = () => {
  const [text, setText] = useState<string>('Edit me!');
  const [style, setStyle] = useState<TextStyle>({
    fontFamily: 'Arial',
    fontSize: '32px',
    color: '#808080',
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

  const fonts = [
    'Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia', 'Palatino',
    'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black',
    'Impact', 'Lucida Sans Unicode', 'Tahoma'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '10px' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: '300px', minHeight: '200px', marginBottom: '20px' }}>
        {isEditing ? (
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: '280px'
          }}>
            <input 
              value={text} 
              onChange={handleTextChange} 
              style={{ marginBottom: '10px', width: '100%', fontSize: '16px', fontFamily: style.fontFamily }} 
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <select 
                value={style.fontFamily}
                onChange={(e) => handleStyleChange('fontFamily', e.target.value)} 
                style={{ width: '100%', height: '40px', fontSize: '16px', fontFamily: style.fontFamily }}
              >
                {fonts.map(font => (
                  <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                ))}
              </select>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <input
                  type="number"
                  value={parseInt(style.fontSize)}
                  onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
                  style={{ width: '60px', height: '40px', fontSize: '16px' }}
                />
                <input
                  type="color"
                  value={style.color}
                  onChange={(e) => handleStyleChange('color', e.target.value)}
                  style={{ width: '60px', height: '40px' }}
                />
                <button 
                  onClick={() => setIsEditing(false)}
                  style={{ height: '40px', fontSize: '16px', padding: '0 15px' }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        ) : (
          <MovableText text={text} style={style} onClick={() => setIsEditing(true)} />
        )}
      </div>
      <div>
        <button 
          onClick={handleUndo} 
          disabled={historyIndex === 0}
          style={{ fontSize: '16px', padding: '10px 15px', marginRight: '10px' }}
        >
          Undo
        </button>
        <button 
          onClick={handleRedo} 
          disabled={historyIndex === history.length - 1}
          style={{ fontSize: '16px', padding: '10px 15px' }}
        >
          Redo
        </button>
      </div>
    </div>
  );
};

export default TextEditor;