import React from 'react'
import { useFirebase } from '../context/Firebase';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';

const Home = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen min-w-screen">
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <img src="/logo.svg" alt="Bookify Logo" className="h-12 cursor-pointer" />
                    <div className="flex gap-10">
                        <button onClick={() => navigate('/login')} className="font-bold text-white hover:text-blue-700">Login</button>
                        <button onClick={() => navigate('/register')} className="bg-blue-600 rounded-4xl font-bold text-white px-4 py-2 hover:bg-blue-700">Sign Up</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="h-fit min-w-screen bg-linear-to-b from-blue-500 to-blue-800 container mx-auto px-4 py-16 flex items-center justify-around">
                <div className="leading-relaxed space-y-12">
                    <span className='text-6xl font-serif text-gray-900 font-extrabold'>Bookify</span><br />
                    <span className='text-5xl text-white font-medium italic'>your</span><br />
                    <span className='text-5xl text-white font-bold'>ONLINE BOOK STORE</span><br />
                    <p className="text-3xl font-light text-white italic">
                        Read What you love, love what you read
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-white w-max text-blue-600 px-8 py-3 font-bold rounded-4xl hover:bg-black transition duration-300"
                    >
                        Get Started
                    </button>
                </div>
                <div className="">
                    <img
                        src="/reading_guy.svg"
                        alt="Person reading"
                        className="h-96 w-auto object-contain"
                    />
                </div>
            </div>

            {/* Features Section */}
            <div className=" bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl bg-gray-200 py-2 rounded-2xl font-bold text-center text-gray-800 mb-12">Why Choose Bookify?</h2>
                    <div className="grid grid-cols-3 gap-8">
                        <div className="text-center p-5 shadow-lg rounded-2xl">
                            <div className="text-blue-600 text-4xl mb-3">💰</div>
                            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                            <p className="text-gray-600">Enjoy competitive prices and regular discounts</p>
                        </div>
                        <div className="text-center p-5 shadow-lg rounded-2xl">
                            <div className="text-blue-600 text-4xl mb-3">📚</div>
                            <h3 className="text-xl font-semibold mb-2">Vast Collection</h3>
                            <p className="text-gray-600">Access thousands of books across different genres</p>
                        </div>
                        <div className="text-center p-5 shadow-lg rounded-2xl">
                            <div className="text-blue-600 text-4xl mb-3">🔒</div>
                            <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                            <p className="text-gray-600">Encrypted payments, trusted gateways, and buyer protection for safe checkout</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Home