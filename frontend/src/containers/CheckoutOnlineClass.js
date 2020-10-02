import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "static/assets/styles/containers/Instructor.scss";
import { useSelector } from "react-redux";
import { IconContext } from "react-icons/lib";
import { FaArrowLeft } from "react-icons/fa";
import styled from "@emotion/styled";

const CheckoutOnlineClass = () => {
  const programReducer = useSelector((state) => state.programReducer);
  const { program } = useParams();

  return (
    <>
      <div className="mt-5 text-grey container instructor">
        <Link
          className="text-grey d-flex align-items-center"
          to={`/academy/${program}`}
        >
          <IconContext.Provider
            value={{
              size: 14,
              color: "#757575",
              className: "mr-2",
            }}
          >
            <FaArrowLeft />
          </IconContext.Provider>
          Volver
        </Link>
        <div className="row mt-3">
          <div className="offset-lg-2 col-sm-6">
            <img
              src={
                programReducer.program &&
                programReducer.program.instructor.profile.picture
                  ? programReducer.program.instructor.profile.picture
                  : "../../static/assets/img/avatar.png"
              }
              alt=""
              style={{
                width: "100px",
                height: "100px",
              }}
              className="mr-2 rounded-circle d-block d-sm-none mb-3"
            />
            <div className="h5 m-0">{programReducer.program.title}</div>
            <div className="h1 text-dark">Clase de yoga</div>
            <div className="h6 m-0">
              <span className="text-dark">Instructor: </span>
              {programReducer.program.instructor.first_name}{" "}
              {programReducer.program.instructor.last_name}
            </div>
            <div>
              <div className="h4 mb-0 mt-4 text-dark">Descripción</div>
              <span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea
                doloremque nobis a porro quia officiis, voluptatem accusantium
                vel placeat! Reprehenderit aut, unde ullam atque voluptate
                saepe! Ea mollitia nisi ipsam?
              </span>
            </div>
            <div className="mt-4">
              <div>
                <span className="text-dark  d-block h6 font-weight-bolder">
                  Fecha de inicio
                </span>
                <span className="font-weight-bolder">9/29/2020 09:15:00</span>
              </div>
              <div className="d-none d-sm-block m-2"></div>
              <div>
                <span className="text-dark d-block h6 font-weight-bolder">
                  Fecha de fin
                </span>
                <span className="font-weight-bolder">9/29/2020 10:00:00</span>
              </div>
            </div>
            <div className="my-4"></div>
            <div>
              <div className="h5 mb-0 font-weight-normal d-flex justify-content-center">
                <span>Registrate o inicia sesión</span>
              </div>
              <LoginRegisterContainer>
                <div className="d-flex justify-content-arround">
                  <span>Registro</span>
                  <span>Login</span>
                </div>
                <div>
                  <small>
                    ¿Ya tienes una cuenta de Classline Academy?{" "}
                    <span className="cursor-pointer">Clica aqui</span>
                  </small>
                </div>
                <div></div>
              </LoginRegisterContainer>
            </div>
          </div>
          <div className="offset-sm-2 col-sm-4 offset-lg-0 col-lg-2 d-none d-sm-block">
            <img
              src={
                programReducer.program &&
                programReducer.program.instructor.profile.picture
                  ? programReducer.program.instructor.profile.picture
                  : "../../static/assets/img/avatar.png"
              }
              alt=""
              className="mr-2 rounded-circle w-100 d-block"
            />
          </div>
          {/* <Link to="/teacher/1" className="btn-green py-2 px-3 text-white btn-block mt-3 text-center">Clases</Link> */}
        </div>
      </div>
    </>
  );
};

const LoginRegisterContainer = styled.div`
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  margin: 1rem;
  border-radius: 1rem;
  padding: 1rem;
`;
export default CheckoutOnlineClass;
