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
import axios from "axios";

const CheckoutInstructorAccounts = (props) => {
  const authReducer = useSelector((state) => state.authReducer);

  const programReducer = useSelector((state) => state.programReducer);
  const {
    level_adquired,
    current_accounts,
    level_pro,
  } = programReducer.program;
  const { areDiscount, fetchDiscount } = props.useCheckAreDiscount;
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
    // Prod
    id: "prod_Hs4SzrmKsWWX1y",
    price_id: "price_1HIKJQIgGIa3w9CpFZZl6nJm",
    level: 0,
    accounts: level_pro ? current_accounts : 1,
    description: "Accounts Volume Pricing",
    level_pro: true,
    price: null,
    currency: "EUR",
    // ------------------------------------------------------
    // Dev
    // id: "prod_HqaU1ykblf4gX6",
    // price_id: "price_1HGtJaIgGIa3w9Cpd7Q2ObG4",
    // level: 0,
    // accounts: level_pro ? current_accounts : 75,
    // description: "Accounts Volume Pricing",
    // level_pro: true,
    // price: null,
    // currency: "EUR",
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

    setPricingPro({
      ...pricingPro,
      price: coupon
        ? parseInt(pricingPro.accounts) * 4 -
          parseInt(pricingPro.accounts) * 4 * (coupon.percent_off / 100)
        : parseInt(pricingPro.accounts) * 4,
    });
    if (coupon) {
      setAccountPrice(
        ((4 * coupon.percent_off) / 100).toFixed(2) + "€ por cuenta"
      );
    } else {
      setAccountPrice("4€ por cuenta");
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
    }
  }, [authReducer.user.teacher.discount]);

  useEffect(() => {
    if (areDiscount) {
      setPromoCode(areDiscount);

      calcPricePro(areDiscount);
      setDiscount(`Aplicado un descuento del ${areDiscount.percent_off}%`);
    } else if (authReducer.user.teacher.discount) {
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
  }, [areDiscount, fetchDiscount]);

  useEffect(() => {
    if (authReducer.user.teacher.discount) {
      setPromoCode(authReducer.user.teacher.discount);
      calcPricePro(authReducer.user.teacher.discount);
      setDiscount(
        `Aplicado un descuento del ${authReducer.user.teacher.discount.percent_off}%`
      );
    } else if (areDiscount) {
      setPromoCode(areDiscount);

      calcPricePro(areDiscount);
      setDiscount(`Aplicado un descuento del ${areDiscount.percent_off}%`);
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

    setNumErrors({
      ...numErrors,
      maxAccount: null,
    });

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
      setCouponText("");

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
      setCouponText("");

      dispatch(addAcquireAccounts(pricingPro, paymentMethodId, promoCode));
      handleClosePro();
    } else {
      setCouponText("");

      console.log("promocode normal", promoCode);
      dispatch(addAcquireAccounts(pricingSelected, paymentMethodId, promoCode));
      handleClose();
    }
  };
  const [newCard, setNewCard] = useState(false);

  const [promoCode, setPromoCode] = useState(null);

  const [couponText, setCouponText] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (couponText != "") {
        axios
          .get(`/api/promotion-code/${couponText}`)
          .then((result) => {
            console.log(result.data);
            setPromoCode(result.data);
            calcPricePro(result.data);

            setDiscount(
              `Aplicado un descuento del ${result.data.percent_off}%`
            );
          })
          .catch((err) => {
            console.log("El cupon no existe");
            setDiscount(false);
            setPromoCode(null);
            calcPricePro();
          });
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [couponText]);
  const handleChangeCoupon = (e) => {
    e.preventDefault();
    const text = e.target.value;
    setCouponText(text);
  };

  const settings = {
    className: "center",
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,

    speed: 700,
    draggable: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 998,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
    <div>
      <AdminForm>
        <PricingCard className="border-0">
          <span className="mt-4">Cuentas de instructor</span>

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
              type="number"
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
        <div className="m-auto" style={{ maxWidth: "40rem" }}>
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
                  style={{ maxWidth: "40rem" }}
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
                      {authReducer.user.profile.payment_methods[0].card.last4}
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
                    style={{ maxWidth: "40rem" }}
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
          <CouponDiv className="w-100 mt-4">
            <label
              htmlFor="cupon-code-pro"
              className="d-flex justify-content-center"
            >
              Añadir cupón
            </label>
            {authReducer.user.teacher.discount || areDiscount ? (
              <small style={{ color: "green", alignSelf: "center" }}>
                Ya se te esta aplicando el descuento
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
        </div>
      </AdminForm>
    </div>
  );
};

export default CheckoutInstructorAccounts;
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

export const SlickSliderAdmin = styled.div`
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
