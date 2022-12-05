/* THIS FILE CONTAIN GAME LOGIC */
import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0); // Tracks what turn the user is on, after 6 guesses, it is game over.
  const [currentGuess, setCurrentGuess] = useState(""); // Tracking what the user is currently typing in current guess and update.
  const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
  const [history, setHistory] = useState([]); // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false); // Changes true only when user wins game.
  const [usedKeys, setUsedKeys] = useState({}) // {a: 'green', b: 'yellow', c: 'grey'}

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArray = [...solution]; // Gets copy of solution as an array
    let formattedGuess = [...currentGuess].map((l) => {
      // Turn each letter as a key and setting its color
      return { key: l, color: "grey" };
    });

    // Check for any GREEN letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null; // After matching, set it to null to prevent double matching
      }
    });

    // Check for any YELLOW letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null; // find index of particular letter in solution
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess]; // Takes currentGuess and store as string format
    });
    setTurn((prevTurn) => {
      // Increment starting turn
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      let newKeys = {...prevUsedKeys}

      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key]

        if (l.color === 'green'){
          newKeys[l.key] = 'green'
          return
        }

        if (l.color === 'yellow' && currentColor !== 'green'){
          newKeys[l.key] = 'yellow'
          return
        }

        if(l.color === 'grey' && currentColor !== 'greem' && currentColor !== 'yellow') {
          newKeys[l.key] = 'grey'
          return
        }

        
      })

      return newKeys
    })
    setCurrentGuess(""); // Clears current guess once it had a guess and start on a new row with blank slate
  };

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  // 'key' is the key that user presses
  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      // only add guess if turn is < 5
      if (turn > 5) {
        console.log("you used all guesses");
        return;
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        window.alert("You have already tried the word, please enter a different word.");
        setCurrentGuess((prev) => {
          return prev = ('')
        })
        return;
      }
      // check word is 5 chars long
      if (currentGuess.length !== 5) {
        window.alert("Word must be 5 characters long, please fill in all blanks!");
        return;
      }
      const formatted = formatGuess(); /* function is called if all conditions above are bypassed */
      addNewGuess(formatted);
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

  return { turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys };
};

export default useWordle;
