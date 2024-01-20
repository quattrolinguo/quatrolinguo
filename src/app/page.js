"use client";

import Link from "next/link";
import db from "../db";
import { cookies } from "next/headers";

async function getTests() {
  const cookieStore = cookies();
  const user = await db.getUser(cookieStore)
  // const tests = await db.client.collection("quizzes").getFullList({
  //   sorted: 'created_at',
  // })
  console.log(user.id)
  const tests = await db.client.collection("quizzes").getFullList({
    filter: `user='${user.id}'`,
  })
  return tests;
}

export default async function Home() {
  const tests = await getTests();
  console.log(tests)
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1> Home Page</h1>
      {tests.map((test) => {
        return (
          <div key={test.id}>
            <div>{test.title}</div>
            <div>{test.language}</div>
            <div>{test.questions}</div>
            <div>{test.user}</div>
          </div>
        )
      })}
      <Link href="/generate">Create test</Link>
      <div>
      <h1>Tests</h1>
      <ul>
        {tests.map((test) => (
          <li key={test.id}>{/* Render your test data here */}</li>
        ))}
      </ul>
      <button onClick={handlePrevPage} disabled={page === 1}>
        Previous Page
      </button>
      <button onClick={handleNextPage}>Next Page</button>
    </div>
    </main>
    
  );
}
