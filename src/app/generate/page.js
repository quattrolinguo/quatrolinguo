"use client";
import Image from "next/image";

import { useState } from 'react';

export default function Home() {
    const [language, setLanguage] = useState('');
    const [numberOfQuestions, setNumberOfQuestions] = useState('');
    const [questions, setQuestions] = useState([]);

    const generateTest = async () => {
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic, numberOfQuestions }),
            });

            const data = await response.json();
            setQuestions(data.questions);
        } catch (error) {
            console.error('Error generating test:', error);
        }
    };
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-red-400 backdrop-blur" style={{
            background: 'var(--background-gradient, linear-gradient(180deg, rgba(248, 113, 113, 1) 0%, rgba(255, 207, 36, 1) 100%))',
            backdropFilter: 'blur(2px)'
        }}>
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl mb-6 text-black">Generate quiz</h1>

                <div className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Language:</span>
                        <input
                            type="text"
                            className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter the topic"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        />
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Number of Questions:</span>
                        <input
                            type="number"
                            className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter the number of questions"
                            value={numberOfQuestions}
                            onChange={(e) => setNumberOfQuestions(e.target.value)}
                        />
                    </label>

                    <button
                        className="bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-300"
                        onClick={generateTest}
                    >
                        Generate Test
                    </button>
                </div>

                {questions.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-2xl mb-4">Generated Questions:</h2>
                        <ul className="list-disc pl-4 space-y-2">
                            {questions.map((question, index) => (
                                <li key={index} className="text-gray-700">{question}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
