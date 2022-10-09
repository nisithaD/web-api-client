import React, { useState, useEffect, useReducer } from 'react';
import { Tabs, Tab, Row, Col, Table } from 'react-bootstrap'
import AdminSidebar from '../components/AdminSidebar';
import RestaurantForm from '../components/RestaurantForm';
import axios from 'axios';
import API from '../config/api';
import { loadState } from '../utils/session';
import { toaster } from '../utils/alert';
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'
import FoodCardView from '../components/FoodCardView';
import img from '../assets/hero-bg.jpg';




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


export default function ResturentsViews() {
        const [key, setKey] = useState('home');
        const [restaurants, setrestaurants] = useState();
        
        useEffect(() => {
            // Get All Users
    
            (async function () {
                try {
                    let restaurants = await axios.get(API.DOMAIN + '/api/restaurants', {
                        headers: {
                            "x-Athorization": loadState()['token']
                        }
                    });
                    if (restaurants.status === 200) {
                        setrestaurants(restaurants.data.data);
    
                    }
                } catch (e) {
                    console.log(e);
                    toaster('Something went wrong during loading data', 'error');
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
                    id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                    {restaurants && restaurants.map((object, i) => {
                         let idx = '/api/restaurants/edit?id=' + object._id;
               
                         
                if (object.foods.length > 0) {
                  idx = Math.floor(Math.random() * (object.foods.length - 0) + 0);
                  console.log(object.foods[idx].name)

                  let id = object.foods[idx].id;
                  let name = object.foods[idx].name;
                  let display_image = object.foods[idx].display_image;
                  let description = object.foods[idx].description;
                  let food = object.foods[idx]._id;
                  let restaurant = object._id;
                  let price = object.foods[idx].price;

                  return <Col md={3}> <FoodCardView id={id} name={name} display_image={display_image} description={description} food={food} restaurant={restaurant} price={price} /> </Col>
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