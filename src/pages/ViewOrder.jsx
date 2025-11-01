import React, { useEffect } from 'react'
import { useFirebase } from '../context/Firebase';
import BookCard from '../components/Card';

const ViewOrder = () => {
    const firebase = useFirebase();
    const [books, setBooks] = React.useState([]);

    useEffect(() => {
        if (firebase.isLoggedIn)
            firebase.fetchMyBooks(firebase.user.uid)?.then((books) => setBooks(books.docs));
    }, [firebase]);

    if (!firebase.isLoggedIn) return <h1>Please login to view your orders.</h1>

    return (
        <div className='flex flex-wrap gap-6 m-5'>
            {books.map((book) =>
                (<BookCard link={`/books/orders/${book.id}`} key={book.id} id={book.id} {...book.data()} />))
            }
        </div>
    )
}

export default ViewOrder