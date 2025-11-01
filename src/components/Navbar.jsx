import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const MyNavbar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, user, signOutUser } = useFirebase();

    const handleLogout = async () => {
        await signOutUser();
        navigate('/login');
    }

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-around items-center">
                <img src="/logo.svg" alt="Bookify Logo" className="h-12 cursor-pointer" />
                <div className="flex justify-around min-w-auto gap-6">
                    <button onClick={() => navigate('/dashboard')} className="font-bold cursor-pointer text-white hover:text-blue-700">Home</button>
                    <button onClick={() => navigate('/book/list')} className="font-bold cursor-pointer text-white hover:text-blue-700">Add Listing</button>
                    <button onClick={() => navigate('/book/orders')} className="font-bold cursor-pointer text-white hover:text-blue-700">My Products</button>
                    <button onClick={() => navigate('/book/myorders')} className="font-bold cursor-pointer text-white hover:text-blue-700">Orders</button>
                </div>
                <button onClick={handleLogout} className="font-bold text-white cursor-pointer bg-red-600 py-2 px-4 rounded-full hover:bg-red-700">Log Out</button>
            </div>
        </nav>
    )
}

export default MyNavbar
