import OpenAI from "openai";
import { NextResponse } from "next/server";
import db from "../../../db";
import { cookies } from "next/headers";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(request) {
    const body = await request.json();
    const cookieStore = cookies();
    const user = await db.getUser(cookieStore);
    console.log(body);
    const { language, numberOfQuestions, title, difficulty } = body;
    const prompt = `The language is ${language} and the number of questions is ${numberOfQuestions}. It should be ${difficulty} difficulty.}`
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            response_format: { type: "json_object" },
            messages: [
                {
                    "role": "system",
                    "content": "You are a language teacher. Given a language and a number of questions, you have to generate a multiple choice quiz for your students in that language's proficiency in JSON format. Focus on grammar and subject verb agreement. Always format JSON in {language:'language', questions:[{question : 'question', options: ['options'], answer: 'answer'}]} format for each question in the quiz. Please double check that the answer is accurate."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens: 400,
        });
        console.log(response);
        const content = response.choices[0].message.content;
        const { questions } = JSON.parse(content);
        console.log(questions);
        await db.generateQuiz(user.id, questions, title, language);
        return NextResponse.json(questions)
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
    }

}