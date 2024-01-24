"use client";
import db from '@/db';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function LoadingAnimation() {
    return (
        <div className='body-bg pt-12 md:pt-20 pb-6 px-2 md:px-0 font-light flex-auto'>
            <div className="flex items-center justify-center h-full mx-auto  my-48">
                <div className="animate-spin h-8 w-8 mt-0.5 border-2 rounded-lg border-white"></div>
                <div className="ml-4 text-4xl font-bold text-white">Loading...</div>
            </div>
        </div>
    );
}

export default function QuizPage({ params }) {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Added loading state
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (optionId) => {
        setSelectedOption(optionId);
    };

    useEffect(() => {
        async function fetchQuestions() {
            try {
                // const questions = await db.getQuestionList(params.id);
                // const options = {};

                // for (const question of questions) {
                //     const questionOptions = await db.getOptionList(question.id);
                //     options[question.id] = questionOptions;
                // }

                // setQuizData({ questions, options });
                const quizData = await db.getQuizData(params.id);
                setQuizData(quizData)

            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false); // Set loading state to false when done
            }
        }
        fetchQuestions();
    }, [params.id]);

    const handleNext = () => {
        setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, quizData.length - 1));
    };

    const handlePrev = () => {
        setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    if (isLoading) {
        return <LoadingAnimation />;
    }

    return (
        <main className="body-bg pt-12 md:pt-20 pb-6 px-2 md:px-0 font-light flex-auto">
            <div className="bg-white max-w-xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                <section>
                    <h1 className="text-3xl font-semibold text-black">Questions</h1>
                </section>

                <section>
                    <div className="">
                        {quizData.length > 0 && (
                            <QuizCard
                                question={quizData[currentQuestionIndex][0]}
                                options={quizData[currentQuestionIndex][1] || []}
                            />
                        )}
                    </div>

                    <div className="flex justify-between mt-4">
                        <button
                            className="items-center bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-300 font-normal py-2 shadow-lg hover:shadow-xl transition duration-200"
                            onClick={handlePrev}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        <button
                            className="items-center bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-300 font-normal py-2 shadow-lg hover:shadow-xl transition duration-200"
                            onClick={handleNext}
                            disabled={currentQuestionIndex === quizData.length - 1}
                        >
                            Next
                        </button>
                    </div>
                </section>
            </div>
        </main>

    );

    function QuizCard({ question, options }) {
        return (
            <div className="bg-white p-6 rounded-md mb-4  ">
                <h3 className="text-black text-xl font-semibold">{question.question}</h3>
                <p className="text-gray-500 text-xs">{new Date(question.created).toLocaleString()}</p>
                <ul>
                    {options.map((option) => (
                        <li key={option.id} className='text-black text-center'>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    checked={selectedOption === option.id}
                                    onChange={() => handleOptionChange(option.id)}
                                    className="mr-2"
                                />
                                {option.answer}
                            </label>
                        </li>
                    ))}

                </ul>
            </div>
        );
    }
}