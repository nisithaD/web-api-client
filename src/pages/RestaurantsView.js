import { Container, Row, Col, Image } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { useLocation } from 'react-router-dom';
import API from '../config/api';
import axios from 'axios';
import { useEffect,useState } from 'react';
import Places from '../components/Places'
import styled from 'styled-components';
import FoodCardView from '../components/FoodCardView';


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
    const [lat,setLat] = useState();
    const [lng, setLng]= useState();
    


    useEffect(()=>{
        (async function(){
            try{
                let rest  = await axios.get(API.DOMAIN + '/api/restaurants/'+ uid);
              
                if(rest.status === 200){
                   setName(rest.data.data.name);
                   setAddress(rest.data.data.address);
                   setLat(rest.data.data.location.lat);
                   setLng(rest.data.data.location.lng);
                   setRestaurants(rest.data.data);
                }else{
                    console.log(rest);
                }
            }catch(e){
                console.log(e);
            }
        })()
    },[uid])
  return (
    <>
    <Container>
      <Row>
          <Col sm={3}><Image roundedCircle className='w-100' src='/placeholder.png'/></Col>
          <Col sm={9}>
              <h2>{name}</h2>
               <p>{address}</p> 
               {/* <RestaurantRating restaurant={restaurants}/> */}
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
              {restaurants && restaurants.foods.map((food, i) => {
                console.log(i);
                if (food.length > 0) {
                 
                  let id = food.id;
                  let display_image = food.display_image;
                  let name = food.name;
                  let description = food.description;
                  
                  let restaurant = restaurants._id;
                  let price = food.price;

                  return (<Col md={3}>
                     <FoodCardView id={id} display_image={display_image} name={name} description={description} food={food} restaurant={restaurant} price={price} /> 
                     </Col>)
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
                <Places lat={lat} lng={lng}/>
                </MapWrapper>
        </Col>
      </Row>
    </Container>
  </>
  )
}