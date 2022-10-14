import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios';
import API from '../config/api';
import { loadState } from '../utils/session';
import { useNavigate } from 'react-router-dom';
import { toaster } from '../utils/alert';



export default function ProfileEdit() {
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isAdmin, setIsAdmin] = useState('false');
    const [confirmPassword, setConfirmPassword] = useState();
    const navigate = useNavigate();



    useEffect(() => {

        if (loadState() && loadState()['user']) {
            let usr = loadState()['user']
            setId(usr._id);
            setName(usr.name);
            setAddress(usr.address);
            setPhone(usr.phone);
            setEmail(usr.email);
            setIsAdmin(usr.isAdmin);
        } else {
            toaster("Do not tresspass, Please login");
            navigate('/login');
        }

    }, [navigate]);

    const userUpdate = async () => {
        try {
            const response = await axios.put(API.DOMAIN + '/api/users/' + id, {
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
            if (response.status === 201) { // type com
                toaster('User updated successfully', 'success')
                navigate('/admin/users/edit?id=' + response.data.data._id);
            }
        } catch (e) {
            console.log(e)
            if (e.response.data.errors) {
                for (let idx in e.response.data.errors) {
                    console.log(e.response.data.errors);
                    toaster(e.response.data.errors[idx], 'error');
                }
            } else {
                toaster('Something went wrong', 'error')
            }
        }

    }

    return (
        <>
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

                <Button variant="primary" className="mt-5" size="lg" onClick={userUpdate}>
                    Submit
                </Button>
            </Form>

        </>
    )
}
