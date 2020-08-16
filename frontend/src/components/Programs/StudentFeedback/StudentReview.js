import React, { useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";
import moment from "moment";
import "static/assets/styles/components/Users/Teachers/TeachersProfile/StudentFeedback/StudentReview.scss";
import StarRating from "src/components/Layout/StarRatings";

const StudentReview = (props) => {
  const { id, rating_user, rating, comment, created } = props.rating;
  moment.locale("es");
  return (
    <div key={id}>
      <div className="review border-top p-3">
        <div className="student-info d-none d-sm-flex">
          <div className="div-img mr-3">
            <img
              className="img-student"
              src={
                rating_user.profile && rating_user.profile.picture
                  ? rating_user.profile.picture
                  : "../../../../static/assets/img/avatar.png"
              }
            />
          </div>
          <div>
            <small className="d-block font-weight-light">
              {moment(created).fromNow()}
            </small>
            <span className="d-block font-weight-light text-dark">
              {rating_user.profile ? (
                <>
                  {rating_user.first_name} {rating_user.last_name}
                </>
              ) : (
                "Usuario borrado"
              )}
            </span>
          </div>
        </div>
        <div>
          <StarRating rating={rating} />

          <div className="new-line">{comment}</div>
        </div>
      </div>
    </div>
  );
};

export default StudentReview;
