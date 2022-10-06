import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    .bi{
        color: #9f9797;
    }
    li +li{
        margin-left: 3px;
    }
`

export default function RatingStars() {
    return (
        <Wrapper>
            <ul className="list-unstyled d-flex list-inline">
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star-fill"></i></li>
                <li><i class="bi bi-star-half"></i></li>
                <li><i class="bi bi-star"></i></li>
                <li><i class="bi bi-star"></i></li>
            </ul>
        </Wrapper>
    )
}
