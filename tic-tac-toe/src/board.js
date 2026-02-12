import { useState } from 'react';
import { useEffect } from "react";
import Square from './square';

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [wins, setWins] = useState(Array(9).fill("not"));
    const [xIsNext, setXIsNext] = useState(true);
    const [xWin, setXWin] = useState(0);
    const [oWin, setOWin] = useState(0);
    const [tie, setTie] = useState(0);
    const win = squares.slice();

    function calculateWinner(squares) {
    const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] != null && squares[a] === squares[b] && squares[a] === squares[c]) {
      win[a] = "win";
      win[b] = "win";
      win[c] = "win";
      return squares[a];
    }
  }
   if(squares.every(square => square !== null)){
      return
    }
  return null;
}

    function reset(){
      setWins(Array(9).fill("not"))
        setSquares(Array(9).fill(null))
        setXIsNext(true)
    }


    function teste(i) {
    const nextSquares = squares.slice();

    if (squares[i] != null || calculateWinner(squares) != null) {
      return;
    }

    if(xIsNext == true){
        nextSquares[i] = "X";
    }
    else{
        nextSquares[i] = "O";
    }
    setXIsNext(!xIsNext);
    setSquares(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } 
  else if(squares.every(square => square !== null)){
    status = "Tie"
  }
  else {
    status = (xIsNext ? "X" : "O") + " turn";
  }

  useEffect(() => {
  if (winner === "X") {
    setXWin((prev) => prev + 1);
    setWins(win) 
  }
  else if ((squares.every(square => square !== null))){
    setTie((prev) => prev + 1)
  } 
  else if (winner === "O") {
    setOWin((prev) => prev + 1);
    setWins(win)
  }
}, [winner]);

  return (
    <>
    <div className="board-row">
            <div className="head first"><p className="X">X </p><p className=" O">O</p></div>
            <div className="head status">{status}</div>
            <div className="head last"><button className="reset" onClick={() => reset()}><span className="material-symbols-rounded" style={{ fontSize: 30, color: '#a7bfc9' }}>
      refresh
    </span></button></div>
    </div>
    <div className="board-row">
            <Square value={squares[0]} win={wins[0]} onSquareClick={() => teste(0)}/>
            <Square value={squares[1]} win={wins[1]} onSquareClick={() => teste(1)}/>
            <Square value={squares[2]} win={wins[2]} onSquareClick={() => teste(2)}/>
          </div>
          <div className="board-row">
            <Square value={squares[3]} win={wins[3]} onSquareClick={() => teste(3)}/>
            <Square value={squares[4]} win={wins[4]} onSquareClick={() => teste(4)}/>
            <Square value={squares[5]} win={wins[5]} onSquareClick={() => teste(5)}/>
          </div>
          <div className="board-row">
            <Square value={squares[6]} win={wins[6]} onSquareClick={() => teste(6)}/>
            <Square value={squares[7]} win={wins[7]} onSquareClick={() => teste(7)}/>
            <Square value={squares[8]} win={wins[8]} onSquareClick={() => teste(8)}/>
          </div>
          <div className="board-row">
            <div className="result X">{xWin}</div>
            <div className="result tie">{tie}</div>
            <div className="result O">{oWin}</div>
          </div>
    </>
    
  );
}