import React from 'react'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFirebase } from '../context/Firebase';

const MyNavbar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, user, signOutUser } = useFirebase();

    const handleLogout = async () => {
        await signOutUser();
        navigate('/login');
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="/dashboard">Home</Nav.Link>
                    <Nav.Link href="/book/list">Add Listing</Nav.Link>
                    <Nav.Link href="/book/orders">Orders</Nav.Link>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default MyNavbar