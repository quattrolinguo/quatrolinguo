import db from '@/db';
import Link from 'next/link';

async function getQuestions(quizId) {
    const questions = await db.client.collection('questions').getFullList({
        filter: `id='${quizId}'`,
    });
    return questions;
}

export default async function QuizPage({ params }) {
    const questions = await getQuestions(params.id);
    console.log(questions)

    return (
        <main className="flex flex-col items-center justify-between p-24">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-semibold mb-8">Quizzes</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {questions?.map((question) => {
                        return <QuestionCard key={question.id} test={question} />
                    })}
                </div>
            </div>
        </main>

    );

    function QuestionCard({ question }) {
        console.log("Rendering TestCard:", { question });
        return (
            <Link href={`/quizzes/${question.id}`} key={question.id}>
                <div className="bg-white shadow-md p-6 rounded-md mb-4">
                    <h3 className="text-black text-xl font-semibold">{question.title}</h3>
                    <p className="text-gray-500">{new Date(question.created).toLocaleString()}</p>
                </div>
            </Link>
        )
    }
}