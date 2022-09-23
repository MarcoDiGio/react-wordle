import React, { useEffect, useState } from 'react'

export default function Keypad({ handleKeyup, usedKeys }) {
  const [letters, setLetters] = useState(null)

  useEffect(() => {
    fetch('http://87.12.128.208:3001/words')
    .then(res => res.json())
    .then(json => setLetters(json))
  }, []);

  return (
    <div className='keypad'>
      {letters && letters.map((l) => {
        if (l.key === 'Enter' || l.key === 'Backspace') {
            return <div className='double' key={l.key} onClick={() => handleKeyup(l)}>{l.key}</div>
        }
        return <div key={l.key} onClick={() => handleKeyup(l)} className={usedKeys[l.key]}>{l.key}</div>
      })}
    </div>
  )
}
