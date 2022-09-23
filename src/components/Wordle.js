import { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle() {

  const { solution, currentGuess, guesses, turn, handleKeyup, isCorrect, usedKeys } = useWordle()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)
    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup])

  useEffect(() => {
    if (turn === 6) {
      window.removeEventListener('keyup', handleKeyup)
      setTimeout(() => setShowModal(true), 1600)
    }
    if (isCorrect) {
      window.removeEventListener('keyup', handleKeyup)
      setTimeout(() => setShowModal(true), 1600)
    }

  }, [turn, handleKeyup, isCorrect])

  return (
    <div>
      <div className='title'>Wordle (Diggios)</div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn}/>
      {showModal && <Modal turn={turn} isCorrect={isCorrect} solution={solution}/>}
      <Keypad handleKeyup={handleKeyup} usedKeys={usedKeys}/>
    </div>
  )
}
