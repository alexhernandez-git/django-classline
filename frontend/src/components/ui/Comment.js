import React from "react";
import styled from "@emotion/styled";
import { IconContext } from "react-icons";
import { BiCommentDetail, BiTime } from "react-icons/bi";
import moment from "moment";

import { Link } from "react-router-dom";
const Comment = (props) => {
  const { comment } = props;
  moment.locale("es");

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center text-grey">
        <div className="d-flex align-items-center">
          <Avatar>
            <img
              src={
                comment.user.profile.picture
                  ? comment.user.profile.picture
                  : "../../../static/assets/img/avatar.png"
              }
              alt=""
            />
          </Avatar>
          <span className="h5 mb-0 ml-3">
            {comment.user.first_name} {comment.user.last_name}
          </span>
        </div>
        <div>
          <IconContext.Provider
            value={{
              size: 20,
            }}
          >
            <BiTime />
          </IconContext.Provider>{" "}
          <small>
            {moment(comment.created).subtract(1, "seconds").fromNow()}
          </small>
        </div>
      </div>

      <div className="card-body text-dark">
        <p className="card-text new-line">
          <span
            dangerouslySetInnerHTML={{
              __html: comment.message,
            }}
          />
        </p>
      </div>
    </div>
  );
};
const Avatar = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
  }
`;
export default Comment;
