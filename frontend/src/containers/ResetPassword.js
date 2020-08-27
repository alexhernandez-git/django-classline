import React, { useState, useEffect, useRef, useContext } from "react";
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
import { login } from "src/redux/actions/auth";
import StarRating from "src/components/Layout/StarRatings";
import axios from "axios";
import { AppContext } from "src/context/AppContext";

const ResetPassword = () => {
  const history = useHistory();
  const { token } = useParams();

  const appContext = useContext(AppContext);

  const [resetPasswordErrors, setResetPasswordErrors] = useState({
    password: null,
    confirm_password: null,
    non_field_errors: null,
  });
  const handleSubmitResetPassword = async (values, token) => {
    const result = await appContext.ResetPassword(values, token);
    if (result.status == 200 || result.status == 201) {
      history.push("/");
    } else {
      console.log(result.data);
      setResetPasswordErrors(result.data);
    }
  };
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

      <Section className="py-5">
        <div className="gradient">
          <div className="container">
            <div className="d-flex justify-content-center align-items-center">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  password: "",
                  confirm_password: "",
                }}
                onSubmit={(values) => {
                  console.log(values);
                  handleSubmitResetPassword(values, token);
                }}
              >
                {(props) => {
                  return (
                    <>
                      <FormFormik className="w-100">
                        <Form>
                          <div>
                            <Field
                              name="password"
                              type="password"
                              placeholder="Contraseña"
                            />
                            {resetPasswordErrors.password &&
                              resetPasswordErrors.password.map((error) => (
                                <small className="d-block text-red">
                                  {error}
                                </small>
                              ))}
                            <Field
                              name="confirm_password"
                              type="password"
                              placeholder="Confirmar contraseña"
                            />
                            {resetPasswordErrors.confirm_password &&
                              resetPasswordErrors.confirm_password.map(
                                (error) => (
                                  <small className="d-block text-red">
                                    {error}
                                  </small>
                                )
                              )}
                            {resetPasswordErrors.non_field_errors &&
                              resetPasswordErrors.non_field_errors.map(
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
                            Actualizar contraseña
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
  height: calc(100vh - 70px);
  background: var(--gradient);
  .gradient {
    width: 100%;
    padding: 20px;
    background: #fff;
  }
  .container {
    max-width: 40rem;
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

export default ResetPassword;
