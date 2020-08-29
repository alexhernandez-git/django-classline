import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/core";
import ProgramDescription from "src/components/MainPage/ProgramDescription";
import ProgramBenefits from "src/components/MainPage/ProgramBenefits";
import Estadistics from "src/components/MainPage/Estadistics";
import { MdClose } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { Link, useParams, useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from "react-redux";
import StudentReview from "src/components/Programs/StudentFeedback/StudentReview";

import { Formik, Form as FormFormik, Field } from "formik";
import { login } from "src/redux/actions/authCommercials";
import StarRating from "src/components/Layout/StarRatings";
import axios from "axios";
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { program } = useParams();
  const authCommercialsReducer = useSelector(
    (state) => state.authCommercialsReducer
  );
  useEffect(() => {
    if (authCommercialsReducer.isAuthenticated) history.push(`/dashboard`);
  }, [authCommercialsReducer.isAuthenticated]);
  const programVideoRef = useRef();
  const video = useRef();

  return (
    <>
      <Global
        styles={css`
          :root {
            --darkgray: #323840;
            --gradient: linear-gradient(45deg, #2e6a89, #56b389);
            --border: 1px solid #ddd;
            --left-msg-bg: #ececec;
            --right-msg-bg: #579ffb;
            --green: #56b389;
            --blue: #94c2ed;
            --orange: #e38968;
            --gray: #92959e;
            --purple: #684e73;
          }
          * {
            padding: 0;
            margin: 0;
          }
          html {
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            font-family: "Open Sans", sans-serif;
          }
          a {
            text-decoration: none;
            color: #000;
          }
          a:hover {
            text-decoration: none;
            color: #000;
          }

          input:focus,
          button:focus,
          a:focus {
            outline: none;
          }
          /* Utils */
          .cursor-pointer {
            cursor: pointer;
          }
        `}
      />
      {/* <Header className="p-3 shadow">
        <ContainerLogo className="cursor-pointer d-flex align-items-center">
          <Logo>
            <img
              src={
                !programReducer.isLoading &&
                programReducer.program.instructor.profile.picture
                  ? programReducer.program.instructor.profile.picture
                  : "../../static/assets/img/no-foto.png"
              }
              alt="avatar"
            />
          </Logo>
          <span className="ml-3 font-weight-bold">
            {!programReducer.isLoading && programReducer.program.title}
          </span>
        </ContainerLogo>
      </Header> */}

      <Section className="py-5">
        <div className="gradient">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 d-flex align-items-center justify-content-center">
                {/* <span className="text-white">
                {!programReducer.isLoading && programReducer.program.title}{" "}
                trabaja con Classline Academy para ofrecerte esta plataforma
              </span> */}
                <ContainerImage className="shadow">
                  <img
                    src={"../../../static/assets/img/classlinelogo.png"}
                    alt=""
                  />
                </ContainerImage>
              </div>
              <div className="d-block d-sm-none m-3"></div>
              <div className="col-sm-6 d-flex align-items-center">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={(values) => {
                    console.log("entra");
                    const dispatchLogin = (values) => dispatch(login(values));
                    dispatchLogin(values);
                  }}
                >
                  {(props) => {
                    return (
                      <>
                        <FormFormik className="w-100">
                          <Form>
                            <div>
                              {authCommercialsReducer.error &&
                                authCommercialsReducer.error.data.detail && (
                                  <small className="d-block text-red text-center mb-2">
                                    {authCommercialsReducer.error.data.detail}
                                  </small>
                                )}

                              {authCommercialsReducer.error &&
                                authCommercialsReducer.error.data
                                  .non_field_errors &&
                                authCommercialsReducer.error.data.non_field_errors.map(
                                  (error) => (
                                    <small className="d-block text-red text-center mb-2">
                                      {error}
                                    </small>
                                  )
                                )}

                              <Field
                                name="email"
                                type="text"
                                placeholder="Nombre de usuario"
                              />
                              {authCommercialsReducer.error &&
                                authCommercialsReducer.error.data.email &&
                                authCommercialsReducer.error.data.email.map(
                                  (error) => (
                                    <small className="d-block text-red">
                                      {error}
                                    </small>
                                  )
                                )}
                              <Field
                                name="password"
                                type="password"
                                placeholder="Contraseña"
                              />
                              {authCommercialsReducer.error &&
                                authCommercialsReducer.error.data.password &&
                                authCommercialsReducer.error.data.password.map(
                                  (error) => (
                                    <small className="d-block text-red">
                                      {error}
                                    </small>
                                  )
                                )}
                            </div>
                            <button
                              className="shadow"
                              className="my-button"
                              type="submit"
                            >
                              Acceder
                            </button>
                          </Form>
                        </FormFormik>
                      </>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};
const ContainerImage = styled.div`
  width: 100%;
  background: white;
  padding: 0.4rem;
  max-width: 400px;
  border-radius: 0.7rem;
  img {
    width: 100%;
  }
  .program-main-info {
    margin: 1rem 0;
  }
  .program-title {
    display: block;
    text-align: center;
    font-size: 18px;
  }
  .punctuation {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  height: 100vh;
  background: var(--gradient);
  .gradient {
    width: 100%;
    padding: 20px;
    background: #fff;
  }
`;
const Form = styled.div`
  fieldset {
    width: 100%;
    background: #fff;
    padding: 2rem 2rem;
    /* max-width: 35rem; */
    border-radius: 0.7rem;
  }
  input {
    width: 100%;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    border-radius: 0.7rem;
    &:first-of-type {
      margin: 0;
    }
  }

  .my-button {
    border: 0;
    padding: 0.5rem 1rem;
    width: 100%;
    margin-top: 20px;
    background: var(--gradient);
    color: #fff;
    border-radius: 0.7rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  }
  .my-button:active {
    position: relative;
    top: 1px;
  }
`;

export default Login;
