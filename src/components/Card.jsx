import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const BookCard = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [url, setURL] = useState(null);

    useEffect(() => {
        firebase.getImageURL(props.imageURL).then((url) => setURL(url));
    }, [props.imageURL, firebase]);

    return (
        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <div className='p-4'>
                <img
                    className="w-full h-32 md:h-48 object-contain"
                    src={url || undefined}
                    alt={props.name}
                />
                <div className="pt-3 md:pt-4">
                    <h5 className="text-lg md:text-xl font-bold mb-2">{props.name}</h5>
                    <p className="text-gray-700 text-sm md:text-base">
                        Seller: Mr. {props.displayName}
                    </p>
                    <p className="text-gray-700 mb-4 text-sm md:text-base">
                        Price: Rs.{props.price}
                    </p>
                    {props.orderDate ? (
                        <p className="text-gray-700 text-sm md:text-base font-medium">
                            Ordered on: {props.orderDate.seconds ? new Date(props.orderDate.seconds * 1000).toLocaleString() : 'Date not available'}
                        </p>
                    ) : (
                        <button className="w-full cursor-pointer bg-blue-500 text-white px-3 py-2 md:px-4 md:py-2 rounded hover:bg-blue-600 text-sm md:text-base" onClick={e => navigate(props.link)}>{props.buttonText}</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BookCard