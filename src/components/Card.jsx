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
        <div className="w-72 m-6 bg-white shadow-xl/20 rounded-lg overflow-hidden">
            <div className='p-5'>
                <img
                    className="w-full h-48 object-contain"
                    src={url || undefined}
                    alt={props.name}
                />
                <div className="pt-4">
                    <h5 className="text-xl font-bold mb-2">{props.name}</h5>
                    <p className="text-gray-700">
                        Seller: Mr. {props.displayName}
                    </p>
                    <p className="text-gray-700 mb-4">
                        Price: Rs.{props.price}
                    </p>
                    <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={e => navigate(props.link)}>View</button>
                </div></div>
        </div>
    )
}

export default BookCard