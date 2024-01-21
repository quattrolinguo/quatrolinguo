"use client";
import db from '@/db';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function QuizPage({ params }) {
    const [quizData, setQuizData] = useState({ questions: [], options: {} });
    const [isLoading, setIsLoading] = useState(true); // Added loading state

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const questions = await db.getQuestionList(params.id);
                const options = {};

                for (const question of questions) {
                    const questionOptions = await db.getOptionList(question.id);
                    options[question.id] = questionOptions;
                }

                setQuizData({ questions, options });
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false); // Set loading state to false when done
            }
        }
        fetchQuestions();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-3xl font-semibold text-gray-700 animate-fade-in">Loading...</div>
            </div>
        );
    }

    return (
        <main className="flex flex-col items-center justify-between p-24">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-semibold mb-8">Questions</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quizData.questions.map((question) => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            options={quizData.options[question.id] || []}
                        />
                    ))}
                </div>
            </div>
        </main>

    );

    function QuestionCard({ question, options }) {
        return (
            <Link href={`/questions/${question.id}`} key={question.id}>
                <div className="bg-white shadow-md p-6 rounded-md mb-4">
                    <h3 className="text-black text-xl font-semibold">{question.question}</h3>
                    <p className="text-gray-500">{new Date(question.created).toLocaleString()}</p>
                    <ul>
                        {options.map((options) => (
                            <li className='text-black text-center' key={options.id}>{options.answer}</li>
                        ))}
                    </ul>
                </div>
            </Link>
        );
    }
}