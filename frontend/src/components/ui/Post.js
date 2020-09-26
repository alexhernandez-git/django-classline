import React from "react";
import styled from "@emotion/styled";
import { IconContext } from "react-icons";
import { BiCommentDetail, BiTime } from "react-icons/bi";

import { Link, useLocation, useParams } from "react-router-dom";
const Post = () => {
  const { pathname } = useLocation();
  const { program } = useParams();
  return (
    <Link
      to={
        !/\/demo\//.test(pathname) ? `/academy/${program}/post/:id` : pathname
      }
    >
      <div className="card mb-4">
        <div className="card-header">
          <div className="d-flex align-items-center">
            <Avatar>
              <img
                src="https://image.flaticon.com/icons/svg/194/194938.svg"
                alt=""
              />
            </Avatar>
            <span className="h5 mb-0 ml-3">Alex Hernandez</span>
          </div>
        </div>
        <div className="card-body text-dark">
          <p className="card-text new-line">
            Hola!
            <br />
            Tengo una pregunta ¿por qué hay diferentes formas de instalar
            WordPress? influye en algo?
          </p>
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
              0
            </div>
            <div>
              <IconContext.Provider
                value={{
                  size: 20,
                }}
              >
                <BiTime />
              </IconContext.Provider>{" "}
              Hace 4 horas
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
