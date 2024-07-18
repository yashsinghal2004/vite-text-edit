import React from 'react';
import TextEditor from './components/TextEditor';

const App: React.FC = () => {
  return (
    <div className="flex text">
      <h1>Movable Text Editor</h1>
      <TextEditor />
    </div>
  );
}

export default App;