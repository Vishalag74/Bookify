import React from 'react'
import { useFirebase } from '../context/Firebase';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className='grow'>
                {/* Hero Section */}
                <div className="h-fit bg-linear-to-r from-blue-300 to-blue-600 w-full py-8 md:py-16 flex flex-col md:flex-row items-center justify-around px-4">
                    <div className="leading-relaxed space-y-6 text-center md:text-left">
                        <span className='text-4xl md:text-6xl font-serif text-blue-600 font-extrabold'>Bookify</span><br />
                        <span className='text-3xl md:text-5xl text-white font-medium italic'>your</span><br />
                        <span className='text-3xl md:text-5xl text-white font-bold'>ONLINE BOOK STORE</span><br />
                        <p className="text-xl md:text-3xl mt-4 font-light text-white italic">
                            Read What you love, love what you read
                        </p>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="rounded-full text-white w-max bg-blue-600 px-6 md:px-8 py-2 md:py-3 font-bold hover:bg-blue-800 hover:text-gray-100 transition duration-300 cursor-pointer"
                        >
                            Get Started
                        </button>
                    </div>
                    <div className="hidden md:block">
                        <img
                            src="/reading_guy.svg"
                            alt="Person reading"
                            className="h-64 md:h-96 w-auto object-contain"
                        />
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-8 md:py-16 w-full">
                    <div className="px-4">
                        <h2 className="text-2xl md:text-3xl bg-gray-300 py-2 rounded-2xl font-bold text-center text-gray-800 mb-8">Why Choose Bookify?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            <div className="text-center bg-white p-4 md:p-5 shadow-xl/20 rounded-2xl">
                                <div className="text-blue-600 text-3xl md:text-4xl mb-3">💰</div>
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Best Prices</h3>
                                <p className="text-gray-600 text-sm md:text-base">Enjoy competitive prices and regular discounts</p>
                            </div>
                            <div className="text-center bg-white p-4 md:p-5 shadow-xl/20 rounded-2xl">
                                <div className="text-blue-600 text-3xl md:text-4xl mb-3">📚</div>
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Vast Collection</h3>
                                <p className="text-gray-600 text-sm md:text-base">Access thousands of books across different genres</p>
                            </div>
                            <div className="text-center bg-white p-4 md:p-5 shadow-xl/20 rounded-2xl">
                                <div className="text-blue-600 text-3xl md:text-4xl mb-3">🔒</div>
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Secure Transactions</h3>
                                <p className="text-gray-600 text-sm md:text-base">Encrypted payments and trusted gateways for safe checkout</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Home