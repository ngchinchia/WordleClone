import React from "react";

export default function Modal({ isCorrect, turn, solution }) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <p className="solution">Answer : {solution}</p>
          <p>Well done! You found the solution in {turn} guesses! </p>
        </div>
      )}

      {!isCorrect && (
        <div>
          <h1>Nevermind!</h1>
          <p className="solution">Answer : {solution}</p>
          <p>Better luck next time! </p>
        </div>
      )}
    </div>
  );
}
