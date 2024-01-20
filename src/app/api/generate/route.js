import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(request) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": "You are a language teacher. Given a language and a number of questions, you have to generate a quiz for your students."
                },
                {
                    "role": "user",
                    "content": "Spanish. 10 Questions"
                }
            ],
            max_tokens: 64,
        });
        console.log(response.choices[0])
        return NextResponse.json(response.choices[0])
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