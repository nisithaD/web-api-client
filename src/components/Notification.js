import React from 'react'
import Alert from 'react-bootstrap/Alert'
import styled from 'styled-components'


const Wrapper = styled.div`
    margin-top: 20px;
`


export default function Notification(props) {
    return <Wrapper>
        <Alert key={props.key} variant='success'>
            {props.message}
        </Alert>
    </Wrapper>


}
