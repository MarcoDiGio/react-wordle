import { useEffect, useState } from "react";


const useWordle = () => {
    const [solution, setSolution] = useState(null)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)])
    const [history, setHistory] = useState([])
    const [turn, setTurn] = useState(0)
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})

    // format type: {key: 'a', color: 'grey'}
    useEffect(() => {
      fetch('http://87.12.128.208:3001/solutions')
      .then(res => res.json())
      .then(json => {
          const randomSolution = json[Math.floor(Math.random()*json.length)]
          setSolution(randomSolution.word)
      })
  }, [setSolution])

    const formatGuess = () => {
      let solutionArray = [...solution]
      let formattedGuess = [...currentGuess].map((l) => {
        return {key: l, color: 'grey'}
      })

      // check green
      formattedGuess.forEach((l, i) => {
        if (solution[i] === l.key) {
          formattedGuess[i].color = 'green'
          solutionArray[i] = null
        }
      })

      //check yellow
      formattedGuess.forEach((l, i) => {
        if(solutionArray.includes(l.key) && l.color !== 'green') {
          formattedGuess[i].color = 'yellow'
          solutionArray[solutionArray.indexOf(l.key)] = null
        }
      })

      return formattedGuess
    }

    const addNewGuess = ( formattedGuess ) => {
      if (currentGuess === solution) {
        setIsCorrect(true);
      }
      setGuesses(prevGuesses => {
        let newGuesses = [...prevGuesses]
        newGuesses[turn] = formattedGuess
        return newGuesses
      })
      setHistory(prevHistory => {
        return [...prevHistory, currentGuess]
      })
      setTurn(prevTurn => prevTurn + 1)
      setUsedKeys(prevUsedKeys => {
        formattedGuess.forEach(l => {
          let currentColor = prevUsedKeys[l.key]
          if (l.color === 'green') {
            prevUsedKeys[l.key] = 'green'
            return
          }
          if (l.color === 'yellow' && currentColor !== 'green') {
            prevUsedKeys[l.key] = 'yellow'
            return
          }
          if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
            prevUsedKeys[l.key] = 'grey'
            return
          }
        })
        return prevUsedKeys
      })
      setCurrentGuess('')
    }

    const handleKeyup = ( {key} ) => {
      if(key === "Enter") {
        if (turn > 5) {
          return
        }
        if (currentGuess.length !== 5) {
          return
        }
        if(history.includes(currentGuess)) {
          return
        }
        const formatted = formatGuess()
        addNewGuess(formatted)
      }
      if(key === "Backspace") {
        setCurrentGuess(prev => {
          return prev.slice(0, -1)
        })
        return;
      }
      if(/^[A-Za-z]$/.test(key)) {
        if(currentGuess.length < 5) {
          setCurrentGuess(prev => prev+key)
        }
        return;
      }
    }

    return {solution, currentGuess, guesses, handleKeyup, turn, isCorrect, usedKeys}
}

export default useWordle;