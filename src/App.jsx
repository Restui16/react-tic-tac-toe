import { useState } from 'react'

function Square(props){
  const {value, onSquareClick} = props
  return (
    <>
      <button className='square' onClick={onSquareClick}>{value}</button>
    </>
  )
}

function Board(props) {
  const {xIsNext, squares, onPlay} = props
  const square = squares.map((value, index) => {
    return(
      <Square key={index} value={value} onSquareClick={() => handleClick(index)} />
    )
  })
  function handleClick(i){
    if(squares[i] || calculateWinner(squares)) return

    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status = ''

  if(winner){
    status = `Winner : ${winner}`
  } else {
    status = `Next Player ${xIsNext ? 'X' : 'O'}`
  }


  return (
    <>
      <div className='status'>{status}</div>
      <div className='board'>
        {square}
      </div>
    </>
  )
}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const currentSquares = history[currentMove]
  const xIsNext = currentMove % 2 == 0

  function jumpTo(nextMove){
    setCurrentMove(nextMove)
  }
  
  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  const moves = history.map((squares, move) => {
    let description = '';
    if(move > 0 ){
      description = `GO TO MOVE #${move}`
    } else {
      description = `GO TO GAME START`
    }
    
    return (
      <li key={move}>
        <button onClick={()=> jumpTo(move)}>{description}</button>
      </li>
    )
  })

 

  return(
    <div className='game'>
      <div className='game-board'>
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
          <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]

    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
    {
      return squares[a]
    }
  }

  return false
}

