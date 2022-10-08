import API from '../config/api';
import { React, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { saveState } from '../utils/session';
import { useNavigate, useLocation } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';
import { toaster } from '../utils/alert';
import jwtDecode from 'jwt-decode';

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

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePass = (e) => setPass(e.target.value);
  const { state } = useLocation();
  const navigate = useNavigate();

  const search = useLocation().search;
  const code = new URLSearchParams(search).get('code');
  const uEmail = new URLSearchParams(search).get('email');

  const { from = "/" } = state || {};

  useEffect(() => {
    (async function () {
      if (code) {

        try {
          let res = await axios.get(API.DOMAIN + '/api/auth/access', {
            params: {
              grantCode: code,
              email: uEmail
            }
          });
          if (res.status === 200) {
            let data = jwtDecode(res.data.accessToken);
            let user = await axios.get(API.DOMAIN + '/api/users/' + data._id);
            let session = {
              "state": "loggedin",
              "token": res.data.accessToken,
              "expires": res.data.expires
            };

            if (user.status === 200) {
              session['user'] = user.data.data;
            }
            saveState(session)
            toaster('Logging Success', 'success');
            navigate(from);
          }

        } catch (e) {
          toaster(e.message, 'warn');
          console.log(e)
        }
      }
    })();
  }, [uEmail, code, from, navigate]);

  const normalLogin = () => {
    axios.post(`${API.DOMAIN}/api/auth/login`, {
      email: email,
      password: pass
    }).then(async (response) => {
      if (response.status === 200) {
        let data = jwtDecode(response.data.accessToken);
        let user = await axios.get(API.DOMAIN + '/api/users/' + data._id);
        let session = {
          "state": "loggedin",
          "token": response.data.accessToken,
          "expires": response.data.expires
        };
        console.log(user)
        if (user.status === 200) {
          session['user'] = user.data.data;
        }
        saveState(session)
        toaster('Logging Success', 'success');
        navigate(from);
      }

    }).catch((error) => {
      toaster(error.response.data.message, 'warn');
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
