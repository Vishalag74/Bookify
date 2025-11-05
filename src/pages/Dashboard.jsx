import React, { useState } from 'react'
import { useEffect } from 'react';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from "react-router-dom";
import BookCard from '../components/Card';
import Footer from '../components/Footer';

const Dashboard = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (firebase.isLoggedIn)
            firebase.listAllBooks().then((books) => setBooks(books.docs))
    }, [firebase])

    useEffect(() => {
        if (!firebase.isLoggedIn) {
            <h1>Please login to view available books.</h1>
            navigate("/login");
        }
    }, [firebase, navigate])

    if (!books.length) return <h1 className='text-center mt-5 text-2xl'>Loading...</h1>;


    return (
        <div className='min-h-screen flex flex-col'>
            <main className='grow'>
                <div className='container mx-auto px-4 py-8'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {books.map((book) => (
                            <BookCard link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()} buttonText="Shop" />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Dashboard