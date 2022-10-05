import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function FoodCard() {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="/placeholder.png" />
            <Card.Body>
                <Card.Title>Food Name</Card.Title>
                <Card.Text>
                    Some description of the food
                </Card.Text>
                <Button variant="primary">Edit</Button>
            </Card.Body>
        </Card>
    )
}
