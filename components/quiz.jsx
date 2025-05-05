"use client"

import { quizQuestions } from "../constants/quiz-questions";
import { useState } from "react";

const QuizGame = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerClick = (isCorrect) => {
        if (isCorrect) {
            setScore((prev) => prev + 1);
        }

        const next = currentQuestion + 1;
        if (next < quizQuestions.length) {
            setCurrentQuestion(next);
        } else {
            setShowScore(true);
        }
    };

    const handleResetClick = () => {
        setCurrentQuestion(0);
        setShowScore(false)
        setScore(0)
        return
    }

    return (
        <div className="flex flex-col items-center justify-center my-15 p-4">
            <h2 className="text-3xl font-bold mb-4">Quiz Game</h2>
            {showScore ? (
                <div className="text-xl flex flex-col gap-3 my-5 font-semibold">
                    You scored {score} out of {quizQuestions.length}
                    <button className="bg-blue-900 text-white rounded-2xl py-1 cursor-pointer hover:bg-blue-800" onClick={handleResetClick}>Retry</button>
                </div>
            ) : (
                <div className="w-full max-w-lg bg-white shadow-lg p-6 rounded-xl">
                    <h4 className="text-xl font-semibold mb-4">
                        {quizQuestions[currentQuestion].question}
                    </h4>
                    <div className="flex flex-col gap-2">
                        {quizQuestions[currentQuestion].answers.map((answer, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerClick(answer.correctAnswer)}
                                className="bg-amber-500 shadow text-gray-50 text-lg font-semibold py-2 px-4 rounded hover:bg-amber-600 transition"
                            >
                                {answer.answer}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuizGame;