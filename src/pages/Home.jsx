import React, { useState } from 'react'
import { useFirebase } from '../context/Firebase';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Home = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    
    return (
        <div className='container mt-5'>
            <h1>Welcome to Bookify</h1>
            <h3>Your one-stop solution for buying and selling books online!</h3>
            <Button 
                variant="success" 
                onClick={() => navigate('/dashboard')}
            >
                Get Started
            </Button>
        </div>
    )
}

export default Home