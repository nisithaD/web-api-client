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
            <img className='w-50' src="/404.png" alt='Page Not Found' />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}
