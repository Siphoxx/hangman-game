import React from 'react';

/**
 * Notification component to display game status messages and restart button.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.gameStatus - The current status of the game ('playing', 'won', 'lost').
 * @param {function} props.restartGame - Function to restart the game.
 */
const Notification = ({ gameStatus, restartGame }) => {
  return (
    <div className="notification">
      {gameStatus === 'won' && <p>Congratulations! You won!</p>}
      {gameStatus === 'lost' && <p>Sorry! You lost. Try again!</p>}
      <button onClick={restartGame}>Restart Game</button>
      <p>Need help? The objective of the game is to guess the word letter by letter.</p>
    </div>
  );
};

export default Notification;