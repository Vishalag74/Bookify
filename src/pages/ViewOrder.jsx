import React, { useEffect } from 'react'
import { useFirebase } from '../context/Firebase';
import BookCard from '../components/Card';

const ViewOrder = () => {
    const firebase = useFirebase();
    const [books, setBooks] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if (firebase.isLoggedIn) {
            setLoading(true);
            firebase.fetchMyBooks(firebase.user.uid)
                ?.then((books) => setBooks(books.docs))
                .finally(() => setLoading(false));
        }
    }, [firebase]);

    if (!firebase.isLoggedIn) return <h1>Please login to view your orders.</h1>

    return (
        <div className='py-8'>
            <div className='container mx-auto px-4'>
                <h1 className='text-4xl font-extrabold text-center mb-12 text-gray-900'>My Products List</h1>
                {loading ? (
                    <div className='text-center'>
                        <p className='text-xl text-gray-600 mb-4'>Loading your Products...</p>
                    </div>
                ) : books.length === 0 ? (
                    <div className='text-center'>
                        <p className='text-xl text-gray-600 mb-4'>No Products added yet.</p>
                        <p className='text-gray-500'> Add listing to see your products here!</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-2 md:px-4 lg:px-5 py-4 md:py-5 max-w-7xl mx-auto'>
                        {books.map((book) =>
                            (<BookCard link={`/books/orders/${book.id}`} key={book.id} id={book.id} {...book.data()} buttonText="View Details" />))
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewOrder