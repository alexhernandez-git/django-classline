import React, { useContext, useState, useEffect } from "react";
import {
  Link,
  Redirect,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import "static/assets/styles/containers/Instructor.scss";
import { useSelector, useDispatch } from "react-redux";
import { IconContext } from "react-icons/lib";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaArrowLeft, FaCreditCard } from "react-icons/fa";
import styled from "@emotion/styled";
import { Formik, Form as FormFormik, Field } from "formik";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  login,
  registerCheckoutClass,
  resetAuthErrors,
} from "../redux/actions/auth";
import moment from "moment";
import { bookEvent } from "../redux/actions/bookEvents";

const LoginPacksContainer = (props) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const programReducer = useSelector((state) => state.programReducer);
  const { program } = useParams();
  const authReducer = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authReducer.isAuthenticated) {
        history.push(`/academy/${program}/packs`);
    }
  }, [authReducer.isAuthenticated]);
  return (
    <CheckoutOnlineClassDiv>
      <div className="mt-5 text-grey container instructor">
        <div
          className="text-grey d-flex align-items-center cursor-pointer"
          onClick={() => {
            history.goBack();
          }}
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
        </div>
        <LoginRegisterContainer>
          <div>
            <div className="h5 mb-3 font-weight-normal d-flex justify-content-center">
              <span>Inicia Sesión</span>
            </div>
            <Formik
              enableReinitialize={true}
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                const dispatchLogin = (values) => dispatch(login(values));
                dispatchLogin(values);
              }}
            >
              {(props) => {
                return (
                  <>
                    <FormFormik>
                      <Form>
                        {authReducer.error && authReducer.error.data.detail && (
                          <small className="d-block text-red text-center mb-2">
                            {authReducer.error.data.detail}
                          </small>
                        )}

                        {authReducer.error &&
                          authReducer.error.data.non_field_errors &&
                          authReducer.error.data.non_field_errors.map(
                            (error) => (
                              <small className="d-block text-red text-center mb-2">
                                {error}
                              </small>
                            )
                          )}
                        <Field
                          name="email"
                          type="text"
                          placeholder="Email or Username"
                        />
                        {authReducer.error &&
                          authReducer.error.data.email &&
                          authReducer.error.data.email.map((error) => (
                            <small className="d-block text-red">{error}</small>
                          ))}
                        <Field
                          name="password"
                          type="password"
                          placeholder="Contraseña"
                        />
                        {authReducer.error &&
                          authReducer.error.data.password &&
                          authReducer.error.data.password.map((error) => (
                            <small className="d-block text-red">{error}</small>
                          ))}
                        <div className="m-1"></div>
                        <button
                          className="shadow"
                          className="my-button"
                          type="submit"
                        >
                          Iniciar sesión
                        </button>
                      </Form>
                    </FormFormik>
                  </>
                );
              }}
            </Formik>
          </div>
        </LoginRegisterContainer>
      </div>
    </CheckoutOnlineClassDiv>
  );
};
const CheckoutOnlineClassDiv = styled.div`
  .underline:hover {
    text-decoration: underline !important;
  }
  .my-button {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;

    font-size: 1.2rem;
    border: 0;
    padding: 0.5rem 1rem;
    width: 100%;
    background: linear-gradient(45deg, #2e6a89, #56b389);
    color: #fff;
    border-radius: 0.7rem;
  }
  .my-button:active {
    position: relative;
    top: 1px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
  }
`;
const LoginRegisterContainer = styled.div`
  width: 100%;
  max-width: 30rem;
  margin: 5rem auto 0;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  border-radius: 1rem;
  padding: 1rem;
`;
const Form = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  fieldset {
    background: #fff;
    padding: 2rem 2rem;
    max-width: 35rem;
    border-radius: 0.7rem;
  }
  input {
    width: 100%;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.7rem;
    &:first-of-type {
      margin: 0;
    }
    &:focus {
      outline: none !important;
    }
  }
`;
export default LoginPacksContainer;
