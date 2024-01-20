import Link from "next/link";
import db from "../db";
import { cookies } from "next/headers";

async function getTests() {
  const cookieStore = cookies();
  const user = await db.getUser(cookieStore)
  // const tests = await db.client.collection("quizzes").getFullList({
  //   sorted: 'created_at',
  // })
  const tests = await db.client.collection("quizzes").getFullList({
    filter: `user='${user.id}'`,
  })
  return tests;
}

export default async function Home() {
  const tests = await getTests();
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-8">Quizzes</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tests?.map((test) => {
            return <TestCard key={test.id} test={test} />
          })}
        </div>

      </div>
      <Link href="/generate">Create test</Link>
    </main>

  );
}

function TestCard({ test }) {
  return (
    <Link href={`/quizzes/${test.id}`} key={test.id}>
      <div className="bg-white shadow-md p-6 rounded-md mb-4">
        <h3 className="text-black text-xl font-semibold">{test.title}</h3>
        <p className="text-gray-500">{new Date(test.created).toLocaleString()}</p>
      </div>
    </Link>
  )
}