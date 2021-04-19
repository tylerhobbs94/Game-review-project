import React, { useEffect, useState, } from 'react'
import { Link } from 'react-router-dom';
import { Card, Button, FormControl, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';


export default function Comments(props) {
    //get props from game.js
    const [comments, setComments] = useState([]);
    const [commentForm, setCommentForm] = useState(true)
    const [text, setText] = useState('');
    const user = useSelector((state) => state.user);



    const getComments = () => {
        fetch(`/api/v1/games/detail/${props.slug}/comments`)
            .then((res) => res.json())
            .then((data) => {
                setComments(data)
            })
    }
    useEffect(() => {
        getComments()
    },)

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`/api/v1/games/detail/${props.slug}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text,
            }),
        })
        alert('Your comment has been posted.')
        setText('')
        setCommentForm(true)
        getComments();
    }

    const deleteComment = (id) => {
    fetch(`/api/v1/comments/${id}`, {
        method : "DELETE"
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.error){
            alert(data.error)
        }
        getComments()
    })
}


return (
    <div>
            {comments.map((comment) => {
                //map through comments to get the comment text
                return <div > 
                    <Card bg="dark">
                        <Card.Body className="text-white">
                            Comment :  {comment.text}
                            <br></br>
                            User: {comment.User.username}
                            <br></br>
                            <br></br>
                            {user ? (

                                user.id === comment.User.id ? (
                                        <Button onClick={()=> deleteComment(comment.id)} type="submit">
                                          Delete comment
                                        </Button>
                                    
                                    ):(
                                    <p></p>
                                    )
                            ):(
                                <p></p>
                            )}
                        </Card.Body>
                    </Card>
                    <div>
                    </div>
                </div>
                //get the user.username from the User table.
            })}
            {/* 
            if !user do not display comment form, have a button to the login screen instead. */}

            {/* if the user is logged in than show commentForm,  */}

            {user ? (
                <div>
                    {commentForm ? (

                        <div>
                            <form onSubmit={handleSubmit}>
                                <Card bg='dark' >
                                    <Card.Body className="text-white font-weight-bold">
                                        Add a comment here
                                <br></br>
                                        <InputGroup className="mb-3" >
                                            <FormControl
                                                placeholder="Comment"
                                                label="Comment"
                                                type="text"
                                                onChange={(e) => setText(e.target.value)}
                                                value={text}
                                                required />
                                            <InputGroup.Append>
                                                <Button
                                                    variant="outline-secondary"
                                                    className='bg-primary text-white'
                                                    type="submit"
                                                >
                                                   Add comment
                                            </Button>
                                           
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Card.Body>
                                </Card>
                            </form>
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
