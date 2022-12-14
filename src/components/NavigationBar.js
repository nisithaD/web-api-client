import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Dropdown } from 'react-bootstrap';
import { isLoggedIn, isAdmin, removeState } from '../utils/session';
import { useNavigate } from 'react-router-dom';


export default function NavgigationBar() {
  const navigate = useNavigate();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home"><img height="110px" src="/logo-white.png" alt='Logo' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='p-1'>
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/outlets">Outlets</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>

            <Nav.Link className='ms-5' href="/cart"><i className="bi bi-basket2-fill"></i></Nav.Link>
            <Nav.Link href="/wishlist"><i className="bi bi-bag-heart-fill"></i></Nav.Link>
            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic" className="text-white">
                <i className="bi bi-person-fill"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu className='bg-dark text-white'>
                <Dropdown.Item href="/my-orders" className="text-warning">My Orders</Dropdown.Item>
                {isLoggedIn() ?
                  (<>
                    <Dropdown.Item href="/my-profile" className="text-warning">My Profile</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={(e) => { e.preventDefault(); removeState(); navigate('/login'); }} className="text-warning">Logout</Dropdown.Item>
                  </>) :
                  (<Dropdown.Item href="/login" className="text-warning">Login</Dropdown.Item>)}
                {isAdmin() && (<Dropdown.Item href="/admin/dashboard" className="text-warning border-top border-secondary">Admin Dashboard</Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
