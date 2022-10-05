import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios';
import API from '../config/api';
import { loadState } from '../utils/session';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';


export default function RestaurantForm() {
    const [rName, setName] = useState();
    const [rAddress, setAddress] = useState();
    const [rRating, setRating] = useState();
    const [rLatitude, setLatitude] = useState();
    const [rLongitude, setLongitude] = useState();
    // const [rImage, setImage] = useState();
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();


    const createRestaurant = async () => {
        try {
            const response = await axios.post(API.DOMAIN + '/api/restaurants', {
                name: rName,
                address: rAddress,
                rating: rRating,
                display_image: null,
                location: {
                    lat: rLatitude,
                    lng: rLongitude
                }

            }, {
                headers: {
                    "x-Authorization": loadState()['token']
                }
            })
            if (response.status === 201) {
                navigate('/admin/restaurants/edit?id=' + response.data.data._id);
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
                        <Form.Control type='text' value={rName} onChange={(e) => { setName(e.target.value) }} placeholder="Restaurant name" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Address
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="textarea" value={rAddress} onChange={(e) => { setAddress(e.target.value) }} placeholder="Restaurant Address" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Rating
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" value={rRating} onChange={(e) => { setRating(e.target.value) }} placeholder="1.1" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Display Image
                    </Form.Label>
                    <Col sm="10">
                        {/* <Form.Control type="file" placeholder="" onChange={(e) => { setImage(e.target.files[0]) }} /> */}
                        <Form.Control type="file" placeholder="" />
                    </Col>
                </Form.Group>

                <h6 className='text-info mb-4 mt-5'>Location Details</h6>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Latitude
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" value={rLatitude} onChange={(e) => { setLatitude(e.target.value) }} placeholder="89.0000" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Longitude
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" value={rLongitude} onChange={(e) => { setLongitude(e.target.value) }} placeholder="89.0000" />
                    </Col>
                </Form.Group>
                <Button variant="primary" className="mt-5" size="lg" onClick={createRestaurant}>
                    Create Restaurant
                </Button>
            </Form>

        </>
    )
}
