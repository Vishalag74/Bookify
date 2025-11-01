import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const ViewOrderDetail = () => {
    const params = useParams();
    const firebase = useFirebase();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs));
    }, [params.bookId, firebase]);

    return (
        <div className='container mx-auto mt-10 px-10'>
            <h1 className='text-4xl font-bold mb-10 flex justify-center'>Orders Details:</h1>
            {orders.map((order) => {
                const data = order.data();
                return (
                    <li key={order.id} className='w-md list-decimal ml-20 text-2xl font-bold mt-5 border border-black p-4 rounded-lg'>
                        <h5 className='text-2xl font-semibold'>Order By: {data.displayName || data.userEmail}</h5>
                        <h6 className='text-xl'>Qty: {data.qty}</h6>
                        <p className='text-gray-700 text-lg'>Email: {data.userEmail}</p>
                    </li>
                );
            })}
        </div>
    )
}

export default ViewOrderDetail