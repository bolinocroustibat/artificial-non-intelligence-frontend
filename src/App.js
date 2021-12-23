import logo from './logo.svg';
import './App.css';
import './components/AnswerButton/AnswerButton'
import AnswerButton from './components/AnswerButton/AnswerButton';

function App() {
  return (
    <div className="App">
      <AnswerButton type="ai"></AnswerButton>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <AnswerButton type="human"></AnswerButton>
    </div>
  );
}

export default App;
