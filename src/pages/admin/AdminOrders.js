import React, {useEffect, useReducer, useState} from 'react';
import {Col, Container, Row, Table} from 'react-bootstrap'
import AdminSidebar from '../../components/AdminSidebar';
import axios from 'axios';
import API from '../../config/api';
import {loadState} from '../../utils/session';
import {toaster} from '../../utils/alert';


export default function AdminOrders() {
    const [orders, setOrders] = useState();
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        // Get All orders
        (async function () {
            try {
                let orders = await axios.get(API.DOMAIN + '/api/orders', {
                    headers: {
                        "x-Authorization": loadState()['token']
                    }
                });
                if (orders.status === 200) {
                    setOrders(orders.data.orders);
                    console.log(orders.data.orders);
                }
            } catch (e) {
                console.log(e);
                toaster('Something went wrong during loading data', 'error');
            }
        })();
    }, []);

    const deleteOrder = async (id) => {
        try {
            let res = await axios.delete(API.DOMAIN + "/api/orders/" + id, {
                headers: {
                    "x-Authorization": loadState()['token']
                }
            });
            if (res.status === 200) {
                let idx = orders.findIndex((x) => {
                    return x._id === id;
                });
                orders.splice(idx, 1);

                forceUpdate();
                toaster('Order removed successfully', 'success');
            }

        } catch (e) {
            toaster(e.response.data.message, 'error');
        }
    }

    const dateFormat = (date) => {
        const d = new Date(date);
        const month = d.getMonth();
        const day = d.getDate();
        const monthString = month >= 10 ? month : `0${month}`;
        const dayString = day >= 10 ? day : `0${day}`;

        return `${d.getFullYear()}-${monthString}-${dayString}`;
    }

    return (
        <Container className="pt-5">
            <Row>
                <Col md={4}>
                    <AdminSidebar/>
                </Col>
                <Col md={8}>
                    <div>
                        <h4 className="text-muted mb-3">
                            Orders
                        </h4>
                        <Table striped bordered hover className="mt-4">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders && orders.map((ord, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{ord.user_id}</td>
                                        <td>{dateFormat(ord.date)}</td>
                                        <td>
                                            {ord.is_completed === false &&
                                                <span className="text text-warning">Pending</span>}
                                            {ord.is_completed === true &&
                                                <span className="text text-success">Completed</span>}
                                        </td>
                                        <td>LKR {(ord.total)}</td>
                                        <td>
                                            <a className="text-decoration-none ms-2" href="#/" onClick={(e) => {
                                                e.preventDefault();
                                                deleteOrder(ord._id)
                                            }}><i className="bi bi-trash3-fill text-danger"></i> </a>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    )

}
