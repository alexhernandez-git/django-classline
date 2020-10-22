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
    <div className="mb-4">
      <div>
        <div className="text-grey mx-3 mb-3">
          <div className="d-sm-flex justify-content-between mb-2">
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
                  size: 16,
                }}
              >
                <BiTime />
              </IconContext.Provider>{" "}
              <small>
                {moment(comment.created).subtract(5, "seconds").fromNow()}
              </small>
            </div>
          </div>
          <p className="text-dark">
            <small className="new-line">{comment.message}</small>
          </p>
        </div>
      </div>
      <hr />
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
