import React from 'react'
import NavigationBar from './components/NavigationBar'
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'
import img from './assets/hero-bg.jpg';
import { ToastContainer } from 'react-toastify';

const Header = styled.header`
  .navbar{
    background-image: url(${img}) ;
    background-position: center top;
  }
  .navbar-nav{
    .nav-link{
      font-size: 17px;
      text-transform:uppercase;
      color: #fff;
      font-weight: 600;
    }
    .bi{
      font-size:19px;
      color: #fff ;
    }
  }
`

const Main = styled.main`
    min-height: calc(100vh - 276px);
    background-repeat: no-repeat, repeat;
    // background-image: linear-gradient(to right, #100f0f, #100f0f),url(${img});
    background-blend-mode: lighten;
    background-position: center;
    background-size:cover;
`;

const Footer = styled.footer`
    background-color: #222831;
    padding:10px 15px;
    .list-inline{
        display:flex;
        gap:10px;
        justify-content:center;
    }
    a{
      color:inherit;
      text-decoration: none;
    }
`

export default function Layout(props) {
  return (
    <>
      <Header>
        <NavigationBar />
      </Header>

      <Main>{props.children}</Main>
      <Footer>
        <Container>
          <ul className='list-inline text-white py-5' >
            <li className='list-item'><a href="/">Home</a></li>
            <li className='list-item'><a href="/outlets">Outlets</a></li>
            <li className='list-item'><a href="/about">About</a></li>
          </ul>
        </Container>
        <ToastContainer />
      </Footer>
    </>
  )
}
