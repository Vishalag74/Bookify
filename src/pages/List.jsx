import React, { useState, useRef } from 'react'
import { useFirebase } from '../context/Firebase';
import { useNavigate } from "react-router-dom";

const List = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [isbnNumber, setIsbnNumber] = useState('');
    const [price, setPrice] = useState('');
    const [coverPic, setCoverPic] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
            // clear fields on success
            setName('');
            setIsbnNumber('');
            setPrice('');
            setCoverPic('');
            if (fileInputRef.current) fileInputRef.current.value = '';
            setAlertMessage('Listing created successfully!');
        } catch (err) {
            setAlertMessage('Failed to create listing');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex items-start justify-center pt-16 md:pt-24 pb-8 md:pb-12 px-4">
            <div className='w-full max-w-lg md:max-w-md flex items-center justify-center'>
                <div className="w-full bg-white p-4 md:p-6 rounded-lg shadow-2xl">
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <div className='flex justify-center text-xl md:text-2xl font-serif font-bold my-4 md:my-6'>List a Book</div>
                        {alertMessage && (
                            <div className={`p-3 md:p-4 rounded-md text-sm md:text-base ${alertMessage.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {alertMessage}
                            </div>
                        )}
                        <div>
                            <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Book Name</label>
                            <input
                                id="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text"
                                placeholder="Enter Book Name"
                                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base'
                            />
                        </div>
                        <div>
                            <label htmlFor="isbn" className='block text-sm font-medium text-gray-700'>ISBN</label>
                            <input
                                id="isbn"
                                onChange={(e) => setIsbnNumber(e.target.value)}
                                value={isbnNumber}
                                type="text"
                                placeholder="Enter ISBN Number"
                                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base'
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className='block text-sm font-medium text-gray-700'>Price</label>
                            <input
                                id="price"
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                type="text"
                                placeholder="Enter Price"
                                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base'
                            />
                        </div>
                        <div>
                            <label htmlFor="coverPic" className='block text-sm font-medium text-gray-700'>Upload Cover Image</label>
                            <input
                                id="coverPic"
                                ref={fileInputRef}
                                onChange={(e) => setCoverPic(e.target.files[0])}
                                type="file"
                                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base'
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm md:text-base cursor-pointer'
                        >
                            {isSubmitting ? 'Creating...' : 'Create'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default List
