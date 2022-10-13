import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import FoodRating from './FoodRating';
import API from '../config/api';
import axios from 'axios';
import { loadState } from '../utils/session';
import { decodeToken } from "react-jwt";
import { toaster } from "../utils/alert";

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

export default function ResFoodsCardView(props) {
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
                    <Card.Text>
                      RS:{props.price}/=
                    </Card.Text>
                    <FoodRating food={props.item} restaurant={props.parent} />
                 
                </Card.Body>
            </Card>
        </Wrapper>
    )
}

