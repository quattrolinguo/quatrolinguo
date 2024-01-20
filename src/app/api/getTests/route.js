import db from '../../../db';
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";
import { use } from 'react';
const getUser = async () => {
    const cookieStore = cookies();
  
    const result = await db.getUser(cookieStore);
  
    return result;
  }

export async function GET(request) {
    const user = use(getUser());
    try {
        const user = use(getUser());
        const tests = await db.client.collection("quizzes").getList(1, 50, {
            filter: `user == ${user.id}`,
            }); 
            console.log(tests)
            console.log("hello, checking");

        return NextResponse.json(tests);
    } catch (err) {
        return new Response(
            JSON.stringify({ error: err.message || err.toString() }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
    }
}