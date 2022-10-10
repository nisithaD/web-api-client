import { Container, Row, Col, Image } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useLocation } from 'react-router-dom';
import API from '../config/api';
import axios from 'axios';
import { useEffect,useState } from 'react';
import Places from '../components/Places'
import styled from 'styled-components';
import FoodCardView from '../components/FoodCardView';
import img from '../assets/hero-bg.jpg';

const MapWrapper = styled.div`
    width: 100%;
    height:300px;
    margin-bottom: 70px;
    .map-container{
        height: 100%
    }
`
const Wrapper = styled.div`
h1{
    font-size: 70px;
    font-weight: bold;
  }
  h3{
    font-weight:bold;
    text-transform: uppercase;
  }
  `
  const SectionWelcome = styled.div`
    padding-top: 70px;
    padding-bottom: 70px;
    background-image: url(${img}) ;
    background-position: 100% -155px;
    background-repeat: no-repeat;
    color: #fff;
     
  `
  const Section = styled.div`
  
  `
  const P100 = styled.div`
    padding-top: 100px;
    padding-bottom:100px;
  `
 

export default function RestaurantsView() {
    const [restaurants, setRestaurants] = useState();

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
            <Card.Body>

            <Wrapper>
      <Section>
        <Container>
          <P100>
            <h3 className='text-center'>New Tastes</h3>
            <Row className="mt-5">
              {restaurants && restaurants.map((uid, i) => {
                let idx;
                if (uid.foods.length > 0) {
                  idx = Math.floor(Math.random() * (uid.foods.length - 0) + 0);
                  console.log(uid.foods[idx].name)

                  let id = uid.foods[idx].id;
                  let display_image = uid.foods[idx].display_image;
                  let name = uid.foods[idx].name;
                  let description = uid.foods[idx].description;
                  let food = uid.foods[idx]._id;
                  let restaurant = uid._id;
                  let price = uid.foods[idx].price;

                  return <Col md={3}> <FoodCardView id={id} display_image={display_image} name={name} description={description} food={food} restaurant={restaurant} price={price} /> </Col>
                } else {
                  return "";
                }

              })}
            </Row>
          </P100>
        </Container>
      </Section>
    </Wrapper >

            </Card.Body>
            </Card>
        </Col>
        <Col sm={3}>
  
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