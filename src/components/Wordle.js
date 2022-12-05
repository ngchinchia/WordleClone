import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";

export default function Wordle({ solution }) {
  /* Grabbing things from useWorld.js */
  const { currentGuess, handleKeyup, guesses, isCorrect, turn } = useWordle(solution);

  useEffect(() => {
    /* everytime user presses a key and release, fire this function */
    window.addEventListener("keyup", handleKeyup);

    /* cleanup function to unattach event */
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect)
  }, [guesses, turn, isCorrect])

  return (
    <div>
      <div>solution - {solution}</div>
      <div>Current Guess - {currentGuess}</div>
      <Grid currentGuess = {currentGuess} guesses = {guesses} turn = {turn} />
      <Keypad />
    </div>
  );
}
