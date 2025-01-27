import React from 'react';

/**
 * Word component to display the word with guessed and hinted letters.
 * Each letter in the word is shown if it has been guessed or hinted, otherwise an underscore is shown.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.word - The word to be guessed in the Hangman game.
 * @param {string[]} props.guessedLetters - Array of letters that have already been guessed.
 * @param {string[]} props.hintLetters - Array of letters that have been revealed as hints.
 */
const Word = ({ word, guessedLetters, hintLetters }) => {
  return (
    <div className="word">
      {word.split('').map((letter, index) => (
        <span key={index} className="letter">
          {guessedLetters.includes(letter) || hintLetters.includes(letter) ? letter : '_'}
        </span>
      ))}
    </div>
  );
};

export default Word;