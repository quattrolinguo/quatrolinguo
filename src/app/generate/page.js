"use client";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import DropdownDifficulty from "../components/Dropdowns/DropdownDifficulty";
import { useState, useEffect } from 'react';

export default function Home() {
    const router = useRouter();
    const [language, setLanguage] = useState('');
    const [numberOfQuestions, setNumberOfQuestions] = useState('');
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [difficulty, setDifficulty] = useState('A1');
    const [loading, setLoading] = useState(false);
    const handleDifficultyChange = (newDifficulty) => {
        setDifficulty(newDifficulty);
      };

    const generateTest = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ language, numberOfQuestions, title, difficulty }),
            });

            const data = await response.json();
            setLoading(false);
            router.push('/');
            console.log(data)
        } catch (error) {
            console.error('Error generating test:', error);
            setLoading(false);
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
                        <label className="">
                            <span className="text-gray-700">Title:</span>
                            <input
                                type="text"
                                className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 text-black"
                                placeholder="Enter the title of your custom quiz"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        {/* <label className="">
                        {/* <label className="" onMouseEnter={() => { document.getElementById('dropdown-container').style.display = 'inline' }}
                            onMouseLeave={() => {document.getElementById('dropdown-container').style.display = 'none';}}> 
                            <span className="text-gray-700">Difficulty:</span>
                            
                            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} id="dropdown" name="dropdown" placeholder="Choose the difficulty of your quiz" className="mt-1 block w-full p-2 border ease-in-out transform hover:bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black">
                               
                                    <option className="text-black" value="option1">A1</option>
                                    <option className="text-black" value="option2">A2</option>
                                    <option className="text-black" value="option3">B1</option>
                                    <option className="text-black" value="option4">B2</option>
                                    <option className="text-black" value="option5">C1</option>
                                    <option className="text-black" value="option6">C2</option>
                              
                            </select>
                            
                        </label> */}
                        <DropdownDifficulty onDifficultyChange = {handleDifficultyChange} />

                        <div>
                            <button
                                className="items-center bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-300 font-normal py-2 shadow-lg hover:shadow-xl transition duration-200"
                                onClick={generateTest}
                            >
                                {loading ? (
                                    <div className="flex">
                                        <div className="animate-spin h-5 w-5 mt-0.5 border-2 rounded-lg border-white"></div>
                                        <span className="ml-2">Generating...</span>
                                    </div>
                                ) : (
                                    'Generate Test'
                                )}
                            </button>
                        </div>
                    </div>
                </section>
                <div>

                </div>
            </div>
        </div>
    );
}
