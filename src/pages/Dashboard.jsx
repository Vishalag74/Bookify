import React, { useState } from 'react'
import { useEffect } from 'react';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from "react-router-dom";
import BookCard from '../components/Card';
import CardGroup from 'react-bootstrap/CardGroup';

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
    
    return (
        <div className='container mt-5'>
            <CardGroup>
                {books.map((book) => (
                    <BookCard link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()} value="buy" />
                ))}
            </CardGroup>
        </div>
    )
}

export default Dashboard