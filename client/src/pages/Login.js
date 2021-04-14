import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { useDispatch} from 'react-redux'
import { setUser } from '../redux/action'

export default function Login() {
    const dispatch = useDispatch();
    const [UserInfo, setUserInfo] = useState({
        username: '',
        password: ''
    });
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: UserInfo.username,
                password: UserInfo.password,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    alert('User logged in successfully')
                    dispatch(setUser(data))
                    history.push('/')
                }
            })
    }
    const handleChange = (e) => {
        setUserInfo({
            ...UserInfo,
            [e.target.name]: e.target.value,
        })
    }


    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group >
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter User Name" onChange={handleChange} value={UserInfo.username} name='username' />
                    <Form.Text className="text-muted" >
                    </Form.Text>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange} value={UserInfo.password} name='password' />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Login
  </Button>
            </Form>
        </div>
    )
}