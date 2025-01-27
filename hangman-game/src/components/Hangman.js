import React, { useState, useEffect } from 'react';
import Word from './Word';
import Letters from './Letters';
import Notification from './Notification';
import './Hangman.css';

/**
 * Hangman component that implements the Hangman game.
 * @component
 */
const Hangman = () => {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing');
  const [hintLetters, setHintLetters] = useState([]);

  /**
   * Fetches a random word from dictionary.txt and sets it as the word to guess.
   * Runs on component mount.
   */
  useEffect(() => {
    fetch('/dictionary.txt')
      .then(response => response.text())
      .then(text => {
        const words = text.split('\n')
                          .map(word => word.trim().toLowerCase())
                          .filter(word => /^[a-z]+$/.test(word));
        if (words.length > 0) {
          const randomWord = words[Math.floor(Math.random() * words.length)];
          setWord(randomWord);
        } else {
          console.error('No valid words found in dictionary.txt');
        }
      })
      .catch(err => console.error('Error fetching dictionary.txt:', err));
  }, []);

  /**
   * Handles the click event for letter buttons.
   * @param {string} letter - The letter that was clicked.
   */
  const handleLetterClick = (letter) => {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }

    if (word.split('').every(l => guessedLetters.includes(l) || hintLetters.includes(l) || l === letter)) {
      setGameStatus('won');
    }

    if (wrongGuesses >= 10) {
      setGameStatus('lost');
    }
  };

  /**
   * Handles the click event for the hint button.
   * Adds a random letter from the word to the guessed letters.
   */
  const handleHintClick = () => {
    const remainingLetters = word.split('').filter(letter => !guessedLetters.includes(letter) && !hintLetters.includes(letter));
    if (remainingLetters.length > 0) {
      const randomHintLetter = remainingLetters[Math.floor(Math.random() * remainingLetters.length)];
      setHintLetters([...hintLetters, randomHintLetter]);
      setGuessedLetters([...guessedLetters, randomHintLetter]);
    }
  };

  /**
   * Restarts the game by resetting the state and fetching a new word.
   */
  const restartGame = () => {
    setGuessedLetters([]);
    setHintLetters([]);
    setWrongGuesses(0);
    setGameStatus('playing');
    fetch('/dictionary.txt')
      .then(response => response.text())
      .then(text => {
        const words = text.split('\n')
                          .map(word => word.trim().toLowerCase())
                          .filter(word => /^[a-z]+$/.test(word));
        if (words.length > 0) {
          const randomWord = words[Math.floor(Math.random() * words.length)];
          setWord(randomWord);
        } else {
          console.error('No valid words found in dictionary.txt');
        }
      })
      .catch(err => console.error('Error fetching dictionary.txt:', err));
  };

  return (
    <div className="hangman">
      <h1>Hangman Game</h1>
      {gameStatus === 'playing' && (
        <img src={`/state${wrongGuesses + 1}.GIF`} alt={`Hangman state ${wrongGuesses + 1}`} />
      )}
      {gameStatus === 'lost' && (
        <p className="correct-word">The correct word was: {word}</p>
      )}
      <Word word={word} guessedLetters={guessedLetters} hintLetters={hintLetters} />
      <Letters guessedLetters={guessedLetters} handleLetterClick={handleLetterClick} />
      <Notification gameStatus={gameStatus} restartGame={restartGame} />
      <button onClick={handleHintClick} disabled={gameStatus !== 'playing'}>Hint</button>
    </div>
  );
};

export default Hangman;