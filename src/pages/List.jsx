import React, { useState, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';
import { Alert } from 'react-bootstrap';

const List = () => {
    const firebase = useFirebase();

    const [name, setName] = useState('');
    const [isbnNumber, setIsbnNumber] = useState('');
    const [price, setPrice] = useState('');
    const [coverPic, setCoverPic] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
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
        } catch (err) {
            Alert('Failed to create listing');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='container mt-5'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter Book Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control onChange={(e) => setIsbnNumber(e.target.value)} value={isbnNumber} type="text" placeholder="Enter ISBN Number" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>Price</Form.Label>
                    <Form.Control onChange={(e) => setPrice(e.target.value)} value={price} type="text" placeholder="Enter Price" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword3">
                    <Form.Label>Upload Cover Image</Form.Label>
                    <Form.Control ref={fileInputRef} onChange={(e) => setCoverPic(e.target.files[0])} type="file" />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create'}
                </Button>
            </Form>
        </div>
    )
}

export default List