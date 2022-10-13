import {Col, Container, Row, Table} from "react-bootstrap"
import styled from "styled-components"
import React, {useEffect, useReducer, useState} from "react";
import axios from "axios";
import API from "../config/api";
import {loadState} from "../utils/session";
import {toaster} from "../utils/alert";
import {decodeToken} from "react-jwt";

const Welcome = styled.div`
    border-radius: 5px;
    // border:1px solid #ccc;
`

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState('');
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        // Get all orders
        (async function () {
            let token = loadState()['token'];
            // eslint-disable-next-line react-hooks/exhaustive-deps
            let user = decodeToken(token);
            setUser(user);
            try {
                let orders = await axios.get(API.DOMAIN + '/api/orders/user/' + user._id, {
                    headers: {
                        "x-Authorization": loadState()['token']
                    }
                });
                if (orders.status === 200) {
                    setOrders(orders.data.orders);
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

    const dateFormat=(date)=> {
        const d = new Date(date);
        const month = d.getMonth();
        const day = d.getDate();
        const monthString = month >= 10 ? month : `0${month}`;
        const dayString = day >= 10 ? day : `0${day}`;

        return `${d.getFullYear()}-${monthString}-${dayString}`;
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col md={12}>
                    <Welcome>
                        <h2 className="text-success mb-3">Welcome</h2>
                        <h4 className="text-muted mb-2">
                            {user.name} these are your recent orders
                        </h4>
                    </Welcome>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#Order</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders && orders.map((ord, i) => {
                            if (ord.is_deleted) {
                                return <></>
                            } else {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{dateFormat(ord.date)}</td>
                                        <td>
                                            {ord.is_completed === false && <span className="text text-warning">Pending</span>}
                                            {ord.is_completed === true && <span className="text text-success">Completed</span>}
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
                            }
                        })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
