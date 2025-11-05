import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';
import BookCard from '../components/Card';
import Footer from '../components/Footer';

const Myorder = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ordersData, setOrdersData] = useState([]);

    useEffect(() => {
        if (firebase.isLoggedIn) {
            setLoading(true);
            firebase.getUserOrders(firebase.user.uid).then((orders) => {
                const orderData = orders.docs;
                setOrdersData(orderData);
                const uniqueBookIds = [...new Set(orderData.map(order => order.bookId))];
                const bookPromises = uniqueBookIds.map(bookId => firebase.getBookById(bookId));
                Promise.all(bookPromises).then(books => {
                    setBooks(books.map(book => ({ id: book.id, ...book.data() })));
                    setLoading(false);
                }).catch(error => {
                    console.error("Error fetching books:", error);
                    setLoading(false);
                });
            }).catch(error => {
                console.error("Error fetching orders:", error);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [firebase]);

    if (!firebase.isLoggedIn) return <h1 className='text-center text-2xl font-bold mt-10'>Please login to view your orders.</h1>

    return (
        <div className='min-h-screen flex flex-col'>
            <main className='grow py-8'>
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
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-2 md:px-4 lg:px-5 py-4 md:py-5 max-w-7xl mx-auto'>
                            {books.map((book) => {
                                // Find the order date for this book
                                const order = ordersData.find(o => o.bookId === book.id);
                                return (
                                    <BookCard
                                        link={`/books/orders/${book.id}`}
                                        key={book.id}
                                        id={book.id}
                                        {...book}
                                        orderDate={order ? order.orderDate : null}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Myorder
