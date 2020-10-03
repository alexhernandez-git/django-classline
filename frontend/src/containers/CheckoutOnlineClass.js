import React, { useContext, useState, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import "static/assets/styles/containers/Instructor.scss";
import { useSelector, useDispatch } from "react-redux";
import { IconContext } from "react-icons/lib";
import { FaArrowLeft } from "react-icons/fa";
import styled from "@emotion/styled";
import { Formik, Form as FormFormik, Field } from "formik";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  login,
  registerCheckoutClass,
  resetAuthErrors,
} from "../redux/actions/auth";
import moment from "moment";

const CheckoutOnlineClass = () => {
  const programReducer = useSelector((state) => state.programReducer);
  const { program } = useParams();
  const [isRegister, setIsRegister] = useState(true);
  const authReducer = useSelector((state) => state.authReducer);
  const bookEventsReducer = useSelector((state) => state.bookEventsReducer);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };
  useEffect(() => {
    dispatch(resetAuthErrors());
  }, [isRegister]);
  return bookEventsReducer.selected_event == null ? (
    <Redirect to={`/academy/${program}`} />
  ) : programReducer.isLoading ? (
    "Cargando..."
  ) : (
    <CheckoutOnlineClassDiv>
      {console.log(bookEventsReducer.selected_event)}
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
            <div className="h1 text-dark">
              {bookEventsReducer.selected_event.title}
            </div>
            <div className="h6 m-0">
              <span className="text-dark">Instructor: </span>
              {programReducer.program.instructor.first_name}{" "}
              {programReducer.program.instructor.last_name}
            </div>
            <div>
              <div className="h4 mt-4 text-dark">Descripción</div>
              <span>
                {bookEventsReducer.selected_event.extendedProps?.description}
              </span>
            </div>
            <div className="mt-4">
              <div>
                <span className="text-dark d-block h6 font-weight-bolder">
                  Precio
                </span>
                <span className="font-weight-bolder">10€</span>
              </div>
              <div className="d-none d-sm-block m-2"></div>
              <div>
                <span className="text-dark  d-block h6 font-weight-bolder">
                  Fecha de inicio
                </span>
                <span className="font-weight-bolder">
                  {moment(bookEventsReducer.selected_event.start).format(
                    "D/M/Y hh:mm:ss"
                  )}
                </span>
              </div>
              <div className="d-none d-sm-block m-2"></div>
              <div>
                <span className="text-dark d-block h6 font-weight-bolder">
                  Fecha de fin
                </span>
                <span className="font-weight-bolder">
                  {bookEventsReducer.selected_event.end
                    ? moment(bookEventsReducer.selected_event.end).format(
                        "D/M/Y hh:mm:ss"
                      )
                    : moment(bookEventsReducer.selected_event.start)
                        .add(1, "hours")
                        .format("D/M/Y hh:mm:ss")}
                </span>
              </div>
            </div>

            <div className="my-4"></div>
            {authReducer.isLoading ? (
              "Cargando..."
            ) : authReducer.isAuthenticated && authReducer.user ? (
              <>
                <span>
                  Hola,
                  <br />
                  <span className="font-weight-bold">
                    {authReducer.user.first_name} {authReducer.user.last_name}
                  </span>
                </span>
                <form onSubmit={handleSubmit}>
                  <CardElement />
                  <button
                    className="my-button"
                    type="submit"
                    disabled={!stripe}
                  >
                    Adquirir clase
                  </button>
                </form>
              </>
            ) : (
              <div>
                <div className="d-flex justify-content-center">
                  <div>
                    <span
                      className="h5 mb-0 font-weight-normal cursor-pointer underline"
                      onClick={() => {
                        setIsRegister(true);
                      }}
                    >
                      Registrate
                    </span>{" "}
                    o{" "}
                    <span
                      className="h5 mb-0 font-weight-normal cursor-pointer underline"
                      onClick={() => {
                        setIsRegister(false);
                      }}
                    >
                      Inicia sesión
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  para adquirir la clase
                </div>
                <LoginRegisterContainer>
                  {isRegister ? (
                    <div>
                      <div className="h5 mb-3 font-weight-normal d-flex justify-content-center">
                        <span>Registrate</span>
                      </div>
                      <Formik
                        enableReinitialize={true}
                        initialValues={{
                          first_name: "",
                          last_name: "",
                          email: "",
                          password: "",
                          password_confirmation: "",
                        }}
                        onSubmit={(values) => {
                          const dispatchLogin = (values) =>
                            dispatch(registerCheckoutClass(values));
                          dispatchLogin(values);
                        }}
                      >
                        {(props) => {
                          return (
                            <>
                              <FormFormik>
                                <Form>
                                  <Field
                                    name="first_name"
                                    type="text"
                                    placeholder="Nombre"
                                  />
                                  {authReducer.error &&
                                    authReducer.error.data.first_name &&
                                    authReducer.error.data.first_name.map(
                                      (error) => (
                                        <small className="d-block text-red">
                                          {error}
                                        </small>
                                      )
                                    )}
                                  <Field
                                    name="last_name"
                                    type="text"
                                    placeholder="Apellidos"
                                  />

                                  {authReducer.error &&
                                    authReducer.error.data.last_name &&
                                    authReducer.error.data.last_name.map(
                                      (error) => (
                                        <small className="d-block text-red">
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
                                    authReducer.error.data.email.map(
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
                                  {authReducer.error &&
                                    authReducer.error.data.password &&
                                    authReducer.error.data.password.map(
                                      (error) => (
                                        <small className="d-block text-red">
                                          {error}
                                        </small>
                                      )
                                    )}
                                  <Field
                                    name="password_confirmation"
                                    type="password"
                                    placeholder="Confirmar contraseña"
                                  />
                                  {authReducer.error &&
                                    authReducer.error.data
                                      .password_confirmation &&
                                    authReducer.error.data.password_confirmation.map(
                                      (error) => (
                                        <small className="d-block text-red">
                                          {error}
                                        </small>
                                      )
                                    )}
                                  <div className="m-1"></div>

                                  <button
                                    className="shadow"
                                    className="my-button"
                                    type="submit"
                                  >
                                    Registrarse
                                  </button>
                                </Form>
                              </FormFormik>
                            </>
                          );
                        }}
                      </Formik>
                      <div className="mt-2 d-sm-flex justify-content-end">
                        <small>
                          ¿Ya tienes una cuenta de Classline Academy?{" "}
                          <span
                            className="cursor-pointer underline"
                            onClick={() => {
                              setIsRegister(false);
                            }}
                          >
                            Clica aqui
                          </span>
                        </small>
                      </div>
                    </div>
                  ) : (
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
                          const dispatchLogin = (values) =>
                            dispatch(login(values));
                          dispatchLogin(values);
                        }}
                      >
                        {(props) => {
                          return (
                            <>
                              <FormFormik>
                                <Form>
                                  {authReducer.error &&
                                    authReducer.error.data.detail && (
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
                                    authReducer.error.data.email.map(
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
                                  {authReducer.error &&
                                    authReducer.error.data.password &&
                                    authReducer.error.data.password.map(
                                      (error) => (
                                        <small className="d-block text-red">
                                          {error}
                                        </small>
                                      )
                                    )}
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
                      <div className="mt-2 d-sm-flex justify-content-end">
                        <small>
                          ¿No tienes una cuenta de Classline Academy?{" "}
                          <span
                            className="cursor-pointer underline"
                            onClick={() => {
                              setIsRegister(true);
                            }}
                          >
                            Clica aqui
                          </span>
                        </small>
                      </div>
                    </div>
                  )}
                </LoginRegisterContainer>
              </div>
            )}
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
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  margin: 1rem;
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
export default CheckoutOnlineClass;
