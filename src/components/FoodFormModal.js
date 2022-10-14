import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from 'axios';
import API from "../config/api";
import { useNavigate } from "react-router-dom";
import { toaster } from "../utils/alert";
import { upload } from "../utils/media";
import { loadState } from "../utils/session";

export default function FoodFormModal(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [rating, setRating] = useState();
    const [price, setPrice] = useState();
    const [img, setImg] = useState();
    const navigate = useNavigate();


    const addToForm = async () => {
        try {
            let url = await upload(img);
            let img_url = "";
            if (url) {
                img_url = url;
            }

            let args = [{
                name: name,
                price: price,
                rating: rating,
                description: description,
                display_image: img_url
            }]
            console.log(args);
            let res = await axios.post(API.DOMAIN + '/api/restaurants/' + props.restaurant + '/foods', args, {
                headers: {
                    "x-Authorization": loadState()['token']
                }
            });
            if (res.status === 201) {
                setShow(false);
                props.handler(res.data.data);
                toaster('Food added to restaurant', 'success');
                navigate('/admin/restaurants/edit?id=' + props.restaurant);
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
            <Button variant="outline-primary" className="ms-3" onClick={handleShow}>
                Add Food
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Food</Modal.Title>
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
                            <Form.Control type="file" placeholder="Choose a file" onChange={(e) => {
                                setImg(e.target.files[0]);
                            }} />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addToForm}>Add to Restaurant</Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}
