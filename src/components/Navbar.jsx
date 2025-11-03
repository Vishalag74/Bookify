import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const MyNavbar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, user, signOutUser, displayName } = useFirebase();
    const [showProfile, setShowProfile] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const profileRef = useRef(null);

    const handleLogout = async () => {
        await signOutUser();
        navigate('/login');
    }

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    }

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <img src="/logo.svg" onClick={()=> navigate('/')} alt="Bookify Logo" className="h-12 cursor-pointer" />
                <div className="hidden md:flex justify-around min-w-auto gap-10">
                    <button onClick={() => navigate('/dashboard')} className="font-bold cursor-pointer text-white hover:text-blue-700">Home</button>
                    <button onClick={() => navigate('/book/list')} className="font-bold cursor-pointer text-white hover:text-blue-700">Add Listing</button>
                    <button onClick={() => navigate('/book/orders')} className="font-bold cursor-pointer text-white hover:text-blue-700">My Selling</button>
                    <button onClick={() => navigate('/book/myorders')} className="font-bold cursor-pointer text-white hover:text-blue-700">Orders</button>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={toggleProfile} className="text-white cursor-pointer p-2 rounded-full hover:bg-gray-700 ring-2 ring-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </button>
                    <button onClick={handleLogout} className="hidden md:block font-bold text-white cursor-pointer bg-red-600 py-2 px-4 rounded-full hover:bg-red-700">Log Out</button>
                    <button onClick={toggleMobileMenu} className="md:hidden text-white cursor-pointer p-2">
                        {showMobileMenu ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            {showMobileMenu && (
                <div className="md:hidden bg-gray-700 p-4">
                    <button onClick={() => { navigate('/dashboard'); setShowMobileMenu(false); }} className="block w-full text-left font-bold cursor-pointer text-white hover:text-blue-700 py-2">Home</button>
                    <button onClick={() => { navigate('/book/list'); setShowMobileMenu(false); }} className="block w-full text-left font-bold cursor-pointer text-white hover:text-blue-700 py-2">Add Listing</button>
                    <button onClick={() => { navigate('/book/orders'); setShowMobileMenu(false); }} className="block w-full text-left font-bold cursor-pointer text-white hover:text-blue-700 py-2">My Selling</button>
                    <button onClick={() => { navigate('/book/myorders'); setShowMobileMenu(false); }} className="block w-full text-left font-bold cursor-pointer text-white hover:text-blue-700 py-2">Orders</button>
                    <button onClick={handleLogout} className="block w-fit text-left font-bold text-white cursor-pointer bg-red-600 py-2 px-4 rounded-full hover:bg-red-700 mt-2">Log Out</button>
                </div>
            )}
            {showProfile && user && (
                <div ref={profileRef} className="absolute right-4 top-16 bg-white p-4 rounded-lg shadow-lg z-10">
                    <p className="text-gray-800 font-semibold">Name: {displayName || 'N/A'}</p>
                    <p className="text-gray-800">Email: {user.email}</p>
                </div>
            )}
        </nav>
    )
}

export default MyNavbar
