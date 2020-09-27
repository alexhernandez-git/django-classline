import React from "react";
import styled from "@emotion/styled";
import { IconContext } from "react-icons";
import { BiCommentDetail, BiTime } from "react-icons/bi";
import moment from "moment";
import { Link, useLocation, useParams } from "react-router-dom";
const Post = (props) => {
  const { pathname } = useLocation();
  const { program } = useParams();
  const { post } = props;
  moment.locale("es");
  return (
    <Link
      to={
        !/\/demo\//.test(pathname)
          ? `/academy/${program}/post/${post.code}`
          : pathname
      }
    >
      <div className="card mb-4">
        <div className="card-header">
          <div className="d-flex align-items-center">
            <Avatar>
              <img
                src={
                  post.user.profile.picture
                    ? post.user.profile.picture
                    : "../../../static/assets/img/avatar.png"
                }
                alt=""
              />
            </Avatar>
            <span className="h5 mb-0 ml-3">
              {post.user.first_name} {post.user.last_name}
            </span>
          </div>
        </div>
        <div className="card-body text-dark">
          <p className="card-text new-line">{post.title}</p>
          <p className="card-text new-line">{post.message}</p>
        </div>
        <div className="text-grey mx-3 mb-3">
          <div className="d-flex justify-content-between">
            <div>
              <IconContext.Provider
                value={{
                  size: 20,
                }}
              >
                <BiCommentDetail />
              </IconContext.Provider>{" "}
              {post.comments}
            </div>
            <div>
              <IconContext.Provider
                value={{
                  size: 20,
                }}
              >
                <BiTime />
              </IconContext.Provider>{" "}
              {moment(post.created).subtract(1, "seconds").fromNow()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
  }
`;
export default Post;
