import React from 'react'
import NavigationBar from './components/NavigationBar'
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'
import img from './assets/bg.jpg';

const Header = styled.header`
`

const Main = styled.main`
    min-height: calc(100vh - 276px);
    background-repeat: no-repeat, repeat;
    background-image: url(${img});
    background-blend-mode: lighten;
    background-position: center;
    background-size:cover;
`;

const Footer = styled.footer`
    background-color: #343434;
    padding:10px 15px;
    .list-inline{
        display:flex;
        gap:10px;
        justify-content:center;
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
          <ul className='list-inline text-white py-5'>
            <li className='list-item'>Home</li>
            <li className='list-item'>Login</li>
          </ul>
        </Container>
      </Footer>
    </>
  )
}
