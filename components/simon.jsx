"use client";

import React, { useEffect, useState } from 'react'

const SimonSay = () => {
    const [simonsSaid, setSimonSaid] = useState([]);
    const [userSaid, setUserSaid] = useState([]);
    const [gameLost, setGameLost] = useState(false);
    const [activeButton, setActiveButton] = useState(null);


    const handleStartGameClick = () => {
        const firstMove = Math.floor(Math.random() * 4) + 1;;
        setSimonSaid([firstMove]);
        setUserSaid([]);
        setGameLost(false);
    }
    
    const handleGameClick = (colorNumber) => {
        flashButton(colorNumber)

        setUserSaid(prev => {
            const newUserSaid = [...prev, colorNumber];

            for(let i = 0; i < newUserSaid.length; i++) {
                if(newUserSaid[i] !== simonsSaid[i]) {
                    setGameLost(true);
                    setSimonSaid([]);
                    setUserSaid([]);
                    return [];
                }
            }

            if(newUserSaid.length === simonsSaid.length) {
                setTimeout(() => {
                    const nextMove = Math.floor(Math.random() * 4) + 1;;
                    setSimonSaid(prevSimon => [...prevSimon, nextMove]);
                    setUserSaid([]);
                }, 500)
            }
            return newUserSaid;
        })
    }

    const flashButton = (buttonNumber) => {
        setActiveButton(buttonNumber);
        setTimeout(() => {
            setActiveButton(null)
        }, 800)
    }


    useEffect(() => {
        if(simonsSaid.length > 0 && userSaid.length === 0) {
            let i = 0;

            const interval = setInterval(() => {
                flashButton(simonsSaid[i]);
                i++;
                if(i >= simonsSaid.length) {
                    clearInterval(interval)
                }
            }, 900)
        }
        console.log(simonsSaid)
    }, [simonsSaid])


  return (
    <div className='flex flex-col gap-5 items-center my-8 justify-center'>
        <h2 className='font-bold text-3xl'>Simon Says</h2>
        {gameLost && <p>Wrong move! game over☹️</p>}
        <div className='grid mt-15 grid-cols-2 gap-4 rotate-45'>
            <button onClick={() => handleGameClick(1)} className={`w-26 h-26 ${activeButton === 1 ? "brightness-200" : ""} bg-yellow-500`}></button>
            <button onClick={() => handleGameClick(2)} className={`w-26 h-26 ${activeButton === 2 ? "brightness-200" : ""} bg-red-800`} ></button>
            <button onClick={() => handleGameClick(3)} className={`w-26 h-26 ${activeButton === 3 ? "brightness-200" : ""} bg-green-800`} ></button>
            <button onClick={() => handleGameClick(4)} className={`w-26 h-26 ${activeButton === 4 ? "brightness-200" : ""} bg-blue-800`}></button>
        </div>
        <button onClick={handleStartGameClick} className='mt-15 font-semibold bg-blue-800 text-white text-lg cursor-pointer hover:bg-blue-700 px-4 py-2 rounded-xl'>start game</button>
    </div>
  )
}

export default SimonSay; 