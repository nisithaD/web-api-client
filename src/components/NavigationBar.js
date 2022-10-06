import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavgigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home"><img height="110px" src="/logo-white.png" alt='Logo' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/outlet">Outlets</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>

            <Nav.Link className='ms-5' href="/cart"><i className="bi bi-basket2-fill"></i></Nav.Link>
            <Nav.Link href="/wishlist"><i className="bi bi-bag-heart-fill"></i></Nav.Link>
            <Nav.Link href="/login"><i className="bi bi-person-fill"></i></Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
