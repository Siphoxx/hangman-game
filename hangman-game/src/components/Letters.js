import React from 'react';

/**
 * Letters component to display the alphabet letters as buttons.
 * Each button can be clicked to guess a letter in the Hangman game.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {string[]} props.guessedLetters - Array of letters that have already been guessed.
 * @param {function} props.handleLetterClick - Function to handle the click event on a letter button.
 */
const Letters = ({ guessedLetters, handleLetterClick }) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <div className="letters">
      {alphabet.map((letter, index) => (
        <button
          key={index}
          className="letter-button"
          onClick={() => handleLetterClick(letter)}
          disabled={guessedLetters.includes(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Letters;