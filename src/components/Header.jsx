import React from 'react'
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <div>
            <nav className="bg-gray-800 p-4 ">
                <div className="container mx-auto flex justify-around items-center">
                    <img src="/logo.svg" alt="Bookify Logo" className="h-12 cursor-pointer" />
                    <div className="flex gap-10">
                        <button onClick={() => navigate('/login')} className="font-bold text-white cursor-pointer hover:text-gray-400">Login</button>
                        <button onClick={() => navigate('/register')} className="rounded-full bg-blue-600 cursor-pointer text-white font-bold py-2 px-4 hover:bg-blue-800 hover:text-gray-100">Sign Up</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
