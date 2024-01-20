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
                body: JSON.stringify({ language, numberOfQuestions }),
            });

            const data = await response.json();
            setQuestions(data.questions);
        } catch (error) {
            console.error('Error generating test:', error);
        }
    };
    return (
        <div className="body-bg pt-12 md:pt-20 pb-6 px-2 md:px-0 font-light flex-auto">
            <div className="bg-white max-w-xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                <section>
                    <h1 className="text-3xl text-black font-bold">Generate Quiz</h1>
                </section>

                <section className="mt-5">
                    <div className="space-y-5 flex flex-col">
                        <label className="">
                            <span className="text-gray-700">Language:</span>
                            <input
                                type="text"
                                className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 text-black"
                                placeholder="Enter the topic"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            />
                        </label>

                        <label className="">
                            <span className="text-gray-700">Number of Questions:</span>
                            <input
                                type="number"
                                className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 text-black"
                                placeholder="Enter the number of questions"
                                value={numberOfQuestions}
                                onChange={(e) => setNumberOfQuestions(e.target.value)}
                            />
                        </label>

                        <div>
                            <button
                                className="items-center bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-300 font-normal py-2 shadow-lg hover:shadow-xl transition duration-200"
                                onClick={generateTest}
                            >
                                Generate Test
                            </button>
                        </div>
                    </div>
                </section>

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
