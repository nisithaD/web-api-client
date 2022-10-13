import React, { useState, useEffect, useReducer } from 'react';
import { Tabs, Tab, Container, Row, Col, Table } from 'react-bootstrap'
import AdminSidebar from '../../components/AdminSidebar';
import RestaurantForm from '../../components/RestaurantForm';
import axios from 'axios';
import API from '../../config/api';
import { loadState } from '../../utils/session';
import { toaster } from '../../utils/alert';


export default function AdminRestaurant() {
    const [key, setKey] = useState('home');
    const [restaurants, setrestaurants] = useState();
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        // Get All Resturent
        (async function () {
            try {
                let restaurants = await axios.get(API.DOMAIN + '/api/restaurants', {
                    headers: {
                        "x-Authorization": loadState()['token']
                    }
                });
               if (restaurants.status === 200) {
                    setrestaurants(restaurants.data.data);
                }
            } catch (e) {
                console.log(e);
                toaster('Something went wrong during loading data', 'error');            }
        })();
    }, []);

    const deleteRestaurant = async (id) => {
        try {
            let res = await axios.delete(API.DOMAIN + "/api/restaurants/" + id, {
                headers: {
                    "x-Authorization": loadState()['token']
                }
            });
            if (res.status === 200) {
                let idx = restaurants.findIndex((x) => {
                    return x._id === id;
                });
                restaurants.splice(idx, 1);

                forceUpdate();
                toaster('Restaurant removed successfully', 'success');
            }

        } catch (e) {
            console.log(e);
            toaster('Unable to delete, Please try again later', 'error');
        }

    }



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
                                            if (rst.deleted) {
                                                return <></>
                                            } else {
                                                return (
                                                    <tr key={rst._id}>
                                                        <td>{i}</td>
                                                        <td><img width="64px" src={rst.display_image || "/placeholder.png"} alt="name" /></td>
                                                        <td>{rst.name}</td>
                                                        <td>{rst.rating}</td>
                                                        <td>
                                                            <a className="text-decoration-none" href={"/admin/restaurants/edit?id=" + rst._id} >
                                                                <i className="bi bi-pencil-square"></i> </a>
                                                            <a className="text-decoration-none ms-2" href="#/" onClick={(e) => {
                                                                e.preventDefault();
                                                                deleteRestaurant(rst._id);
                                                            }} ><i className="bi bi-trash3-fill text-danger"></i> </a>
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
