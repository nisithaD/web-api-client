import Container from 'react-bootstrap/Container'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap'
const Wrapper = styled.div`
  padding: 150px 0;
  height: 100%;
`

export default function NoMatch() {


    return (
        <Wrapper>
            <Container>
                <Row>
                    <Col sm={12} className="text-center">
                        <img className='w-50' src="/order_success.png" alt='Page Not Found' />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className="text-center">
                        <h1 className="text-success">Thank you.Your Order Placed Successfully!</h1>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} className="text-center">
                        <a href='/my-orders' className="text-success">View my orders</a>
                    </Col>
                </Row>
            </Container>
        </Wrapper>
    )
}
