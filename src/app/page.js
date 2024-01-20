"use client";

import Link from "next/link";

import { useState, useEffect } from "react";

// const getUser = async () => {
//   const cookieStore = cookies();

//   const result = await db.getUser(cookieStore);

//   return result;
// }

// async function getTests() {
//   const user = use(getUser());
//   const tests = await db.client.collection("quizzes").getList(1, 50, {
//     filter: `user == ${user.id}`,
//   });
//   console.log(tests)
//   return tests;
// }

export default function Home() {
  const [tests, setTests] = useState([]);
  const [page, setPage] = useState(1);
  const retrieveTests = async () => {
    try {
      const response = await fetch("/api/getTests", {
        method: "GET",
        headers: {  "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      setTests(data);
    } catch (error) {
      console.error('Error retrieving test:', error);
  }
  }
  retrieveTests();
  
  
    const handleNextPage = () => {
      setPage((prevPage) => prevPage + 1);
    };
  
    const handlePrevPage = () => {
      setPage((prevPage) => Math.max(prevPage - 1, 1));
    };
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1> Home Page</h1>
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
