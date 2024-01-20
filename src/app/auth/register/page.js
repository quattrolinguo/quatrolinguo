'use client';
import { useRouter } from 'next/navigation';
import React from 'react'

function RegisterPage() {
    const route = useRouter();
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const form = { username, email, password };
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            console.log(response);
            if (!response.ok) {
                setError('Failed to register user');
                return;
            };
            const data = await response.json();
            console.log(data);
            route.push('/auth/login');
        } catch (err) {
            setEmail('Failed to register user');
        }
    };

    return (
        <div>
            <div className="body-bg pt-12 md:pt-20 pb-6 px-2 md:px-0 font-light flex-auto">
                <div className="bg-white max-w-xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                    <section>
                        <h1 className="text-3xl text-black font-bold">Register</h1>
                    </section>

                    <section className="mt-5">
                        <form className="space-y-5 flex flex-col" action="POST" onSubmit={onSubmit}>
                            <label className="">
                                <span className="text-gray-700">Username:</span>
                                <input
                                    type="text"
                                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 text-black"
                                    placeholder="Enter a username"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </label>

                            <label className="">
                                <span className="text-gray-700">Email:</span>
                                <input
                                    type="email"
                                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 text-black"
                                    placeholder="Enter your email"
                                    id="email"
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
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>

                            <div>
                                <button
                                    className="items-center bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-300 font-normal py-2 shadow-lg hover:shadow-xl transition duration-200"
                                    type="submit"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </section>
                    {error && <p className='text-black'>{error}</p>}

                </div>
            </div>
        </div>
    )
}

export default RegisterPage