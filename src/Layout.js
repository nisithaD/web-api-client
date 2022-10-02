import React from 'react'
import NavigationBar from './components/NavigationBar'
import  Container  from 'react-bootstrap/Container'

export default function Layout(props) {
  return (
    <>
    <header>
        <NavigationBar/>
    </header>
    <main>{props.children}</main>
    <footer className='bg-dark'>
        <Container>
            <ul className='list-inline text-white py-5'>
                <li className='list-item'>Home</li>
                <li className='list-item'>Login</li>
            </ul>
        </Container>
    </footer>
    </>
  )
}
