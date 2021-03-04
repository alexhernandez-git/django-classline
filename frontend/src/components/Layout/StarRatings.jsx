import React from 'react'
import StarRatings from 'react-star-ratings';

const StarRating = (props) => {
    const rating = props.rating ? props.rating : 0

    return (

        <StarRatings
            rating={rating}
            starRatedColor="#e5c07b"
            numberOfStars={5}
            starDimension="23px"
            starSpacing="0px"
            name='rating'
        />
    )
}
export default StarRating