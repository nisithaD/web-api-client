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
import { useNavigate } from 'react-router-dom';

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
  margin-top: 100px;
`

export default function LoginPage(props) {

  const [notification, setNotification] = useState(null);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePass = (e) => setPass(e.target.value);
  const navigate = useNavigate();

  const normalLogin = () => {
    axios.post(`${API.DOMAIN}/api/auth/login`, {
      email: email,
      password: pass
    }).then((response) => {
      if (response.status === 200) {
        saveState({
          "state": "loggedin",
          "token": response.data.accessToken,
          "expires": response.data.expires
        })
        console.log('redirecting...')
        navigate('/')
      }

    }).catch((error) => {
      setNotification(error.response.data.message)

    })
  }

  return (
    <Center >
      <Wrapper >
        {notification !== null &&
          <Notification message={notification} />
        }
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Login</Card.Title>
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
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  onChange={handlePass}
                  value={pass}
                />
              </InputGroup>
              <div className="d-grid gap-2">
                <Button variant="primary" className="mt-2" onClick={(e) => {
                  normalLogin();
                }}>Login</Button>
              </div>
              <Hr />
              <div className="d-grid gap-2">
                <a className="btn btn-success mt-2" href="http://localhost:8000/api/auth/google/login?redirect_to=http://localhost:3000/login"><i className="bi bi-google text-success me-4"></i>Google Login</a>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Wrapper>
    </Center>
  )
}
