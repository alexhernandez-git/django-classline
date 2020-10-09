import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "src/context/AppContext";
import { useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import {
  CardElement,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
const Payments = (props) => {
  const appContext = useContext(AppContext);
  const { match } = props;
  let { id } = match.params;
  const [program, setProgram] = useState(false);
  let [newCard, setNewCard] = useState(false);
  let [paymentMethodReady, setPaymentMethodReady] = useState(null);
  let [stripeError, setStripeError] = useState(null);
  let [isBusy, setIsBusy] = useState(false);
  let [currentSelected, setCurrentSelected] = useState(null);
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const handleAddNewCard = () => {
    console.log("Clicked");
  };

  const handleSubscribeSaved = (payment_method) => {
    setIsBusy((isBusy = true));
    setCurrentSelected((currentSelected = payment_method.id));
    const paymentMethod = payment_method;
    handleSubscribe(paymentMethod.id);
  };
  const handleSubscribeSubmit = (event) => {
    setIsBusy((isBusy = true));
    event.preventDefault();
    handleSubscribe(paymentMethodReady.id);
  };
  const handleChange = async (event) => {
    // Block native form submission.
    //event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardNumberElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (error) {
      setStripeError((stripeError = error.message));
      console.log("[error]", error);
    } else {
      setStripeError((stripeError = null));
      setPaymentMethodReady((paymentMethodReady = paymentMethod));
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`/api/programs/${id}`)
        .then((res) => {
          console.log(res.data);

          setProgram(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    // User Loading
    fetchData();
  }, []);
  const handleSubscribe = (payment_method_id) => {
    async function fetchData() {
      await axios
        .patch(
          `/api/programs/${program.code}/add_student/`,
          { payment_method: payment_method_id },
          appContext.tokenConfig(appContext.userProfile)
        )
        .then(async (res) => {
          console.log(res.data);
          setIsBusy((isBusy = false));
          setCurrentSelected((currentSelected = null));
          appContext.handleSubscribe(res.data);
          const response = await appContext.loadUser();
          if (response) history.push("/myzone/student/programs/");
        })
        .catch((err) => {
          setIsBusy((isBusy = false));
          setCurrentSelected((currentSelected = null));
          console.log(err.response);
        });
    }
    // User Loading
    fetchData();
  };

  return !program ? (
    "Cargando..."
  ) : (
    <AppContext.Consumer>
      {(appContext) => (
        <>
          <div className="container mt-5 vh-100">
            <div className="row">
              <div className="col-md-5">
                {/* <div>
                  <h3>Pagar</h3>
                  <Link>Añadir una nueva targeta</Link>
                </div> */}
                <div className="mt-5">
                  <h3>Detalle del pedido</h3>
                  <div className="d-sm-flex justify-content-between">
                    <span className="font-weight-bold d-block">
                      {program.title}
                    </span>
                    <span className="d-block">
                      {program.program_price.value}€
                    </span>
                  </div>
                </div>
              </div>
              <div className="m-3 d-block d-sm-none"></div>
              <div className="col-md-5 offset-md-2">
                <div className="shadow p-3 rounded">
                  <h4 className="mb-4">Resumen</h4>
                  <div className="d-sm-flex justify-content-between">
                    <span className="d-block">Precio original</span>
                    <span className="font-weight-bold d-block">
                      {program.program_price.value}€
                    </span>
                  </div>
                  <hr />
                  <div className="d-sm-flex justify-content-between">
                    <span className="h6 d-block">Total</span>
                    <span className="h5 d-block">
                      {program.program_price.value}€
                    </span>
                  </div>
                  <form onSubmit={handleSubscribeSubmit}>
                    {(newCard ||
                      appContext.userProfile.user.profile.payment_methods ==
                        null ||
                      appContext.userProfile.user.profile.payment_methods
                        .length == 0) && (
                      <>
                        <CardNumberElement
                          options={{
                            style: {
                              base: {
                                fontSize: "16px",
                                padding: "1rem",
                                margin: "1rem",
                                color: "#424770",
                                "::placeholder": {
                                  color: "#aab7c4",
                                },
                              },
                              invalid: {
                                color: "#9e2146",
                              },
                            },
                          }}
                          onChange={handleChange}
                        />
                        <CardCvcElement
                          options={{
                            style: {
                              base: {
                                fontSize: "16px",
                                padding: "1rem",
                                margin: "1rem",
                                color: "#424770",
                                "::placeholder": {
                                  color: "#aab7c4",
                                },
                              },
                              invalid: {
                                color: "#9e2146",
                              },
                            },
                          }}
                          onChange={handleChange}
                        />
                        <CardExpiryElement
                          options={{
                            style: {
                              base: {
                                fontSize: "16px",
                                padding: "1rem",
                                margin: "1rem",
                                color: "#424770",
                                "::placeholder": {
                                  color: "#aab7c4",
                                },
                              },
                              invalid: {
                                color: "#9e2146",
                              },
                            },
                          }}
                          onChange={handleChange}
                        />
                      </>
                    )}
                    <small className="mb-1 mt-1 stripe_error">
                      {stripeError}
                    </small>
                    <br />
                    <small>
                      Al completar la compra, aceptas estas{" "}
                      <Link to="/privacy-policy" className="font-weight-bold">
                        Condiciones de uso
                      </Link>
                    </small>

                    {appContext.userProfile.user.profile.payment_methods !=
                      undefined &&
                    appContext.userProfile.user.profile.payment_methods.length >
                      0 &&
                    !newCard ? (
                      <>
                        <button
                          className="btn-green d-block text-white px-3 py-2 w-100 mt-1"
                          type="button"
                          onClick={() =>
                            handleSubscribeSaved(
                              appContext.userProfile.user.profile
                                .payment_methods[0]
                            )
                          }
                          disabled={!stripe || isBusy}
                        >
                          {isBusy ? (
                            <Spinner animation="border" variant="light" />
                          ) : (
                            <>
                              Pague con tarjeta que termina con{" "}
                              {
                                appContext.userProfile.user.profile
                                  .payment_methods[0].card.last4
                              }
                            </>
                          )}
                        </button>

                        {isBusy ? (
                          ""
                        ) : (
                          <>
                            {" "}
                            <h4
                              className="mt-2 mb-2"
                              style={{ textAlign: "center", width: "100%" }}
                            >
                              O
                            </h4>
                            <button
                              className="btn-green d-block text-white px-3 py-2 w-100 mt-1"
                              type="button"
                              onClick={() => setNewCard((newCard = true))}
                            >
                              Agregar nueva tarjeta
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <button
                        className="btn-green d-block text-white px-3 py-2 w-100 mt-1"
                        type="submit"
                        disabled={!paymentMethodReady || isBusy}
                      >
                        {isBusy ? (
                          <Spinner animation="border" variant="light" />
                        ) : (
                          "Subscribir"
                        )}
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AppContext.Consumer>
  );
};

export default Payments;
