import Card from 'react-bootstrap/Card';
import FoodEditFormModal from './FoodEditFormModal';

export default function FoodCard(props) {
    // console.log(props)
    return (
        <>
            <Card >
                <Card.Img variant="top" src="/placeholder.png" />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    <FoodEditFormModal food={props.food} restaurant={props.restaurant} updateFd={props.handler} />
                </Card.Body>
            </Card>

        </>
    )
}
