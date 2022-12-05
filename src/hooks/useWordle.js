import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0); // Tracks what turn the user is on, after 6 guesses, it is game over.
  const [currentGuess, setCurrentGuess] = useState(""); // Tracking what the user is currently typing in current guess and update.
  const [guesses, setGuesses] = useState([]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false); //Changes true only when user wins game.

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArray = [...solution] 
    let formattedGuess = [...currentGuess].map((l) => {
      return {key: l, color: 'grey'}
    })

    // Check for green letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key){
        formattedGuess[i].color = 'green'
        solutionArray[i] = null
      }
    })

    // Check for yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green'){
        formattedGuess[i].color = 'yellow'
        solutionArray[solutionArray.indexOf(l.key)] = null // find index of particular letter in solution

      }
    })

    return formattedGuess

  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = () => {};

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    
    if (key === 'Enter')
    {
      // only add guess if turn is < 5
      if (turn > 5){
        console.log('you used all guesses')
        return
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)){
        console.log('you already tried that word')
        return
      }
      // check word is 5 chars long
      if (currentGuess.length !== 5){
        console.log('word must be 5 chars long')
        return
      }
      const formatted = formatGuess()
      console.log(formatted)

    }

    /* Allows deletion of letter */
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return; // Returns new string based on old string that removes last character
    }

    /* Only display letters at max length of 5 that are pressed */
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
