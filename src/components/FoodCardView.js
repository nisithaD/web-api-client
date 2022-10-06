import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import RatingStars from './RatingStars';

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
                <Card.Img variant="top" src="/placeholder.png" />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    <RatingStars />
                    <Button variant="warning"> Add to cart</Button>
                    <Button variant="default" className="ms-2"> <i className="bi bi-heart"></i></Button>
                </Card.Body>
            </Card>
        </Wrapper>
    )
}
