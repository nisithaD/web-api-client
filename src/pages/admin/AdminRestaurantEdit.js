import { Container, Row, Col } from 'react-bootstrap'
import AdminSidebar from '../../components/AdminSidebar';
import RestaurantEditForm from '../../components/RestaurantEditForm';

export default function AdminRestaurantEdit() {
    return (
        <Container className="pt-5">
            <Row>
                <Col md={4}>
                    <AdminSidebar />
                </Col>
                <Col md={8}>
                    <div>
                        <h4 className="text-muted mb-3">
                            Edit Restaurant
                        </h4>

                        <RestaurantEditForm />

                    </div>
                </Col>
            </Row>
        </Container>
    )

}
