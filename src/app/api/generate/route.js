import OpenAI from "openai";
import { NextResponse } from "next/server";
import db from "../../../db";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(request) {
    const body = await request.json();
    console.log(body);
    const { language, numberOfQuestions } = body;
    const prompt = `The language is ${language} and the number of questions is ${numberOfQuestions}`
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            response_format: { type: "json_object" },
            messages: [
                {
                    "role": "system",
                    "content": "You are a language teacher. Given a language and a number of questions, you have to generate a multiple choice quiz for your students in that language's proficiency in JSON format. Focus on grammar and subject verb agreement. Always format JSON in {language, questions[]} format"
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens: 400,
        });
        const content = response.choices[0].message.content;
        const { questions } = JSON.parse(content);
        console.log(questions);
        await db.generateQuiz(questions);
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