import Container from 'react-bootstrap/Container'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap';
import img from '../assets/hero-bg.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../config/api';
import { loadState } from '../utils/session';
import FoodCardView from '../components/FoodCardView';

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

export default function HomePage() {
  const [restaurants, setRestaurants] = useState();

  useEffect(() => {
    console.log(loadState()['token']);
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
      <SectionWelcome>
        <Container>
          <P100>
            <Row style={{ "paddingTop": "70px", "paddingBottom": "150px" }}>
              <Col sm={5}>
                <h1> Welcome To Taste Buds</h1>
                <p>Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente ad mollitia laborum quam quisquam esse error unde. Tempora ex doloremque, labore, sunt repellat dolore, iste magni quos nihil ducimus libero ipsam.</p>
              </Col>
            </Row>
          </P100>
        </Container>
      </SectionWelcome>
      <Section>
        <Container>
          <P100>
            <h3 className='text-center'>New Tastes</h3>
            <Row className="mt-5">
              {restaurants && restaurants.map((object, i) => {
                let idx;
                if (object.foods.length > 0) {
                  idx = Math.floor(Math.random() * (object.foods.length - 0) + 0);
                  console.log(object.foods[idx].name)

                  let id=object.foods[idx].id;
                  let name = object.foods[idx].name;
                  let description = object.foods[idx].description;
                  let food = object.foods[idx]._id;
                  let restaurant = object._id;
                  let price = object.foods[idx].price;

                  return <Col md={3}> <FoodCardView id={id} name={name} description={description} food={food} restaurant={restaurant} price={price} /> </Col>
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
