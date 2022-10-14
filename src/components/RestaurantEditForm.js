import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios';
import API from '../config/api';
import { loadState } from '../utils/session';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import FoodFormModal from './FoodFormModal';
import FoodCard from './FoodCard';
import { toaster } from '../utils/alert';
import styled from 'styled-components';
import { upload } from '../utils/media';

const ImgWrapper = styled.div`
    position: relative;
    width:fit-content;
    i{
        position:absolute;
        right: -7px;
        top: -11px;
        &:hover{
            cursor:pointer;
        }
    }
    img{
        border-radius: 10px;
        border: 2px solid #ccc;
    }
`


export default function RestaurantForm() {
    const [rName, setName] = useState();
    const [rAddress, setAddress] = useState();
    const [rRating, setRating] = useState();
    const [rLatitude, setLatitude] = useState();
    const [rLongitude, setLongitude] = useState();
    const [rImage, setImage] = useState();
    const [rImageTemp, setImageTemp] = useState();
    const navigate = useNavigate();
    const [foods, setFoods] = useState();


    const search = useLocation().search;
    const resId = new URLSearchParams(search).get('id');


    useEffect(() => {
        // Get Restaurant id in query params
        (async function () {
            try {
                // Get restaurant Data by Id
                const res = await axios.get(API.DOMAIN + '/api/restaurants/' + resId, {
                    headers: {
                        "x-Authorization": loadState()['token']
                    }
                })
                if (res.status === 200) {
                    let restaurant = res.data.data;

                    setName(restaurant.name)
                    setAddress(restaurant.address)
                    setRating(restaurant.rating)
                    setLatitude(restaurant.location.lat)
                    setLongitude(restaurant.location.lng)
                    setFoods(restaurant.foods);
                    setImage(restaurant.display_image);
                }
            } catch (e) {
                toaster("Something went wrong when loading data", 'error');
            }
        })();

    }, [resId]);

    const updateRestaurant = async () => {
        try {
            let url = await upload(rImageTemp);
            let img_url = "";
            if (url) {
                img_url = url;
                setImage(url);
            }
            let args = {
                name: rName,
                address: rAddress,
                rating: rRating,
                display_image: img_url !== "" ? img_url : rImage,
                location: {
                    lat: rLatitude,
                    lng: rLongitude
                }
            }
            const response = await axios.put(API.DOMAIN + '/api/restaurants/' + resId, args, {
                headers: {
                    "x-Authorization": loadState()['token']
                }
            })
            if (response.status === 201) {
                toaster("Restaurant Updated", 'success');
                navigate('/admin/restaurants/edit?id=' + response.data.data._id);
            }
        } catch (e) {
            console.log(e);
            if (e.response.data.errors) {
                for (let idx in e.response.data.errors) {
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
                        {
                            rImage && typeof rImage === 'string' ?
                                (<ImgWrapper>
                                    <i className="bi bi-x-circle-fill text-danger" onClick={(e) => { setImage("") }}></i>
                                    <img width="150" src={rImage} alt="Restaurant" />
                                    < Form.Control type="hidden" placeholder="" value={rImage} />
                                </ImgWrapper>)
                                :
                                (< Form.Control type="file" placeholder="" onChange={(e) => { setImageTemp(e.target.files[0]) }} />)
                        }

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
                <h6 className='text-info mb-4 mt-5'>Food items
                    <FoodFormModal restaurant={resId} handler={setFoods} />
                </h6>
                <Row>
                    {foods && foods.map(function (object, i) {
                        if (!object.deleted) {
                            return (<Col md={4}> <FoodCard name={object.name} description={object.description} food={object._id} restaurant={resId} handler={setFoods} image={object.display_image} /> </Col>);
                        } else {
                            return " ";
                        }
                    })}
                </Row>
                <Button variant="primary" className="mt-5" size="lg" onClick={updateRestaurant}>
                    Update Restaurant
                </Button>
            </Form>

        </>
    )
}
