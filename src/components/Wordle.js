import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";

export default function Wordle({ solution }) {
  /* Grabbing things from useWorld.js */
  const { currentGuess, handleKeyup } = useWordle(solution);

  useEffect(() => {
    /* everytime user presses a key and release, fire this function */
    window.addEventListener("keyup", handleKeyup);

    /* cleanup function to unattach event */
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  return (
    <div>
      <div>Current Guess - {currentGuess}</div>
    </div>
  );
}
