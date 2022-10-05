import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'


export default function NoMatch() {


  return (
    <div>
      <Container>
        <Alert primary>
          404, Page not found
        </Alert>
      </Container>
    </div>
  )
}
