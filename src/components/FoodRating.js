import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import styled from 'styled-components'
import API from '../config/api'
import { toaster } from '../utils/alert'
import { loadState } from '../utils/session'

const StarWrapper = styled.div`
    text-align: left;
    margin-bottom: 15px;
    margin-top:-10px;
    .star-svg{
        width:24px;
        height:24px;
    }

`

export default function FoodRating(props) {
    const [rating, setRating] = useState(0)


    useEffect(() => {
        setRating(props.food.rating);
    });

    const handleRating = async (rate) => {

        const args = {
            name: props.food.name,
            price: props.food.price,
            rating: rate,
            description: props.food.description,
            display_image: props.food.display_image
        }
        console.log(args);
        try {
            let res = await axios.put(API.DOMAIN + '/api/restaurants/' + props.restaurant._id + '/foods/' + props.food._id, args, {
                headers: {
                    "x-Authorization": loadState()['token']
                }
            });
            if (res.status === 201) {
                toaster('Thanks for the Feed ', 'success');
                setRating(rate);
            }
        } catch (e) {
            console.log(e);
            if (e.response.data.errors) {
                for (let idx in e.response.data.errors) {
                    toaster(e.response.data.errors[idx], 'error');
                }
            } else {
                toaster('Something went wrong', 'error')
            }
        }
    }

    return (
        <StarWrapper>
            <Rating
                onClick={handleRating}
                initialValue={rating}
                allowFraction={true}
            />
        </StarWrapper>
    )
}