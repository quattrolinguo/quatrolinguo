import Image from "next/image";
import Logout from "./components/logout";
import Link from "next/link";
import db from "@/db";
import { use } from "react";

const getUser = async () => {
  const cookieStore = cookies();

  const result = await db.getUser(cookieStore);

  return result;
}

async function getTests() {
  const user = use(getUser());
  const tests = await db.client.collection("quizzes").getList(1, 50, {
    filter: `user == ${user.id}`,
  });
  console.log(tests)
  return tests;
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1> Home Page</h1>
      <Link href="/generate">Create test</Link>
    </main>
  );
}
