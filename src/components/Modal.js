import React from 'react'

export default function Modal({ isCorrect, turn, solution }) {

  return (
    <div className='modal'>
        {isCorrect && (
            <div>
                <h1>You win!</h1>
                <p className='solution'>{solution}</p>
                <p>You found the solution in {turn} guesses</p>
                <button className='retry' onClick={() => window.location.reload()}>Try again!</button>
            </div>
        )}
        {!isCorrect && (
            <div>
                <h1>You lost!</h1>
                <p className='solution'>{solution}</p>
                <p>Better luck next time :p</p>
                <button className='retry' onClick={() => window.location.reload()}>Try again!</button>
            </div>
        )}
    </div>
  )
}
