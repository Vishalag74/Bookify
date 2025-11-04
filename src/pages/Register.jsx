import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useFirebase } from '../context/Firebase';
import Header from '../components/Header';

const Register = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate("/dashboard");
        }
    }, [firebase, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await firebase.signupUserWithEmailAndPassword(email, password, fullName)
    }

    return (
        <div className="h-screen overflow-y-hidden flex flex-col">
            <Header />
            <div className='flex items-center justify-center flex-1 px-4 sm:px-0'>
                <div className='w-full max-w-xs sm:max-w-sm md:max-w-md p-4 sm:p-6 bg-white rounded-lg shadow-blue-200 shadow-2xl'>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div className='flex justify-center text-xl sm:text-2xl font-serif font-bold my-6'>Signup</div>
                        <div>
                            <label htmlFor="fullName" className='block text-sm font-medium text-gray-700'>Full Name</label>
                            <input
                                id="fullName"
                                onChange={(e) => setFullName(e.target.value)}
                                value={fullName}
                                type="text"
                                placeholder="Enter full name"
                                required
                                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email address</label>
                            <input
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                placeholder="Enter email"
                                required
                                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                We'll never share your email with anyone.
                            </p>
                        </div>
                        <div>
                            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
                            <div className='relative'>
                                <input
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    required
                                    className='mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer'
                        >
                            Create Account
                        </button>
                    </form>
                    <div className='flex justify-center'>-- or --</div>
                    <div className='mt-1 text-center'>
                        <button
                            onClick={firebase.signInWithGoogle}
                            className='w-full mt-2 bg-red-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-red-700'
                        >
                            Sign in with Google
                        </button>
                    </div>
                    <div className='mt-4 text-center'>
                        Already have an account?👉  <span className='text-blue-600 cursor-pointer' onClick={(e) => navigate("/login")}>Login</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register