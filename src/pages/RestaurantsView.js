import { Container, Row, Col, Image } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useLocation } from 'react-router-dom';
import API from '../config/api';
import axios from 'axios';
import { useEffect,useState } from 'react';
import Places from '../components/Places'
import styled from 'styled-components';

const MapWrapper = styled.div`
    width: 100%;
    height:300px;
    margin-bottom: 70px;
    .map-container{
        height: 100%
    }
`

export default function RestaurantsView() {

    const search = useLocation().search;
    var uid = new URLSearchParams(search).get('id');
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    useEffect(()=>{
        (async function(){
            try{
                let rest  = await axios.get(API.DOMAIN + '/api/restaurants/'+ uid);
                console.log(rest);
                if(rest.status === 200){
                   setName(rest.data.data.name);
                   setAddress(rest.data.data.address);
                }else{
                    console.log(rest);
                }
            }catch(e){
                console.log(e);
            }
        })()
    },[])
  return (
    <>
    <Container>
      <Row>
          <Col sm={3}><Image roundedCircle className='w-100' src='/placeholder.png'/></Col>
          <Col sm={9}>
              <h2>{name}</h2>
               <p>{address}</p> 
               <p>Rating: 3.4</p> 
          </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={3}>
            <Card >
                <Card.Img variant="top" src="/placeholder.png" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Col>
        <Col sm={3}>
        <Card >
                <Card.Img variant="top" src="/placeholder.png" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Col>
        <Col sm={3}>
        <Card >
                <Card.Img variant="top" src="/placeholder.png" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Col>
        <Col sm={3}>
        <Card >
                <Card.Img variant="top" src="/placeholder.png" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={12}>
            <MapWrapper>
                <Places/>
                </MapWrapper>
        </Col>
      </Row>
    </Container>
  </>
  )
}