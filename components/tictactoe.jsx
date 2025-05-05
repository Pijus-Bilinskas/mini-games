"use client";

import { winningCondition } from "../constants/tictactoe-win.js";
import { useState } from "react";


 const TicTactoe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);
    const [winner, setWinner] = useState(null);
  
    const handleClick = (index) => {
      if (board[index] || winner) return;
  
      const newBoard = [...board];
      newBoard[index] = isXTurn ? "X" : "O";
      setBoard(newBoard);
      setIsXTurn(!isXTurn);
  
      checkWinner(newBoard);
    };
  
    const checkWinner = (board) => {
      for (let condition of winningCondition) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setWinner(board[a]);
          return;
        }
      }
  
      if (!board.includes(null)) {
        setWinner("Draw");
      }
    };
  
    const resetGame = () => {
      setBoard(Array(9).fill(null));
      setIsXTurn(true);
      setWinner(null);
    };
  
    return (
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold">Tic Tac Toe</h1>
        <div className="grid grid-cols-3 gap-1 max-w-4xl">
          {board.map((value, index) => (
            <div
              key={index}
              className="bg-gray-600 text-white text-3xl font-bold h-25 w-25 flex items-center justify-center rounded cursor-pointer hover:bg-gray-500"
              onClick={() => handleClick(index)}
            >
              {value}
            </div>
          ))}
        </div>
        {winner && (
          <div className="text-xl font-semibold mt-4">
            {winner === "Draw" ? "It's a draw!" : `${winner} wins!`}
          </div>
        )}
        <button
          onClick={resetGame}
          className="mt-4 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700"
        >
          Restart
        </button>
      </div>
    );
}

export default TicTactoe;