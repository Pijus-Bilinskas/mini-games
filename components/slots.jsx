"use client";

import React, { useState } from 'react'


const iconHeight = 79;
const numIcons = 9;
const iconMap = ["seven", "banana", "melon", "lemon", "bar", 'bell', "orange", "plum", "cherry"]
const fruits = ["banana", "cherry", "plum", "orange", "lemon", "melon"];

const Slots = () => {
    const [indexes, setIndexes] = useState([0, 0, 0]);
    const [spinning, setSpinning] =useState([false, false, false]);
    const [balance, setBalance] = useState(100);
    const [bet, setBet] = useState(10);
    const [message, setMessage] = useState("");

    const spin = () => {
        if(isNaN(bet) || bet <= 0 || bet > balance){
            setMessage("Invalid bet amount")
            return
        }

        setMessage("")
        const newIndexes = Array(3).fill(0).map(() => Math.floor(Math.random() * numIcons));
        setSpinning([true, true, true]);
        setBalance((prev) => prev - bet);

        const updatedIndexes = [...indexes]

        newIndexes.forEach((value, i) => {
            setTimeout(() => {
                updatedIndexes[i] = value;

                setIndexes((prev) => {
                    const next = [...prev];
                    next[i] = value;
                    return next;
                })

                setSpinning((prev) => {
                    const next = [...prev];
                    next[i] = false;
                    return next;
                });

                if(i === 2) {
                    setTimeout(() => {
                        evaluateResult(newIndexes);
                    }, 500)
                }
            }, 1000 + i * 600);
        });
    }

    const evaluateResult = ([i1, i2, i3]) => {
        const symbols = [iconMap[i1], iconMap[i2], iconMap[i3]];
        const fruitCount = symbols.filter(symb => fruits.includes(symb)).length;
        const allSame = i1 === i2 && i2 === i3;
        const allFruits = fruitCount === 3;
    
        if (allSame) {
            const symbol = symbols[0];
            let winnings = bet * 5;
    
            if (symbol === 'seven') winnings = bet * 10;
            else if (symbol === 'bar') winnings = bet * 7;
            else if (symbol === 'bell') winnings = bet * 5;
            else if (fruits.includes(symbol)) winnings = bet * 2;
    
            setBalance((prev) => prev + winnings);
            setMessage(`🎉🤯🎉 You won with ${symbol.toUpperCase()} x3! +$${winnings}`);
        } else if (allFruits) {
            const winnings = bet * 2;
            setBalance(prev => prev + winnings);
            setMessage(`🍇🍊🤯 3 fruits! +$${winnings}`);
        } else {
            setMessage("💀no match, no payout😭 Try again!😎");
        }
    };



  return (
    <div className="slot-machine">
      <div className="reels">
        {indexes.map((index, i) => (
          <div className="reel-container" key={i}>
            <div 
              className={`reel ${spinning[i] ? 'spinning' : ''}`} 
              style={{
                backgroundImage: `url(/slots.webp)`,
                backgroundPositionY: `-${index * iconHeight}px`
              }}
            />
          </div>
        ))}
      </div>

      <div className="controls">
        <input 
          type="number" 
          value={bet} 
          onChange={(e) => setBet(parseInt(e.target.value))}
          className="bet-input"
          min={1}
          max={balance}
        />
        <button className="spin-btn" onClick={spin}>SPIN</button>
        <p className="message">{message}</p>
        <p className="balance">💰 Balance: ${balance}</p>
      </div>
    </div>
  )
}

export default Slots;