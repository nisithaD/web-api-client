
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../config/api';
import { loadState } from '../utils/session';
import RestuarentCardView from '../components/RestuarentCardView';

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

export default function Outlets() {


    const [restaurants, setRestaurants] = useState();

    useEffect(() => {
      (async function () {
        try {
          let usrs = await axios.get(API.DOMAIN + '/api/restaurants', {
            headers: {
              "x-Authorization": loadState()['token']
            }
          });
          if (usrs.status === 200) {
            setRestaurants(usrs.data.data);
  
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }, []);
    return (
      <Wrapper>
       
        <Section>
          <Container>
            <P100>
              <h3 className='text-center'>RestaurantS</h3>
              <Row className="mt-5">
                {restaurants && restaurants.map((res, i) => {
                 
                  if (restaurants.length > 0) {
                    
                    let id = res.id;
                    let display_image = res.display_image;
                    let name = res.name;
                    let address = res.address;
                    let rating = res.rating;               
                    return <Col md={3}> <RestuarentCardView id={id} display_image={display_image} name={name} address={address} rating={rating}  /> </Col>
                  } else {
                    return "";
                  }
  
                })}
              </Row>
            </P100>
          </Container>
        </Section>
      </Wrapper >
    )
  }