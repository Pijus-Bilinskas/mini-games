"use client";

import React, { useEffect, useState } from 'react'

const AimTrainer = () => {
    const [timeLimit, setTimeLimit] = useState(30);
    const [targetLimit, setTargetLimit] = useState(10);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [isPlaying, setIsPlaying] = useState(false);
    const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 })
    const [gameResultText, setGameResultText] = useState("");


    const startGameClick = () => {
        setScore(0);
        setTimeLeft(timeLimit)
        setIsPlaying(true)
        setGameResultText("")
        moveTarget();
    }

    const handleTargetClick = () => {
        if(!isPlaying) return;

        const newScore = score + 1;
        setScore(newScore)

        if(newScore >= targetLimit) {
            endGame();
            setGameResultText(`Good job🤙 you got a score of ${newScore}`)
        } else {
            moveTarget();
        }
    }

    useEffect(() => {
        if(isPlaying && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearTimeout(timer)
        }

        if(timeLeft === 0 && isPlaying) {
            endGame();
            setGameResultText(`out of time⏱️ Try again😎`)
        }
    }, [isPlaying, timeLeft]);

    const endGame = () => {
        setIsPlaying(false);
    }

    const moveTarget = () => {
        const x = Math.random() * 90;
        const y = Math.random() * 80;
        setTargetPosition({ x, y })
    }

  return (
    <div className='flex flex-col justify-center gap-3 items-center'>
        <h2 className='font-bold text-4xl text-center'>Aim Trainer</h2>
        <div className='flex justify-center gap-5 items-center'>
            <select className='bg-gray-400 font-semibold px-2 py-1 rounded-lg text-white' value={timeLimit} onChange={(e) => setTimeLimit(Number(e.target.value))}>
                <option value={15}>15s</option>
                <option value={30}>30s</option>
                <option value={60}>60s</option>
            </select>

            <select className='bg-gray-400 font-semibold px-2 py-1 rounded-lg text-white' value={targetLimit} onChange={(e) => setTargetLimit(Number(e.target.value))}>
                <option value={5}>5 Targets</option>
                <option value={10}>10 Targets</option>
                <option value={20}>20 Targets</option>
            </select>
            <button className='font-semibold bg-green-800 px-2 py-1 rounded-2xl hover:cursor-pointer hover:bg-green-700' onClick={startGameClick}>Start</button>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <p className='font-bold text-lg'>{timeLeft}s left</p>
            <p className='font-semibold text-lg'>{gameResultText}</p>
        </div>

            <div className=' relative w-screen min-h-150 bg-gray-500'>
                {isPlaying && (
                    <button onClick={handleTargetClick} className='h-12 w-12 cursor-pointer bg-red-600 rounded-full absolute'
                style={{
                    left: `${targetPosition.x}%`,
                    top: `${targetPosition.y}%`,
                }}
                ></button>
            )}
            </div>
    </div>
  )
}

export default AimTrainer;