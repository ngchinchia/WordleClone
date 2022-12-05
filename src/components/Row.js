import React from 'react'

export default function Row({ guess, currentGuess }) {

  if (guess) {
    return (
      <div className="row past">
        {guess.map((l, i) => (  
          <div key={i} className={l.color}>{l.key}</div>  // Output each letter in a div if it has a value
        ))}
      </div>
    )
  }

  if (currentGuess) {
    let letters = currentGuess.split('') // place each letter in its own space
    return (
        <div className="row current"> 
            {letters.map((letter, i) => (
                <div key={i} className="filled">{letter}</div>
            ))}
            {[...Array(5 - letters.length)].map((_, i) => ( // map through and output the empty squares
                <div key={i}></div>
            ))} 
        </div>

    )
  }

  /* output empty row if it does not have value */
  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
  
}