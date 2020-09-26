import React from "react";
import styled from "@emotion/styled";
import { IconContext } from "react-icons";
import { BiCommentDetail, BiTime } from "react-icons/bi";

import { Link } from "react-router-dom";
const Comment = () => {
  return (
    <div className="mb-4">
      <div>
        <div className="text-grey mx-3 mb-3">
          <div className="d-sm-flex justify-content-between mb-2">
            <div className="d-flex align-items-center">
              <Avatar>
                <img
                  src="https://image.flaticon.com/icons/svg/194/194938.svg"
                  alt=""
                />
              </Avatar>
              <span className="h5 mb-0 ml-3">Alex Hernandez</span>
            </div>

            <div>
              <IconContext.Provider
                value={{
                  size: 16,
                }}
              >
                <BiTime />
              </IconContext.Provider>{" "}
              <small>Hace 4 horas</small>
            </div>
          </div>
          <p className="text-dark">
            <small className="new-line">
              hola la función del type es básicamente solo definir que lo que
              habrá dentro de la etiqueta lo cual sera el código o texto del
              lenguaje de programación como javascript por eso se coloca
              “type=text/javascript”
            </small>
          </p>
        </div>
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
