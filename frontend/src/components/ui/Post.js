import React from "react";
import styled from "@emotion/styled";
import { IconContext } from "react-icons";
import { FaRegHeart, FaRegComment } from "react-icons/fa";

import { Link } from "react-router-dom";
const Post = () => {
  return (
    <div className="card mb-5">
      <Link to={`/${Math.random()}/user/${Math.random()}`}>
        <div className="card-header d-flex align-items-center cursor-pointer border-0">
          <ProfileImageDiv>
            <img
              src={"https://image.flaticon.com/icons/svg/194/194938.svg"}
              alt="Avatar"
            />
          </ProfileImageDiv>

          <small className="ml-2 font-weight-bold">Yoga & Yoga</small>
        </div>
      </Link>
      {/* <div className="card-body p-0">
                <img src="https://source.unsplash.com/random" className="card-img-top" alt="..." />
            </div> */}
      <div className="card-footer border-0">
        <div>
          <small className="font-weight-bold">Yoga & Yoga</small>{" "}
          <small>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur eos minus odio reprehenderit a quos ullam veniam iusto?
            Ad, explicabo consequatur deleniti praesentium architecto non.
            Aspernatur et itaque reiciendis dolor.
          </small>
        </div>
        <div className="mt-2 d-flex">
          <div className="d-flex align-items-center">
            <IconContext.Provider
              value={{
                size: 18,
                className: "global-class-name",
              }}
            >
              <FaRegHeart />
            </IconContext.Provider>
            <span className="ml-2">32 Me gusta</span>
          </div>

          <div className="d-flex align-items-center ml-3">
            <IconContext.Provider
              value={{
                size: 18,
                className: "global-class-name",
              }}
            >
              <FaRegComment />
            </IconContext.Provider>
            <span className="ml-2">32 Comentarios</span>
          </div>
        </div>
        <div className="my-4 border-top">
          {/* <Comment className="my-4 clearfix">
                        <ProfileImageDiv className="div-img float-left mr-3">
                            <img src={'https://image.flaticon.com/icons/svg/194/194938.svg'} alt="Avatar" />
                        </ProfileImageDiv>
                        <div className="div-comment float-right">
                            <small className="font-weight-bold">Espai de tai chi</small>
                            <small className="ml-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem ab veritatis ipsa sunt dolores unde earum iste fugit sit quaerat asperiores deserunt sequi eos quisquam, obcaecati id! Esse, et adipisci!</small>
                        </div>
                    </Comment>
                    <Comment className="my-4 clearfix">
                        <ProfileImageDiv className="div-img float-left mr-3">
                            <img src={'https://image.flaticon.com/icons/svg/194/194938.svg'} alt="Avatar" />
                        </ProfileImageDiv>
                        <div className="div-comment float-right">
                            <small className="font-weight-bold">Espai de tai chi</small>
                            <small className="ml-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem ab veritatis ipsa sunt dolores unde earum iste fugit sit quaerat asperiores deserunt sequi eos quisquam, obcaecati id! Esse, et adipisci!</small>
                        </div>
                    </Comment>
                    <Comment className="my-4 clearfix">
                        <ProfileImageDiv className="div-img float-left mr-3">
                            <img src={'https://image.flaticon.com/icons/svg/194/194938.svg'} alt="Avatar" />
                        </ProfileImageDiv>
                        <div className="div-comment float-right">
                            <small className="font-weight-bold">Espai de tai chi</small>
                            <small className="ml-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem ab veritatis ipsa sunt dolores unde earum iste fugit sit quaerat asperiores deserunt sequi eos quisquam, obcaecati id! Esse, et adipisci!</small>
                        </div>
                    </Comment> */}
        </div>
        <FormComment action="" className="my-2 w-100">
          <input
            type="text"
            placeholder="Añade un comentario..."
            className=""
          />
          <button className="text-primary">Publicar</button>
        </FormComment>
        <small className="text-muted d-block d-flex justify-content-end">
          2 hace dos dias
        </small>
      </div>
    </div>
  );
};
const ProfileImageDiv = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  .img {
    width: 35px;
    height: 35px;
  }
`;
const FormComment = styled.form`
  input {
    width: calc(100% - 100px);
    border: none;
    border-radius: 1rem 0 0 1rem;
    padding: 0.5rem;
  }
  button {
    width: 100px;
    border: none;
    background: white;
    border-radius: 0 1rem 1rem 0;

    padding: 0.5rem;
  }
`;
const Comment = styled.div`
  .div-img {
    width: 35px;
    min-width: 35px;
  }
  .div-comment {
    width: calc(100% - 45px);
  }
`;
export default Post;
