import API from '../config/api';
import { React, useState } from 'react'
import Card from 'react-bootstrap/Card'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { saveState } from '../utils/session';
import Notification from '../components/Notification';
import { useNavigate, useLocation } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';

const Center = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height:100%;
`
const Hr = styled.hr`
    color: #ccc;
    width:100%;
    height: 2px;
    border-radius: 2px;
    margin-top:  30px;
`
const Wrapper = styled.div`
  padding-top: 150px;
  padding-bottom: 150px;
  .card{
    background:#404144;
    color: #fff;
  }
  .form-control{
    color: #212529;
    background-color: #382c2c;
    border: 1px solid #53595e;
    color: #fff;
  }
  .input-group-text{
    color: #ffffff;
    background-color: #53595e;
    border-color: #53595e;
  }
`

export default function LoginPage(props) {

  const [notification, setNotification] = useState(null);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePass = (e) => setPass(e.target.value);
  const { state } = useLocation();
  const navigate = useNavigate();

  const { from = "/" } = state || {};

  const normalLogin = () => {
    axios.post(`${API.DOMAIN}/api/auth/login`, {
      email: email,
      password: pass
    }).then(async (response) => {
      if (response.status === 200) {
        saveState({
          "state": "loggedin",
          "token": response.data.accessToken,
          "expires": response.data.expires
        })
        console.log('redirecting...');
        await new Promise(r => setTimeout(r, 2000)); // sleeps otherwise it doesnt redirects
        navigate(from);
      }

    }).catch((error) => {
      setNotification(error.response.data.message)

    })
  }

  return (
    <Center >
      <Wrapper >

        <Container>
          <Row >
            <Col sm={5}>
              <img className="w-100" src="/about-img.png" alt="loging decorative" />
            </Col>
            <Col sm={7} className="d-flex align-items-center justify-content-center">
              <div>
                {notification !== null &&
                  <Notification message={notification} />
                }
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title className="mb-4">Login</Card.Title>
                    <Form className='text-end'>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="bi bi-person"></i></InputGroup.Text>
                        <Form.Control
                          placeholder="Email"
                          aria-label="Email"
                          aria-describedby="basic-addon1"
                          onChange={handleEmail}
                          value={email}
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="bi bi-shield-lock"></i></InputGroup.Text>
                        <Form.Control
                          type='password'
                          placeholder="Password"
                          aria-label="Password"
                          aria-describedby="basic-addon1"
                          onChange={handlePass}
                          value={pass}
                        />
                      </InputGroup>
                      <div className="d-grid gap-2">
                        <Button variant="warning" className="mt-2" onClick={(e) => {
                          normalLogin();
                        }}>Login</Button>
                      </div>
                      <Hr />
                      <div className="d-grid gap-2">
                        <a className="btn btn-outline-warning mt-2" href="http://localhost:8000/api/auth/google/login?redirect_to=http://localhost:3000/login"><i className="bi bi-google text-warning me-4"></i>Google Login</a>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </Wrapper>
    </Center>
  )
}
