import React from 'react';
import './App.css';
import AnswerButton from './AnswerButton';

function App() {
  return (
    <div className="App">
      <AnswerButton type="ai" />
      <AnswerButton type="human" />
    </div>
  );
}

export default App;
