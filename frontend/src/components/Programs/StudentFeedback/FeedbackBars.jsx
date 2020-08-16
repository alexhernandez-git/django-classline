import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { IconContext } from "react-icons";
import "static/assets/styles/components/Users/Teachers/TeachersProfile/StudentFeedback/FeedbackBars.scss"
import StarRating from 'src/components/Layout/StarRatings'
export default function FeedbackBar(props) {
    const [type, setType] = useState(props.type)
    const [percentage, setPercentage] = useState(props.percentage)

    return (
        <div>
            <div className="grid">

                <div className="progress align-self-center">
                    <div
                        className="progress-bar bg-gradient-green"
                        role="progressbar"
                        style={{ width: percentage + '%' }}
                        aria-valuenow={percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                </div>

                <StarRating rating={props.type} className="d-flex" />


                <span className="text-right  align-self-center">{percentage}%</span>
            </div>
        </div>
    )
}
