"use client";

import React, { useState } from 'react'

const ReactionTimeGame = () => {
    const [isWaiting, setIsWaiting] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [reactionTime, setReactionTime] = useState(null);
    const [error, setError] = useState("");
    
    const startGame = () => {
        setIsWaiting(true);
        setIsReady(false);
        setReactionTime(null);
        setError("");

        const delay = Math.floor(Math.random() * 3000) + 2000;

        setTimeout(() => {
            setIsWaiting(false);
            setIsReady(true);
            setStartTime(Date.now());
        }, delay)
    }

    const handleClick = () => {
        if(isWaiting){
            setError("Too soon buddy, lock in and wait for the green signal");
            setIsWaiting(false);
            setIsReady(false);
        } else if(isReady) {
            const endTime = Date.now();
            setReactionTime(endTime - startTime);
            setIsReady(false);
        }
    }



  return (
    <div className="flex flex-col items-center mt-10 space-y-6">
      <h2 className="font-bold text-3xl">Reaction Time Game</h2>

      <div
        className={`w-screen h-[30rem] flex items-center justify-center cursor-pointer transition-all duration-200 ${
          isWaiting ? "bg-red-500" : isReady ? "bg-green-500" : "bg-gray-200"
        }`}
        onClick={handleClick}
      >
        {isWaiting
          ? "Wait for green..."
          : isReady
          ? "CLICK NOW!"
          : "Click to start"}
      </div>

      <button
        onClick={startGame}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow"
      >
        Start
      </button>

      {reactionTime !== null && (
        <div className="text-xl text-green-700">
          Your reaction time: {reactionTime} ms
        </div>
      )}

      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

export default ReactionTimeGame;