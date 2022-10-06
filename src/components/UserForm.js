import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios';
import API from '../config/api';
import { loadState } from '../utils/session';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';


export default function UserForm() {
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isAdmin, setIsAdmin] = useState('false');
    const [confirmPassword, setConfirmPassword] = useState();
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();


    const userCreate = async () => {
        try {
            const response = await axios.post(API.DOMAIN + '/api/users', {
                name: name,
                address: address,
                phone: phone,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                isAdmin: isAdmin

            }, {
                headers: {
                    "x-Authorization": loadState()['token']
                }
            })
            if (response.status === 201) {
                navigate('/admin/users/edit?id=' + response.data.data._id);
            }
        } catch (e) {
            setNotification(e.response.data.message)
        }

    }

    return (
        <>
            {notification !== null &&
                <Notification message={notification} />
            }
            <Form className='mt-3 mb-5'>
                <h6 className='text-info mb-4 mt-5'>Basic Details</h6>
                <Form.Group as={Row} className="mb-3" controlId="formplainname">
                    <Form.Label column sm="2">
                        Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type='text' value={name} onChange={(e) => { setName(e.target.value) }} placeholder="User name" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="user@example.com" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        phone
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} placeholder="Contact Number" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Address
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="textarea" value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder="User Address" />
                    </Col>
                </Form.Group>


                <h6 className='text-info mb-4 mt-5'>Set Password</h6>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">
                        Password
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="******" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">
                        Confirm Password
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder="******" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="3">
                        is Admin
                    </Form.Label>
                    <Col sm="9">
                        <Form.Check
                            type="switch"
                            label=""
                            onChange={(e) => {
                                let val = e.target.checked && e.target.value === 'on';
                                setIsAdmin(val)
                            }}
                        />
                    </Col>
                </Form.Group>

                <Button variant="primary" className="mt-5" size="lg" onClick={userCreate}>
                    Create User
                </Button>
            </Form>

        </>
    )
}
