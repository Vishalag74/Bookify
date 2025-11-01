import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';
import BookCard from '../components/Card';

const Myorder = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (firebase.isLoggedIn) {
            setLoading(true);
            firebase.getUserOrders(firebase.user.uid).then((orders) => {
                const orderData = orders.docs;
                const uniqueBookIds = [...new Set(orderData.map(order => order.bookId))];
                const bookPromises = uniqueBookIds.map(bookId => firebase.getBookById(bookId));
                Promise.all(bookPromises).then(books => {
                    setBooks(books.map(book => ({ id: book.id, ...book.data() })));
                    setLoading(false);
                });
            });
        } else {
            setLoading(false);
        }
    }, [firebase]);

    if (!firebase.isLoggedIn) return <h1 className='text-center text-2xl font-bold mt-10'>Please login to view your orders.</h1>

    return (
        <div className='py-8'>
            <div className='container mx-auto px-4'>
                <h1 className='text-4xl font-extrabold text-center mb-12 text-gray-900'>My Orders</h1>
                {loading ? (
                    <div className='text-center'>
                        <p className='text-xl text-gray-600 mb-4'>Loading your orders...</p>
                    </div>
                ) : books.length === 0 ? (
                    <div className='text-center'>
                        <p className='text-xl text-gray-600 mb-4'>No orders yet.</p>
                        <p className='text-gray-500'>Start shopping to see your orders here!</p>
                    </div>
                ) : (
                    <div className='flex flex-wrap justify-center gap-8'>
                        {books.map((book) =>
                            (<BookCard link={`/books/orders/${book.id}`} key={book.id} id={book.id} {...book} />))
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default Myorder
