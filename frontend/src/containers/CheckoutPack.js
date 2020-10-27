import React, {  useState, useEffect } from "react";
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
import { RiSecurePaymentFill, RiSecurePaymentLine } from "react-icons/ri";
import { FaArrowLeft, FaCreditCard } from "react-icons/fa";
import styled from "@emotion/styled";
import { Formik, Form as FormFormik, Field } from "formik";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  login,
  registerCheckoutClass,
  resetAuthErrors,
} from "../redux/actions/auth";
import { bookEvent } from "../redux/actions/bookEvents";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { buyPack } from "src/redux/actions/buyPacks";
const CheckoutPack = (props) => {
  const MySwal = withReactContent(Swal);

  const history = useHistory();
  const { pathname } = useLocation();

  const programReducer = useSelector((state) => state.programReducer);
  const { program } = useParams();
  const [isRegister, setIsRegister] = useState(true);
  const authReducer = useSelector((state) => state.authReducer);
  const buyPacksReducer = useSelector((state) => state.buyPacksReducer);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    // Block native form submission.
    e.preventDefault();

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
      dispatch(buyPack(buyPacksReducer.selected_pack, paymentMethod.id));
    }
  };
  useEffect(() => {
    dispatch(resetAuthErrors());
  }, [isRegister]);
  const handleBookSaved = (payment_method) => {
    const paymentMethodId = payment_method;

    dispatch(buyPack(buyPacksReducer.selected_pack, paymentMethodId));
  };
  const [newCard, setNewCard] = useState(false);

  const [isMyPack, setIsMyPack] = useState({
    loading: true,
    pack: false,
  });
  useEffect(() => {
    if (!buyPacksReducer.isLoading && buyPacksReducer.packs && buyPacksReducer.selected_pack && !authReducer.isLoading) {
      if (authReducer.user) {
        console.log('entra')
        console.log(buyPacksReducer.packs.results)
        const selected_pack_updated = buyPacksReducer.packs.results.find((pack) => {
          return pack.id === buyPacksReducer.selected_pack.id
        });
        const result = selected_pack_updated.students.some(student=> student === authReducer.user.id)
        // return pack.students.some(student => student === authReducer.user.id)
        setIsMyPack({ loading: false, pack: result });
      }else{
        setIsMyPack({ loading: false, pack: false });

      }
    }
  }, [buyPacksReducer.selected_pack, buyPacksReducer.packs,authReducer.isLoading, authReducer.user]);

  return buyPacksReducer.selected_pack == null ? (
      <Redirect to={`/academy/${program}/packs`} />
  ) : programReducer.isLoading ? (
    "Cargando..."
  ) : (
    <CheckoutPackDiv>
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
        <div className="row mt-3">
          <div className="offset-lg-1 col-sm-6">
            <img
              src={
                buyPacksReducer.selected_pack.picture
                  ? buyPacksReducer.selected_pack.picture
                  : "../../../static/assets/img/no-foto.png"
              }
              alt=""
              style={{
                height: "100px",
              }}
              className="mr-2 rounded d-block d-sm-none mb-3"
            />
            <div className="h5 m-0">{programReducer.program.title}</div>
            <div className="h1 text-dark">
              {buyPacksReducer.selected_pack.title}
            </div>
            <div className="h6 m-0">
              <span className="text-dark">Instructor: </span>
              {programReducer.program.instructor.first_name}{" "}
              {programReducer.program.instructor.last_name}
            </div>
            <div>
              <div className="h4 mt-4 text-dark">Descripción</div>
              <span>{buyPacksReducer.selected_pack.description}</span>
            </div>
            <div className="mt-4">
              <div className="d-flex mb-4">

              {buyPacksReducer.selected_pack.are_videos && 
              <>
              <div>
                <span className="text-dark  d-block h6 font-weight-bolder">
                  Videos
                </span>
                <span className="font-weight-bolder">
                {buyPacksReducer.selected_pack.videos}
                </span>
              </div>
              <div className="d-none d-sm-block m-2"></div>
              </>
              }
              {buyPacksReducer.selected_pack.are_podcasts && 
              <>
                <div>
                  <span className="text-dark d-block h6 font-weight-bolder">
                    Audios
                  </span>
                  <span className="font-weight-bolder">
                    {buyPacksReducer.selected_pack.podcasts}
                  </span>
                </div>
              <div className="d-none d-sm-block m-2"></div>
              </>
              }
              </div>

              <div>
                <span className="text-dark d-block h6 font-weight-bolder">
                  Precio
                </span>
                <span className="font-weight-bolder">
                  {buyPacksReducer.selected_pack.pack_price.label}
                </span>
              </div>
              
            </div>

            <div className="my-4"></div>
            {console.log(isMyPack.pack)}
            {isMyPack.loading ? 
            "Cargando..."  
            :
            <>
              {isMyPack.pack ? 
              <Link
                to={`/pack/${program}/${buyPacksReducer.selected_pack.code}/videos`}
                className="d-flex align-items-center w-100 justify-content-center my-button"
              >
                    Ir al pack
                </Link>
              :
              <>
                {authReducer.isLoading ? (
                  "Cargando..."
                ) : authReducer.isAuthenticated && authReducer.user ? (
                  <>
                    <span>
                      Hola,
                      <br />
                      <span className="font-weight-bold">
                        {authReducer.user.first_name}{" "}
                        {authReducer.user.last_name}
                      </span>
                    </span>
                    <form onSubmit={handleSubmit}>
                      {(newCard ||
                        authReducer.user.profile.payment_methods == null ||
                        authReducer.user.profile.payment_methods.length ==
                          0) && (
                        <>
                          <CardElement />
                        </>
                      )}

                      {(newCard ||
                        authReducer.user.profile.payment_methods == null ||
                        authReducer.user.profile.payment_methods.length ==
                          0) && (
                        <>
                          <button
                            type="submit"
                            className="d-flex align-items-center w-100 justify-content-center my-button"
                            disabled={!stripe}
                          >
                            {programReducer.program.is_subscribed ? (
                              <>Cambiar Plan</>
                            ) : (
                              <>
                                Pagar
                                <IconContext.Provider
                                  value={{
                                    size: 20,
                                    className: "global-class-name ml-2",
                                  }}
                                >
                                  <RiSecurePaymentLine />
                                </IconContext.Provider>
                              </>
                            )}
                          </button>
                        </>
                      )}
                      {authReducer.user.profile.payment_methods != undefined &&
                        authReducer.user.profile.payment_methods.length > 0 &&
                        !newCard && (
                          <>
                            <button
                              type="button"
                              className="d-flex align-items-center w-100 justify-content-center my-button mt-3"
                              disabled={!stripe}
                              onClick={() => {
                                handleBookSaved(
                                  authReducer.user.profile.payment_methods[0].id
                                );
                              }}
                            >
                              {programReducer.program.is_subscribed ? (
                                <>Cambiar Plan</>
                              ) : (
                                <>
                                  Pague con tarjeta que termina con{" "}
                                  {
                                    authReducer.user.profile.payment_methods[0]
                                      .card.last4
                                  }
                                  <IconContext.Provider
                                    value={{
                                      size: 20,
                                      className:
                                        "global-class-name ml-2 text-white",
                                    }}
                                  >
                                    <RiSecurePaymentLine />
                                  </IconContext.Provider>
                                </>
                              )}
                            </button>
                            {!programReducer.program.is_subscribed && (
                              <button
                                type="button"
                                className="d-flex align-items-center w-100 justify-content-center mt-3 my-button "
                                disabled={!stripe}
                                onClick={() => setNewCard(true)}
                              >
                                Añadir un metodo de pago
                                <IconContext.Provider
                                  value={{
                                    size: 20,
                                    className:
                                      "global-class-name ml-2 text-white",
                                  }}
                                >
                                  <FaCreditCard />
                                </IconContext.Provider>
                              </button>
                            )}
                          </>
                        )}
                    </form>
                    <span className="text-secondary">
                      {buyPacksReducer.pack_buying && (
                        <div className="mt-3">Adquiriendo pack...</div>
                      )}
                    </span>
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
                                        authReducer.error.data
                                          .non_field_errors &&
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
              </>
              }
              </>
            }

          </div>
          <div className="offset-sm-2 col-sm-4 offset-lg-0 d-none d-sm-block">
            <img
              src={
                buyPacksReducer.selected_pack.picture
                  ? buyPacksReducer.selected_pack.picture
                  : "../../../static/assets/img/no-foto.png"
              }
              alt=""
              className="mb-2 w-100 d-block rounded"
            />
            <span className="text-center d-block">
              Pagos seguros con stripe
              <IconContext.Provider
                value={{
                  size: 20,
                  className: "global-class-name ml-2",
                }}
              >
                <RiSecurePaymentFill />
              </IconContext.Provider>
            </span>
          </div>
        </div>
      </div>
    </CheckoutPackDiv>
  );
};
const CheckoutPackDiv = styled.div`
  .underline:hover {
    text-decoration: underline !important;
  }
  .my-button {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    text-align: center;
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
  .disabled-button {
    opacity: 0.8;
    box-shadow: none !important;
    cursor: inherit;
  }
  .disabled-button:active {
    position: relative;
    top: auto;
    box-shadow: none !important;
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
export default CheckoutPack;
