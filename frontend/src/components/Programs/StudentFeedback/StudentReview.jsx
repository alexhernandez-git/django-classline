import React, { useEffect } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { IconContext } from "react-icons";
import moment from 'moment'
import "static/assets/styles/components/Users/Teachers/TeachersProfile/StudentFeedback/StudentReview.scss"
import StarRating from 'src/components/Layout/StarRatings'

const StudentReview = (props) => {
    const { id, user, rating, comment, date } = props.rating
    moment.locale('es');

    return (
        <div key={id}>
            <div className="review border-top p-3">
                <div className="student-info d-none d-sm-flex">
                    <div className="div-img mr-3">
                        <img className="img-student" src={`https://source.unsplash.com/random/1`} />
                    </div>
                    <div>
                        <span className="d-block font-weight-light">{moment(date, "YYYYMMDD").fromNow()}</span>
                        <span className="d-block font-weight-light text-dark">{user.name} {user.surname}</span>
                    </div>
                </div>
                <div>
                    <StarRating rating={rating} />

                    <div>{comment}</div>
                </div>


            </div>
        </div>
    );
}

export default StudentReview;
