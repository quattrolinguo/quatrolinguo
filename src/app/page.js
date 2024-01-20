"use client";
import Image from "next/image";

import { useState } from 'react';

export default function Home() {
  const [language, setLanguage] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState('');
  const [questions, setQuestions] = useState([]);

  const generateTest = async () => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language: language, numberOfQuestions: numberOfQuestions }),
      });

      const questions = await response.json();
      setQuestions(questions);
    } catch (error) {
      console.error('Error generating test:', error);
    }
  };
  return (
    <main className="flex flex-col items-center justify-between p-24">
    </main>
  );
}
