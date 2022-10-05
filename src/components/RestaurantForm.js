import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import FoodFormModal from './FoodFormModal'
import FoodCard from './FoodCard';

export default function RestaurantForm() {
    return (
        <>
            <Form className='mt-3 mb-5'>
                <h6 className='text-info mb-4 mt-5'>Basic Details</h6>
                <Form.Group as={Row} className="mb-3" controlId="formplainname">
                    <Form.Label column sm="2">
                        Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type='text' placeholder="Restaurant name" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Address
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" placeholder="Restaurant Address" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Rating
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" placeholder="1.1" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Display Image
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="file" placeholder="Password" />
                    </Col>
                </Form.Group>

                <h6 className='text-info mb-4 mt-5'>Food Items

                    <FoodFormModal />

                </h6>
                <Row id='foods'>
                    {/* <Col sm={3}>
                        < FoodCard />
                    </Col> */}
                </Row>

                <Button variant="primary" className="mt-5" size="lg">
                    Create Restaurant
                </Button>
            </Form>

        </>
    )
}
