import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { IoIosPeople } from "react-icons/io";
import { FaCreditCard } from "react-icons/fa";

import Slider from "react-slick";
import { RiSecurePaymentLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import {
  ButtonCustom,
  ButtonCustomError,
} from "src/components/ui/ButtonCustom";
import { Modal, Button } from "react-bootstrap";

import {
  CardElement,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { AdminForm } from "../ui/AdminForm";
import { useDispatch, useSelector } from "react-redux";
import { addAcquireAccounts } from "../../redux/actions/program";

const AcquireAccounts = (props) => {
  const authReducer = useSelector((state) => state.authReducer);

  const programReducer = useSelector((state) => state.programReducer);
  const { level_adquired, current_accounts, level_pro } = props.program;
  const { handleAddAcquireAccounts, handleCancelAcquireAccounts } = props;
  const dispatch = useDispatch();
  const [pricingSelected, setPricingSelected] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (pricing) => {
    setPricingSelected(pricing);
    setShow(true);
  };
  const [showPro, setShowPro] = useState(false);
  const [pricingPro, setPricingPro] = useState({
    id: "prod_HqaU1ykblf4gX6",
    price_id: "price_1HGtJaIgGIa3w9Cpd7Q2ObG4",
    level: 0,
    accounts: level_pro ? current_accounts : 51,
    description: "Accounts Volume Pricing",
    level_pro: true,
    price: null,
    currency: "EUR",
  });
  const handleClosePro = () => setShowPro(false);
  const handleShowPro = (pricing) => {
    setPricingSelected(pricing);
    setShowPro(true);
  };
  const [discount, setDiscount] = useState(false);
  const [accountPrice, setAccountPrice] = useState(false);

  const calcPricePro = (coupon = false) => {
    console.log(pricingPro);
    console.log("coupon", coupon);
    if (
      parseInt(pricingPro.accounts) > 50 &&
      parseInt(pricingPro.accounts) <= 99
    ) {
      setPricingPro({
        ...pricingPro,
        price: coupon
          ? parseInt(pricingPro.accounts) * 1.75 -
            parseInt(pricingPro.accounts) * 1.75 * (coupon.percent_off / 100)
          : parseInt(pricingPro.accounts) * 1.75,
      });
      setAccountPrice(
        ((1.75 * coupon.percent_off) / 100).toFixed(2) + "€ por cuenta"
      );
    } else if (
      parseInt(pricingPro.accounts) > 99 &&
      parseInt(pricingPro.accounts) <= 149
    ) {
      setPricingPro({
        ...pricingPro,
        price: coupon
          ? parseInt(pricingPro.accounts) * 1.5 -
            parseInt(pricingPro.accounts) * 1.5 * (coupon.percent_off / 100)
          : parseInt(pricingPro.accounts) * 1.5,
      });
      setAccountPrice(
        ((1.5 * coupon.percent_off) / 100).toFixed(2) + "€ por cuenta"
      );
    } else if (
      parseInt(pricingPro.accounts) > 149 &&
      parseInt(pricingPro.accounts) <= 199
    ) {
      setPricingPro({
        ...pricingPro,
        price: coupon
          ? parseInt(pricingPro.accounts) * 1.25 -
            parseInt(pricingPro.accounts) * 1.25 * (coupon.percent_off / 100)
          : parseInt(pricingPro.accounts) * 1.25,
      });
      setAccountPrice(
        ((1.25 * coupon.percent_off) / 100).toFixed(2) + "€ por cuenta"
      );
    } else if (parseInt(pricingPro.accounts) > 199) {
      setPricingPro({
        ...pricingPro,
        price: coupon
          ? parseInt(pricingPro.accounts) * 1.0 -
            parseInt(pricingPro.accounts) * 1.0 * (coupon.percent_off / 100)
          : parseInt(pricingPro.accounts) * 1.0,
      });

      setAccountPri(
        ce((1 * coupon.percent_off) / 100).toFixed(2) + "€ por cuenta"
      );
    }
  };

  useEffect(() => {
    console.log("discount", authReducer.user.teacher.discount);
    if (authReducer.user.teacher.discount) {
      setPromoCode(authReducer.user.teacher.discount);

      calcPricePro(authReducer.user.teacher.discount);

      setDiscount(
        `Aplicado un descuento del ${authReducer.user.teacher.discount.percent_off}%`
      );
    } else {
      setPromoCode(null);

      calcPricePro();

      setDiscount(false);
    }
  }, [authReducer.user.teacher.discount]);

  useEffect(() => {
    if (authReducer.user.teacher.discount) {
      setPromoCode(authReducer.user.teacher.discount);
      calcPricePro(authReducer.user.teacher.discount);
      setDiscount(
        `Aplicado un descuento del ${authReducer.user.teacher.discount.percent_off}%`
      );
    } else {
      calcPricePro(promoCode);
    }
  }, [pricingPro.accounts]);

  const [numErrors, setNumErrors] = useState({
    maxAccount: null,
    numberError: null,
  });
  const handleChangeNumAccounts = (e) => {
    e.preventDefault();

    if (e.target.value > 50)
      setNumErrors({
        ...numErrors,
        maxAccount: null,
      });
    else {
      setNumErrors({
        ...numErrors,
        maxAccount: "Puedes escojer por encima de 50 cuentas",
      });
    }

    if (/^[0-9]*$/.test(e.target.value) && e.target.value.length < 10) {
      setPricingPro({ ...pricingPro, accounts: e.target.value });
    }
  };
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
    } else if (numErrors.maxAccount) {
      console.log("[error]", numErrors.maxAccount);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      console.log("[pricingSelected]", pricingSelected);
      console.log("[pricingPro]", pricingPro);
      const paymentMethodId = paymentMethod.id;
      if (pricingSelected.level_pro) {
        dispatch(addAcquireAccounts(pricingPro, paymentMethodId, promoCode));
        handleClosePro();
      } else {
        dispatch(
          addAcquireAccounts(pricingSelected, paymentMethodId, promoCode)
        );
        handleClose();
      }
    }
  };
  const handleSubscribeSaved = (payment_method) => {
    const paymentMethodId = payment_method;
    if (numErrors.maxAccount) {
      console.log("[error]", numErrors.maxAccount);
    } else if (pricingSelected.level_pro) {
      console.log("promocode pro", promoCode);

      dispatch(addAcquireAccounts(pricingPro, paymentMethodId, promoCode));
      handleClosePro();
    } else {
      console.log("promocode normal", promoCode);
      dispatch(addAcquireAccounts(pricingSelected, paymentMethodId, promoCode));
      handleClose();
    }
  };
  const [newCard, setNewCard] = useState(false);
  const [pricingEur, setPricingEur] = useState([
    {
      id: 0,
      level: 1,
      accounts: 3,
      price: 0,
      currency: "EUR",
      level_pro: false,
    },
    {
      id: "prod_Hnqeyg8C1Hkm3Y",
      price_id: "price_1HEExYIgGIa3w9CpBr95tWVw",
      level: 2,
      accounts: 10,
      description: "10 Academy Accounts",
      level_pro: false,
      price: 19.99,
      currency: "EUR",
    },
    {
      id: "prod_HnqfHXug8RREYk",
      price_id: "price_1HEEy6IgGIa3w9Cp6yeAcr2U",
      level: 3,
      accounts: 25,
      description: "20 Academy Accounts",
      level_pro: false,
      price: 49.99,
      currency: "EUR",
    },
    {
      id: "prod_HnqfsKiER0pxnT",
      price_id: "price_1HEEyXIgGIa3w9CpjhkDustj",
      level: 4,
      accounts: 50,
      level_pro: false,
      description: "50 Academy Accounts",
      price: 99.99,
      currency: "EUR",
    },
  ]);
  const [promoCode, setPromoCode] = useState(null);

  const [promoCodes, setPromoCodes] = useState([
    {
      id: "promo_1HEyiqIgGIa3w9Cpdjwxt6V1",
      promotion_code: "ACCOUNTS50OFF",
      coupon: "50_OFF",
      percent_off: 50,
    },
  ]);
  const [couponText, setCouponText] = useState("");
  const handleChangeCoupon = (e, pro = false) => {
    e.preventDefault();
    const text = e.target.value;
    setCouponText(text);
    const result = promoCodes.find(
      (promoCode) => promoCode.promotion_code == text
    );
    console.log(result);
    if (result) {
      setPromoCode(result);
      if (pro) {
        calcPricePro(result);
      }

      setDiscount(`Aplicado un descuento del ${result.percent_off}%`);
    } else {
      console.log("El cupon no existe");
      setDiscount(false);
      setPromoCode(null);

      if (pro) {
        calcPricePro();
      }
    }
  };
  const sliders = (pricing) => {
    return pricing.map((pricing) => (
      <div className="p-2" key={pricing.id}>
        <PricingCard
          className="bg-white shadow-sm"
          opacity={pricing.level > 1 && true}
        >
          <span className="mt-4">Nivel {pricing.level}</span>

          <IconContext.Provider
            value={{
              size: 100,
              className: "global-class-name",
            }}
          >
            <IoIosPeople />
          </IconContext.Provider>
          <span className="title mb-4">{pricing.accounts} Cuentas</span>
          <>
            {level_adquired == pricing.level ? (
              pricing.level == 1 ? (
                <ButtonCustom className="w-100">Obtenido</ButtonCustom>
              ) : (
                <ButtonCustomError
                  className="w-100"
                  onClick={handleCancelAcquireAccounts}
                >
                  Cancelar
                </ButtonCustomError>
              )
            ) : pricing.level == 1 ? (
              <ButtonCustom
                className="w-100"
                onClick={() => handleAddAcquireAccounts(pricing)}
              >
                {pricing.price == 0 ? "Gratis" : pricing.price + "€/mes"}
              </ButtonCustom>
            ) : (
              <ButtonCustom
                className="w-100"
                onClick={() => handleShow(pricing)}
              >
                {pricing.price + "€/mes"}
              </ButtonCustom>
            )}
          </>
        </PricingCard>
      </div>
    ));
  };
  const settings = {
    className: "center",
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,

    speed: 700,
    draggable: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },

      {
        breakpoint: 998,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="d-sm-flex justify-content-between align-items-center">
        <div>
          <span className="font-weight-bold h2 d-block mb-0">
            CUENTAS ADQUIRIDAS
          </span>
          <small>Consigue cuentas para tus actuales alumnos</small>
        </div>
        <div className="d-block m-3 d-sm-none"></div>
        <div className="d-sm-flex justify-content-center align-items-center flex-column font-weight-bold">
          {/* <span>Tu Saldo</span> */}
          {!level_pro ? (
            current_accounts > 0 ? (
              <>
                <span className="h2 mb-0 font-weight-bold  d-block">
                  Nivel {level_adquired}
                </span>
                <span className="h2 mb-0 font-weight-bold  d-block text-info">
                  {current_accounts}
                </span>
                <span className="text-info">Cuentas</span>
              </>
            ) : (
              <>
                <span className="text-info">No tienes cuentas</span>
              </>
            )
          ) : (
            <>
              <span className="h2 mb-0 font-weight-bold  d-block">
                Nivel PRO
              </span>
              <span className="h2 mb-0 font-weight-bold  d-block text-info">
                {current_accounts}
              </span>
              <span className="text-info">Cuentas</span>
            </>
          )}
        </div>
      </div>
      <div className="my-5 mb-4">
        {!pricingEur ? (
          "Cargando"
        ) : (
          <SlickSlider>
            <Slider {...settings}>
              {sliders(pricingEur)}

              <div className="p-2">
                <PricingCard className="bg-white shadow-sm">
                  <span className="mt-4">Nivel PRO</span>

                  <IconContext.Provider
                    value={{
                      size: 100,
                      className: "global-class-name",
                    }}
                  >
                    <IoIosPeople />
                  </IconContext.Provider>
                  <span className="title mb-4">+50 cuentas</span>
                  {level_pro ? (
                    <>
                      <ButtonCustom
                        className="w-100 mb-2"
                        onClick={() => handleShowPro(pricingPro)}
                      >
                        Cambiar plan PRO
                      </ButtonCustom>
                      <ButtonCustomError
                        className="w-100"
                        onClick={handleCancelAcquireAccounts}
                      >
                        Cancelar
                      </ButtonCustomError>
                    </>
                  ) : (
                    <>
                      <ButtonCustom
                        className="w-100"
                        onClick={() => handleShowPro(pricingPro)}
                      >
                        Seleccionar cuentas
                      </ButtonCustom>
                      <div className="extended-card  shadow-sm">
                        Descuento por volumen!
                      </div>
                    </>
                  )}
                </PricingCard>
              </div>
            </Slider>
          </SlickSlider>
        )}
      </div>
      {programReducer.cancel_accounts_error &&
        programReducer.cancel_accounts_error.data.non_field_errors &&
        programReducer.cancel_accounts_error.data.non_field_errors.map(
          (error) => (
            <span className="d-block text-red text-center">{error}</span>
          )
        )}
      {programReducer.adquire_accounts_error &&
        programReducer.adquire_accounts_error.data.non_field_errors &&
        programReducer.adquire_accounts_error.data.non_field_errors.map(
          (error) => (
            <span className="d-block text-red text-center">{error}</span>
          )
        )}
      {programReducer.adquire_accounts_error &&
        programReducer.adquire_accounts_error.data.message && (
          <span className="d-block text-red text-center">
            {programReducer.adquire_accounts_error.data.message}
          </span>
        )}
      {programReducer.cancel_accounts_error &&
        programReducer.cancel_accounts_error.data.message && (
          <span className="d-block text-red text-center">
            {programReducer.cancel_accounts_error.data.message}
          </span>
        )}
      {programReducer.acquiring_accounts && (
        <div className="d-flex justify-content-center">
          <span>...Adquiriendo cuentas...</span>
        </div>
      )}

      <Modal show={show} onHide={handleClose} size="md" centered>
        <AdminForm>
          <Modal.Header closeButton>
            <Modal.Title>Adquiere tus cuentas</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body className="bg-white">
              <PricingCard className="border-0">
                <span className="mt-4">
                  Nivel {pricingSelected && pricingSelected.level}
                </span>

                <IconContext.Provider
                  value={{
                    size: 100,
                    className: "global-class-name",
                  }}
                >
                  <IoIosPeople />
                </IconContext.Provider>

                <span className="title">
                  {pricingSelected && pricingSelected.accounts} Cuentas
                </span>

                {discount && (
                  <small
                    style={{ color: "green" }}
                    className="text-center d-block align-self-center"
                  >
                    {discount}
                  </small>
                )}
                <Price className="subtitle mt-4 mb-3 shadow">
                  {pricingSelected &&
                    (promoCode
                      ? (
                          pricingSelected.price *
                          (promoCode.percent_off / 100)
                        ).toFixed(2)
                      : pricingSelected.price.toFixed(2))}
                  €/mes
                </Price>
              </PricingCard>

              {(newCard ||
                authReducer.user.profile.payment_methods == null ||
                authReducer.user.profile.payment_methods.length == 0) && (
                <>
                  <CardElement className="mt-0" />
                </>
              )}
              {(newCard ||
                authReducer.user.profile.payment_methods == null ||
                authReducer.user.profile.payment_methods.length == 0) && (
                <>
                  <ButtonCustom
                    type="submit"
                    className="d-flex align-items-center w-100 justify-content-center"
                    disabled={!stripe}
                  >
                    {programReducer.program.is_subscribed ? (
                      <>Cambiar Plan</>
                    ) : (
                      <>
                        Pagar
                        <IconContext.Provider
                          value={{
                            color: "green",
                            size: 20,
                            className: "global-class-name ml-2",
                          }}
                        >
                          <RiSecurePaymentLine />
                        </IconContext.Provider>
                      </>
                    )}
                  </ButtonCustom>
                </>
              )}
              {authReducer.user.profile.payment_methods != undefined &&
                authReducer.user.profile.payment_methods.length > 0 &&
                !newCard && (
                  <>
                    <ButtonCustom
                      type="button"
                      className="d-flex align-items-center w-100 justify-content-center"
                      disabled={!stripe}
                      onClick={() => {
                        handleSubscribeSaved(
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
                            authReducer.user.profile.payment_methods[0].card
                              .last4
                          }
                          <IconContext.Provider
                            value={{
                              color: "green",
                              size: 20,
                              className: "global-class-name ml-2",
                            }}
                          >
                            <RiSecurePaymentLine />
                          </IconContext.Provider>
                        </>
                      )}
                    </ButtonCustom>
                    {!programReducer.program.is_subscribed && (
                      <ButtonCustom
                        type="button"
                        className="d-flex align-items-center w-100 justify-content-center mt-3"
                        disabled={!stripe}
                        onClick={() => setNewCard(true)}
                      >
                        Añadir un metodo de pago
                        <IconContext.Provider
                          value={{
                            color: "green",
                            size: 20,
                            className: "global-class-name ml-2",
                          }}
                        >
                          <FaCreditCard />
                        </IconContext.Provider>
                      </ButtonCustom>
                    )}
                  </>
                )}
            </Modal.Body>
            <Modal.Footer>
              <CouponDiv className="w-100">
                <label
                  htmlFor="cupon-code-pro"
                  className="d-flex justify-content-center"
                >
                  Añadir cupón
                </label>
                {authReducer.user.teacher.discount ? (
                  <small style={{ color: "green", alignSelf: "center" }}>
                    Ya se te esta aplicando el descuento máximo
                  </small>
                ) : (
                  <input
                    className="text-center"
                    id="cupon-code-pro"
                    type="text"
                    placeholder="Añadir cupón"
                    value={couponText}
                    onChange={(e) => handleChangeCoupon(e)}
                    onKeyUp={(e) => handleChangeCoupon(e)}
                  />
                )}
              </CouponDiv>
            </Modal.Footer>
          </form>
        </AdminForm>
      </Modal>
      <Modal show={showPro} onHide={handleClosePro} size="md" centered>
        <AdminForm>
          <Modal.Header closeButton>
            <Modal.Title>Adquiere tus cuentas</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body className="bg-white">
              <PricingCard className="border-0">
                <span className="mt-4">Nivel Pro</span>

                <IconContext.Provider
                  value={{
                    size: 100,
                    className: "global-class-name",
                  }}
                >
                  <IoIosPeople />
                </IconContext.Provider>
                <div className=" mb-4">
                  <input
                    className="text-center"
                    type="text"
                    placeholder="Numero de cuentas"
                    value={pricingPro.accounts}
                    onChange={(e) => handleChangeNumAccounts(e)}
                    onKeyUp={(e) => handleChangeNumAccounts(e)}
                  />

                  {numErrors.maxAccount && (
                    <small className="text-red text-center d-block align-self-center">
                      {numErrors.maxAccount}
                    </small>
                  )}
                </div>
                <span className="title">{pricingPro.accounts} Cuentas</span>
                <span className="">{accountPrice}</span>
                {discount && (
                  <small
                    style={{ color: "green" }}
                    className="text-center d-block align-self-center"
                  >
                    {discount}
                  </small>
                )}
                <Price className="subtitle mt-4 mb-3 shadow">
                  {pricingPro.price && pricingPro.price.toFixed(2)} €/mes
                </Price>
              </PricingCard>
              {(newCard ||
                authReducer.user.profile.payment_methods == null ||
                authReducer.user.profile.payment_methods.length == 0) && (
                <>
                  <CardElement className="mt-0" />
                </>
              )}

              {(newCard ||
                authReducer.user.profile.payment_methods == null ||
                authReducer.user.profile.payment_methods.length == 0) && (
                <>
                  <ButtonCustom
                    type="submit"
                    className="d-flex align-items-center w-100 justify-content-center"
                    disabled={!stripe}
                  >
                    {programReducer.program.is_subscribed ? (
                      <>Cambiar Plan</>
                    ) : (
                      <>
                        Pagar
                        <IconContext.Provider
                          value={{
                            color: "green",
                            size: 20,
                            className: "global-class-name ml-2",
                          }}
                        >
                          <RiSecurePaymentLine />
                        </IconContext.Provider>
                      </>
                    )}
                  </ButtonCustom>
                </>
              )}
              {authReducer.user.profile.payment_methods != undefined &&
                authReducer.user.profile.payment_methods.length > 0 &&
                !newCard && (
                  <>
                    <ButtonCustom
                      type="button"
                      className="d-flex align-items-center w-100 justify-content-center"
                      disabled={!stripe}
                      onClick={() => {
                        handleSubscribeSaved(
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
                            authReducer.user.profile.payment_methods[0].card
                              .last4
                          }
                          <IconContext.Provider
                            value={{
                              color: "green",
                              size: 20,
                              className: "global-class-name ml-2",
                            }}
                          >
                            <RiSecurePaymentLine />
                          </IconContext.Provider>
                        </>
                      )}
                    </ButtonCustom>
                    {!programReducer.program.is_subscribed && (
                      <ButtonCustom
                        type="button"
                        className="d-flex align-items-center w-100 justify-content-center mt-3"
                        disabled={!stripe}
                        onClick={() => setNewCard(true)}
                      >
                        Añadir un metodo de pago
                        <IconContext.Provider
                          value={{
                            color: "green",
                            size: 20,
                            className: "global-class-name ml-2",
                          }}
                        >
                          <FaCreditCard />
                        </IconContext.Provider>
                      </ButtonCustom>
                    )}
                  </>
                )}
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-center">
              <CouponDiv className="w-100">
                <label
                  htmlFor="cupon-code-pro"
                  className="d-flex justify-content-center"
                >
                  Añadir cupón
                </label>
                {authReducer.user.teacher.discount ? (
                  <small style={{ color: "green", alignSelf: "center" }}>
                    Ya se te esta aplicando el descuento máximo
                  </small>
                ) : (
                  <input
                    className="text-center"
                    id="cupon-code-pro"
                    type="text"
                    placeholder="Añadir cupón"
                    value={couponText}
                    onChange={(e) => handleChangeCoupon(e)}
                    onKeyUp={(e) => handleChangeCoupon(e)}
                  />
                )}
              </CouponDiv>
            </Modal.Footer>
          </form>
        </AdminForm>
      </Modal>
    </>
  );
};
const PricingCard = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem 1rem;
  z-index: 4232433;

  .title {
    font-size: 2rem;
    font-weight: 700;
  }
  .subtitle {
    font-size: 2rem;
  }
  .extended-card {
    position: absolute;
    bottom: -3rem;
    z-index: 423243;
    width: 95%;
    display: flex;
    justify-content: center;
    height: 30px;
    align-items: center;
    background: yellowgreen;
    border-radius: 0 0 10px 10px;
    color: white;
  }
`;

const SlickSlider = styled.div`
  .slick-track {
    height: 30rem !important;
  }
  .slick-prev {
    left: -10px !important;
    z-index: 100 !important;
  }
  .slick-next {
    right: 10px !important;
  }
  .slick-next:before,
  .slick-prev:before {
    color: #000;
    font-size: 4rem;
  }
  .slick-slide div:focus {
    outline: none !important;
  }
`;
const CouponDiv = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
`;
const Price = styled.div`
  font-size: 2rem;
  background: black;
  padding: 5px 10px;
  color: white;
  border-radius: 10px;
`;

export default AcquireAccounts;
