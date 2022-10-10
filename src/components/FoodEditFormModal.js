import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from 'axios';
import API from "../config/api";
import { toaster } from "../utils/alert";
import styled from 'styled-components';
import { upload } from '../utils/media';
import { loadState } from "../utils/session";

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

export default function FoodEditFormModal(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [img, setImg] = useState();
    const [imgTemp, setImageTemp] = useState();
    const [rating, setRating] = useState();
    const [price, setPrice] = useState();

    const launchModal = async () => {
        try {
            setShow(true);
            let res = await axios.get(API.DOMAIN + '/api/restaurants/' + props.restaurant);
            if (res.status === 200) {
                let restaurant = res.data.data;
                let idx = restaurant.foods.findIndex((x) => {
                    console.log(x._id, props.food);
                    return x._id === props.food;
                });
                let food = restaurant.foods[idx];
                setName(food.name);
                setPrice(food.price);
                setDescription(food.description);
                setRating(food.rating);
                setImg(food.display_image);

            }
        } catch (e) {
            console.log(e)
            toaster('Something went wrong when loading the data', 'error');
        }
    }


    const updateToForm = async () => {
        try {
            let url = await upload(imgTemp);
            let img_url = "";
            if (url) {
                img_url = url;
                setImg(url);
            }
            let res = await axios.put(API.DOMAIN + '/api/restaurants/' + props.restaurant + '/foods/' + props.food, {
                name: name,
                price: price,
                rating: rating,
                description: description,
                display_image: img_url !== "" ? img_url : img,
            }, {
                headers: {
                    "x-Authorization": loadState()['token']
                }
            });
            if (res.status === 201) {
                setShow(false);
                toaster('Food Updated', 'success');
                props.updateFd(res.data.data.foods);
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
            <Button variant="outline-primary" className="" onClick={launchModal}>
                Edit
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Food</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} className="mb-3" controlId="formplainname">
                        <Form.Label column sm="4">
                            Name
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type='text' value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Food name" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Description
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="textarea" value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder="Short Introduction" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Rating
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" value={rating} onChange={(e) => { setRating(e.target.value) }} placeholder="1.1" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Price
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="number" value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder="100.00" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="4">
                            Display Image
                        </Form.Label>
                        <Col sm="8">
                            {
                                img && typeof img === 'string' ?
                                    (<ImgWrapper>
                                        <i className="bi bi-x-circle-fill text-danger" onClick={(e) => { setImg("") }}></i>
                                        <img width="150" src={img} alt="Restaurant" />
                                        < Form.Control type="hidden" placeholder="" value={img} />
                                    </ImgWrapper>)
                                    :
                                    (< Form.Control type="file" placeholder="" onChange={(e) => { setImageTemp(e.target.files[0]) }} />)
                            }

                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateToForm}>Update Food</Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}
