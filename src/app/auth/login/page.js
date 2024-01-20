'use client';
import { useRouter } from 'next/navigation';
import React from 'react'

function LoginPage() {
    const route = useRouter();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const form = { email, password };
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (!response.ok) {
                setError('Failed to authenticate user');
                return;
            };
            const data = await response.json();
            if (data?.token) {
                route.push('/');
            } else {
                setError('Failed to authenticate user');
            }
        } catch (err) {
            setEmail('Failed to authenticate user');
        }
    };

    return (
        <div>
            <div className="body-bg pt-12 md:pt-20 pb-6 px-2 md:px-0 font-light flex-auto">
                <div className="bg-white max-w-xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                    <section>
                        <h1 className="text-3xl text-black font-bold">Login</h1>
                    </section>

                    <section className="mt-5">
                        <form className="space-y-5 flex flex-col" action="POST" onSubmit={onSubmit}>
                            <label className="">
                                <span className="text-gray-700">Email:</span>
                                <input
                                    type="email"
                                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 text-black"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>

                            <label className="">
                                <span className="text-gray-700">Password:</span>
                                <input
                                    type="password"
                                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 text-black"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>

                            <div>
                                <button
                                    className="items-center bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-300 font-normal py-2 shadow-lg hover:shadow-xl transition duration-200"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </section>

                </div>
            </div>
        </div>
    )
}

export default LoginPage