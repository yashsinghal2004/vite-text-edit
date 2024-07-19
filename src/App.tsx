import React from 'react';
import TextEditor from './components/TextEditor';

const App: React.FC = () => {
  return (
    <div className="App" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',

      textAlign: 'center'
    }}>
      <h1>Celebrare Internship</h1>
      <TextEditor />
    </div>
  );
}

export default App;