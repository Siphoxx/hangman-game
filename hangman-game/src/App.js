import React from 'react';
import './App.css';
import Hangman from './components/Hangman';

/**
 * App component that serves as the root component of the application.
 * It renders the Hangman game component.
 * 
 * @component
 */
function App() {
  return (
    <div className="App">
      <Hangman />
    </div>
  );
}

export default App;