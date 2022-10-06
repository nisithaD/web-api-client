import { Container, Row, Col } from 'react-bootstrap'
import AdminSidebar from '../../components/AdminSidebar';
import UserEditForm from '../../components/UserEditForm';


export default function AdminRestaurant() {
    return (
        <Container className="pt-5">
            <Row>
                <Col md={4}>
                    <AdminSidebar />
                </Col>
                <Col md={8}>
                    <div>
                        <h4 className="text-muted mb-3">
                            Edit User
                        </h4>
                        <UserEditForm />
                    </div>
                </Col>
            </Row>
        </Container>
    )

}
