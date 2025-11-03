import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const ViewOrderDetail = () => {
    const params = useParams();
    const firebase = useFirebase();

    const [orders, setOrders] = useState([]);
    const [book, setBook] = useState(null);

    useEffect(() => {
        firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs));
        firebase.getBookById(params.bookId).then((book) => setBook(book.data()));
    }, [params.bookId, firebase]);

    return (
        <div className='container mx-auto mt-8 md:mt-10 px-4 md:px-10'>
            <h1 className='text-2xl md:text-4xl font-bold mb-6 md:mb-10 flex justify-center'>"{book ? book.name : 'Book'}" Order Details</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                {orders.map((order) => {
                    const data = order.data();
                    return (
                        <div key={order.id} className='bg-white shadow-lg rounded-lg p-4 md:p-6 border border-gray-200'>
                            <h5 className='text-lg md:text-xl font-semibold mb-2'>Order By: {data.displayName || data.userEmail}</h5>
                            <h6 className='text-base md:text-lg font-medium mb-1'>Qty: {data.qty}</h6>
                            <p className='text-gray-700 text-sm md:text-base mb-1'>Email: {data.userEmail}</p>
                            {data.orderDate && (
                                <p className='text-gray-700 text-sm md:text-base'>Ordered on: {new Date(data.orderDate.seconds * 1000).toLocaleString()}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ViewOrderDetail