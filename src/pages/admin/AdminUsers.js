import React, { useState, useEffect, useReducer } from 'react';
import { Tabs, Tab, Container, Row, Col, Table } from 'react-bootstrap'
import AdminSidebar from '../../components/AdminSidebar';
import UserForm from '../../components/UserForm';
import axios from 'axios';
import API from '../../config/api';
import { loadState } from '../../utils/session';



export default function AdminUsers() {
    const [key, setKey] = useState('home');
    const [users, setUsers] = useState();
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    useEffect(() => {
        // Get All Users

        (async function () {
            try {
                let usrs = await axios.get(API.DOMAIN + '/api/users', {
                    headers: {
                        "x-Athorization": loadState()['token']
                    }
                });
                if (usrs.status === 200) {
                    setUsers(usrs.data.data);

                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    const deleteUser = async (uid) => {
        try {
            let res = await axios.delete(API.DOMAIN + '/api/users/' + uid, {
                headers: {
                    "x-Authorization": loadState()['token']
                }
            })
            if (res.status === 200) {
                let idx = users.findIndex((x) => {
                    return x._id === uid;
                });
                users.splice(idx, 1);
                // force rerender   
                forceUpdate();
            }
        } catch (e) {
            console.log(e);
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
                            Users
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
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            <th>isAdmin</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users && users.map((usr, i) => {
                                            let editUrl = '/admin/users/edit?id=' + usr._id;
                                            if (usr.deleted) {
                                                return "";
                                            } else {
                                                return (
                                                    <tr key={usr._id}>
                                                        <td>{i}</td>
                                                        <td>{usr.name}</td>
                                                        <td>{usr.phone}</td>
                                                        <td>{usr.email}</td>
                                                        <td>{usr.address}</td>
                                                        <td>{usr.isAdmin ? 'true' : 'false'}</td>
                                                        <td>
                                                            <a href={editUrl}>Edit</a>&nbsp;
                                                            <a href='/#' onClick={(e) => {
                                                                e.preventDefault();
                                                                deleteUser(usr._id);
                                                            }}>Delete</a>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        })}
                                    </tbody>
                                </Table>
                            </Tab>
                            <Tab eventKey="profile" title="Add New">
                                <UserForm />
                            </Tab>

                        </Tabs>
                    </div>
                </Col>
            </Row>
        </Container >
    )

}
