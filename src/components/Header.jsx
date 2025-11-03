import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <img src="/logo.svg" onClick={() => navigate('/')} alt="Bookify Logo" className="h-12 cursor-pointer" />
                    {/* Desktop buttons */}
                    <div className="hidden lg:flex gap-10">
                        <button onClick={() => navigate('/login')} className="font-bold text-white cursor-pointer hover:text-gray-400">Login</button>
                        <button onClick={() => navigate('/register')} className="rounded-full bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 hover:bg-blue-800 hover:text-gray-100">Sign Up</button>
                    </div>
                    {/* Hamburger button for mobile/tablet */}
                    <button onClick={toggleMenu} className="lg:hidden text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-gray-700 mt-4 p-4 flex flex-col items-center">
                        <button onClick={() => { navigate('/login'); setIsMenuOpen(false); }} className="block text-center font-bold text-white cursor-pointer hover:text-gray-400 mb-2">Login</button>
                        <button onClick={() => { navigate('/register'); setIsMenuOpen(false); }} className="block text-center rounded-full bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 hover:bg-blue-800 hover:text-gray-100">Sign Up</button>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default Header
