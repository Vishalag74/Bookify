import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/Firebase';

const BookCard = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [url, setURL] = useState(null);

    useEffect(() => {
        firebase.getImageURL(props.imageURL).then((url) => setURL(url));
    }, [props.imageURL, firebase]);

    return (
        <Card style={{ width: '18rem', margin: '25px' }}>
            <Card.Img
                variant="top"
                src={url || undefined}
                alt={props.name}
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    This book has a title {props.name} and this is sold by Mr. {props.displayName} at the cost of Rs.{props.price}.
                </Card.Text>
                <Button onClick={e => navigate(props.link)} variant="primary">View</Button>
            </Card.Body>
        </Card>
    )
}

export default BookCard