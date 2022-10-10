import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import RatingStars from './RatingStars';
import API from '../config/api';
import axios from 'axios';
import { loadState } from '../utils/session';
import { decodeToken } from "react-jwt";
import {toaster} from "../utils/alert";

const Wrapper = styled.div`
    .card-body{
        background: #404144;
        color: #fff;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;    
    }
    .bi{
        color: #fff;
        font-size: 17px;
        &:hover{
            color:red;  
            &:before{
                content: "\f415";
            }
        }
    }
    
    #cart{
        color: #fff;
        font-size: 17px;
        &:hover{
            color:green;  
        }
    }

`

export default function FoodCardView(props) {
    // console.log(props)
    let addToCart = async (props) => {

        let token = loadState()['token'];
        let user_id = decodeToken(token)._id;
        try {
            const response = await axios.post(API.DOMAIN + '/api/users/'+user_id+'/cart', {
                food: props,
                qty: 1,
                price: props.price,
                outlet: props.restaurant,
                lineTotal: props.price
            }, {
                headers: {
                    "x-Authorization": loadState()['token']
                }
            })
            if (response.status === 200) {
                toaster(response.data.message, 'success');
            }
        } catch (e) {
            toaster(e.response.data.message, 'error');
        }
    }
    return (
        <Wrapper>
            <Card className="mb-4">
                <Card.Img   width="300px" height= "250px" variant="top" src= {props.display_image ||"/placeholder.png" }/>
               
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    <RatingStars />
                    <Button variant="warning" className="float-right">Add Favorite</Button>
                    <Button variant="default" className="ms-2"> <i className="bi bi-heart"></i></Button>
                    <Button variant="default" id="cart" className="ms-2" onClick={() =>addToCart(props)}> <i className="bi-cart text-white"></i></Button>
                </Card.Body>
            </Card>
        </Wrapper>
    )
}


