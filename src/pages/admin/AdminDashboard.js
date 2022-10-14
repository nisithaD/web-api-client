import { Container, Row, Col, Table } from "react-bootstrap"
import AdminSidebar from "../../components/AdminSidebar"
import styled from "styled-components"

const Welcome = styled.div`
    border-radius: 5px;
    // border:1px solid #ccc;
    padding:20px 15px;
`

export default function AdminDashboard() {
    return (
        <Container className="mt-5">
            <Row>
                <Col md={4}>
                    <AdminSidebar />
                </Col>
                <Col md={8}>
                    <Welcome>
                        <h2 className="text-success mb-3">Welcome Admin</h2>
                        <h4 className="text-muted mb-2">
                            Your Recent Orders
                        </h4>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th># Orer</th>
                                    <th>Customer</th>
                                    <th>Contact</th>
                                    <th>Address</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>07367647464</td>
                                    <td>2nd Street, City</td>
                                    <td>Rs. 300.00</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Welcome>
                </Col>
            </Row>
        </Container>
    )
}
