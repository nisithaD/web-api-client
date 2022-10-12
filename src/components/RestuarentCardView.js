import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import RestaurantRating from './RestaurantRating';
import API from '../config/api';
import axios from 'axios';
import { loadState } from '../utils/session';
import { decodeToken } from "react-jwt";
import { toaster } from '../utils/alert';

const Wrapper = styled.div`
    .card-body{
        background: #404144;
        color: #fff;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;    
    }
    .bi-heart{
        color: #fff;
        font-size: 17px;
        &:hover{
            color:red;  
            &:before{
                content: "\f415";
            }
        }
    }
    .bi-heartbreak{
        color: white;
        &:hover{ 
            color:back;  
        }
    }

`
export default function RestuarentCardView(props) {
    return (
        <Wrapper>
            <Card className="mb-4" >
                <Card.Img width="300px" height="250px" variant="top" src={props.display_image || "/placeholder.png"} />
                <Card.Body >
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    <RestaurantRating restaurant={props} />
                    <a href={"/outlets/view?id=" + props.id} className="float-right btn btn-warning" >View Foods</a>
                    <Button variant="default" className="ms-2"> {
                        props.type && props.type === 'favourite' ? <i className="bi bi-heartbreak" onClick={() => removeFromFavarite(props.id)}></i> : (<i className="bi bi-heart" onClick={() => addToFavarite(props.id)}></i>)
                    }

                    </Button>
                </Card.Body>
            </Card>
        </Wrapper>
    )


}
//palamakumbura
const addToFavarite = async (res_id) => {
    console.log(res_id);
    let token = loadState()['token'];
    let user_id = decodeToken(token)._id;
    console.log(user_id)
    try {
        let res = await axios.post(API.DOMAIN + '/api/users/' + user_id + '/favourites/', {
            "outlet":res_id
        }, {
            headers: {
                "x-Authorization": loadState()['token']
            }
        });
        if (res.status === 201) {
            alert('Added to Favourites');
        }
    } catch (e) {
        console.log(e);
    }
}


const removeFromFavarite = async (res_id) => {
    console.log(res_id);
    let token = loadState()['token'];
    let user_id = decodeToken(token)._id;
    console.log(user_id)
    try {
        let res = await axios.delete(API.DOMAIN + '/api/users/' + user_id + '/favourites/' + res_id, {
            "outlet":res_id
        }, {
            headers: {
                "x-Authorization": loadState()['token']
            }
        });
        if (res.status === 200) {
            alert('Remove from Favourites');
        }
    } catch (e) {
        console.log(e);
    }
}
