import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import styled from 'styled-components'
import ProfileEdit from '../components/ProfileEdit'
import { loadState } from '../utils/session'
import Gravatar from 'react-gravatar'

const Wrapper = styled.div`
  padding: 70px 0;
  .react-gravatar{
    border-radius:10px;
    border: 2px solid #ccc;
    margin-bottom: 15px;
  }
`

export default function Profile() {

  const [user, setUser] = useState(() => {
    return loadState()['user'];
  })

  return (
    <Wrapper>
      <Container>
        <Row>
          <Col sm={4}>
            <Gravatar email={user.email} size={150} rating="pg" />
            <h2 className='text-warning mb-0'>{user.name}</h2>
            <p className=' lead mb-0'><i className="bi bi-envelope text-muted me-2 small" ></i> {user.email}
              <small className='d-block'><i className="bi bi-phone text-muted me-2 small"></i> {user.phone}</small>
            </p>

          </Col>
          <Col sm={6}>
            <h4 className='text-primary'> Change My Account</h4>
            <ProfileEdit />
            <h4 className='text-primary'>My Orders</h4>
            {/* <OrderList/> */}
            <h4 className='text-primary'>My Favourites</h4>
            {/* <Favourites/> */}
          </Col>

        </Row>
      </Container>
    </Wrapper>
  )
} 
