import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Container, Row, Col, Table } from 'react-bootstrap'
import AdminSidebar from '../../components/AdminSidebar';
import RestaurantForm from '../../components/RestaurantForm';
import axios from 'axios';
import API from '../../config/api';
import { loadState } from '../../utils/session';


export default function AdminRestaurant() {
    const [key, setKey] = useState('home');
    const [restaurants, setrestaurants] = useState();
    useEffect(() => {
        // Get All Resturent
        (async function () {
            try {
                let restaurants = await axios.get(API.DOMAIN + '/api/restaurants', {
                    headers: {
                        "x-Athorization": loadState()['token']
                    }
                });

                if (restaurants.status === 200) {
                    setrestaurants(restaurants.data.data);
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    // const editRestaurants = async (rid) => {

    // }

    // const AddFaveriteUrl = async (rid) => {

    // }

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
                                        {restaurants && restaurants.map((rst, i) => {
                                            // let editUrl;
                                            // let AddFaveriteUrl;

                                            if (rst.Edit) {
                                                return "";
                                            } else {
                                                return (
                                                    <tr key={rst._id}>
                                                        <td>{i}</td>
                                                        <td><img width="64px" src={rst.display_image} alt="name" /></td>
                                                        <td>{rst.name}</td>
                                                        <td>{rst.rating}</td>
                                                        <td>
                                                            <a href='/#'>Edit</a>
                                                            <a href='/#'>Add Favourite</a>
                                                        </td>
                                                    </tr>

                                                )
                                            }
                                        })}
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
