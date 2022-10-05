import React, { useState } from 'react';
import { Tabs, Tab, Container, Row, Col, Table } from 'react-bootstrap'
import AdminSidebar from '../../components/AdminSidebar';
import RestaurantForm from '../../components/RestaurantForm';

export default function AdminRestaurant() {
    const [key, setKey] = useState('home');
    return (
        <Container className="pt-5">
            <Row>
                <Col md={4}>
                    <AdminSidebar />
                </Col>
                <Col md={8}>
                    <div>
                        <h4 className="text-muted mb-3">
                            Restaurants
                        </h4>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3"
                        >
                            <Tab eventKey="home" title="View All">
                                <Table striped bordered hover className="mt-4">
                                    <thead>
                                        <tr>
                                            <th># </th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Rating</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td><img width="64px" src="/placeholder.png" alt="omik-res" /></td>
                                            <td>Omik Restaurant</td>
                                            <td>3.5</td>
                                            <td><a href='/#'>Edit</a></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td><img width="64px" src="/placeholder.png" alt="omik-res" /></td>
                                            <td>Elepass Restaurant</td>
                                            <td>4.5</td>
                                            <td><a href='/#'>Edit</a></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Tab>
                            <Tab eventKey="profile" title="Add New">
                                <RestaurantForm />
                            </Tab>

                        </Tabs>
                    </div>
                </Col>
            </Row>
        </Container>
    )

}
