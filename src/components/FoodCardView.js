import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import FoodRating from './FoodRating';
import API from '../config/api';
import axios from 'axios';
import { loadState } from '../utils/session';
import { decodeToken } from "react-jwt";

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

`

export default function FoodCardView(props) {
    // console.log(props)
    return (
        <Wrapper>
            <Card className="mb-4">
                <Card.Img width="300px" height="250px" variant="top" src={props.image || "/placeholder.png"} />

                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    <FoodRating food={props.item} restaurant={props.parent} />
                    <Button variant="warning" className="float-right" onClick={() => addToCart(props)}>Add Cart</Button>
                    <Button variant="default" className="ms-2"> <i className="bi bi-heart"></i></Button>
                </Card.Body>
            </Card>
        </Wrapper>
    )
}

//add to cart function
async function addToCart(props) {
    //jwt token decode
    let token = loadState()['token'];
    let user_id = decodeToken(token)._id;
    try {
        let res = await axios.post(API.DOMAIN + '/api/users/' + user_id + '/cart', {
            "outlet": props.restaurant_id,
            "food": props.id,
            "quantity": 1,
            "price": props.price,
            "lineTotal": props.price
        }, {
            headers: {
                "x-Authorization": loadState()['token']
            }
        });
        if (res.status === 200) {
            alert("Added to cart");
        }
    } catch (e) {
        console.log(e);
    }
}
