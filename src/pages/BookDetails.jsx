import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const BookDetailPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const firebase = useFirebase();

    const [qty, setQty] = useState(1);
    const [data, setData] = useState(null);
    const [url, setURL] = useState(null);

    useEffect(() => {
        firebase.getBookById(params.bookId).then((value) => setData(value.data()));
    }, []);

    useEffect(() => {
        if (data) {
            const imageURL = data.imageURL;
            firebase.getImageURL(imageURL).then((url) => setURL(url));
        }
    }, [data]);

    const handlePayment = async () => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.price * qty * 100, // Amount in paisa (multiply by 100)
            currency: "INR",
            name: "Bookify",
            description: `Purchase of ${data.name}`,
            image: url,
            handler: async (response) => {
                try {
                    // Payment successful, place the order
                    const result = await firebase.placeOrder(params.bookId, qty);
                    console.log("Order Placed", result);
                    navigate("/book/myorders"); // Redirect to My Orders page
                } catch (error) {
                    console.error("Error placing order:", error);
                    alert("Payment successful, but order placement failed. Please contact support.");
                }
            },
            prefill: {
                name: firebase.user.displayName,
                email: firebase.user.email,
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new Razorpay(options);
        rzp.open();
    };

    if (data == null) return <h1 className='text-center mt-5 text-2xl'>Loading...</h1>;

    return (
        <div className=" py-8 overflow-x-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden mt-20">
                    <div className="md:flex bg-white shadow-xl/20 ">
                        <div className="md:w-full p-5">
                            <img src={url} className='w-full h-96 object-contain' />
                        </div>
                        <div className="md:w-1/2 p-5">
                            <h1 className='text-3xl font-bold mb-4'>{data.name}</h1>
                            <div className="mb-4">
                                <h2 className='text-xl font-semibold mb-2 text-gray-900'>Details</h2>
                                <p className='mb-2 text-gray-900'><b>Price:</b> Rs.{data.price}</p>
                                <p className='mb-4 text-gray-900'><b>ISBN Number:</b> {data.isbnNumber}</p>
                            </div>
                            <div className="mb-4">
                                <h2 className='text-xl font-semibold mb-2 text-gray-900'>Owner Details</h2>
                                <p className='mb-2 text-gray-900'><b>Name:</b> {data.displayName}</p>
                                <p className='mb-4 text-gray-900'><b>Email:</b> {data.userEmail}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-900 mb-1">Qty</label>
                                <input
                                    onChange={(e) => setQty(e.target.value)}
                                    value={qty}
                                    type="number"
                                    className="border border-gray-600 rounded px-3 py-2 w-full bg-gray-100"
                                />
                            </div>
                            <button onClick={handlePayment} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 w-full cursor-pointer">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailPage;