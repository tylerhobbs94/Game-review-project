import React, { useEffect, useState, } from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Reviews(props) {
    const [reviews, setReviews] = useState([]);
    const user = useSelector((state) => state.user);
    const [number, setNumber] = useState('')
    const [reviewForm, setReviewForm] = useState(true)


    const getReviews = () => {
        fetch(`/api/v1/games/detail/${props.slug}/review`)
            .then((res) => res.json())
            .then((data) => {
                setReviews(data)
            })
    }
    useEffect(() => {
        getReviews()
    }, [props.slug])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`/api/v1/games/detail/${props.slug}/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                number,
            }),
        })
            .then(() => {
                alert('Your review has been posted.')
                setReviewForm(true)
                getReviews();
            })
    }
    return (
        <div>
            {reviews.map((review) => {
                return <div>
                    <Card bg="dark">
                        <Card.Body className="text-white">
                            Review rating:  {review.number}
                            <br></br>
                            User: {review.User.username}
                        </Card.Body>
                    </Card>

                </div>
            }
            )}


{user ? (
                <div>
                    {reviewForm ? (

                        <div>
 <Form inline onSubmit={handleSubmit}>
                            <Form.Label className="my-1 mr-2 text-white" htmlFor="inlineFormCustomSelectPref">
                                Rate the Game
                            </Form.Label>
                            <Form.Control
                                as="select"
                                className="my-1 mr-sm-2"
                                label="review"
                                type="integer"
                                onChange={(e) => setNumber(e.target.value)}
                                value={number}
                                required
                            >
                                <option value="0">Rate</option>
                                <option value="1">1.0</option>
                                <option value="2">2.0</option>
                                <option value="3">3.0</option>
                                <option value="4">4.0</option>
                                <option value="5">5.0</option>
                                <option value="6">6.0</option>
                                <option value="7">7.0</option>
                                <option value="8">8.0</option>
                                <option value="9">9.0</option>
                                <option value="10">10.0</option>
                            </Form.Control>
                            <Button type="submit" className="my-1">
                                Submit
                         </Button>
                        </Form>
                        </div>

                    ) : (
                        null
                    )}
                </div>
            ) : ( 
                <Link to='/login'>Login to comment.</Link>
            )}
        </div>
            )
}
